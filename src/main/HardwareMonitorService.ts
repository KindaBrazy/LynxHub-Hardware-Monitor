import {exec} from 'node:child_process';
import {getServers} from 'node:dns';
import {networkInterfaces, platform} from 'node:os';
import {join} from 'node:path';

import {MainExtensionUtils} from '@lynx_main/plugins/extensions/types';
import StorageManager from '@lynx_main/storageSqlite/storageOperations';
import HardwareMonitor, {HardwareReport, MonitorError} from '@lynxhub/hwmonitor';
import {app, ipcMain, WebContents} from 'electron';
import {isEqual, isNil} from 'lodash-es';

import {
  HMONITOR_IPC_CONFIG_UPDATE,
  HMONITOR_IPC_DATA_UPDATE,
  HMONITOR_IPC_FLYOUT_MOUSE_EVENT,
  HMONITOR_IPC_FLYOUT_RESIZE,
  HMONITOR_IPC_FLYOUT_SET_RANGE,
  HMONITOR_IPC_HIDE_FLYOUT,
  HMONITOR_IPC_MONITORING_ERROR,
  HMONITOR_IPC_RESET_CONFIG,
  HMONITOR_IPC_SET_CONFIG,
  HMONITOR_IPC_SHOW_FLYOUT,
  HMONITOR_IPC_STOP_PING,
  HMONITOR_IPC_UPDATE_FLYOUT,
  HMONITOR_IPC_UPDATE_PING,
  HMONITOR_STORAGE_ID,
  initialSettings,
} from '../cross/constants';
import {
  HardwareDataReport,
  HardwareInfo,
  MonitoringSettings,
  NetworkInterfaceDetails,
  PingData,
  TimeRangeOption,
} from '../cross/types';
import {hardwareFlyoutView} from './HardwareFlyoutView';
import {hardwareTelemetryHistory} from './HardwareTelemetryHistory';
import {Pinger} from './pinger';
import {getActiveComponentTypes} from './utils';

const HARDWARE_CHECK_MAX_RETRIES = 5;
const HARDWARE_REDISCOVERY_DELAY_MS = 10_000;

/**
 * Singleton service to manage hardware monitoring lifecycle, configuration, and IPC communication.
 */
class HardwareMonitorService {
  private static instance: HardwareMonitorService;

  private storeManager?: StorageManager;
  private hwMonitor?: HardwareMonitor;
  private config: MonitoringSettings = initialSettings;
  private webContents?: WebContents;
  private isInitialized = false;
  private lastError: any = null;
  private pingers: Pinger[] = [];
  private rediscoveryTimer?: ReturnType<typeof setTimeout>;
  private discoveryPromise?: Promise<void>;
  private cachedNetworkDetails: NetworkInterfaceDetails[] = [];
  private lastNetworkDetailsTime = 0;

  private constructor() {}

  private async getNetworkDetails(): Promise<NetworkInterfaceDetails[]> {
    const now = Date.now();
    if (this.cachedNetworkDetails.length > 0 && now - this.lastNetworkDetailsTime < 30_000) {
      return this.cachedNetworkDetails;
    }

    try {
      const interfaces = networkInterfaces();
      const dnsServers = getServers();

      let defaultGateway = '';
      if (platform() === 'win32') {
        try {
          const stdout = await new Promise<string>(resolve => {
            exec('route print 0.0.0.0', {windowsHide: true}, (_, out) => {
              resolve(out || '');
            });
          });
          const match = stdout.match(/0\.0\.0\.0\s+0\.0\.0\.0\s+([\d.]+)/);
          if (match && match[1]) {
            defaultGateway = match[1];
          }
        } catch {
          // ignore error
        }
      }

      const details: NetworkInterfaceDetails[] = [];
      for (const [name, addrs] of Object.entries(interfaces)) {
        if (!addrs || addrs.length === 0) continue;
        const nonInternal = addrs.filter(a => !a.internal);
        if (nonInternal.length === 0) continue;

        const ipv4 = nonInternal.find(a => a.family === 'IPv4')?.address;
        const ipv6 = nonInternal.find(a => a.family === 'IPv6')?.address;
        const mac = nonInternal.find(a => a.mac && a.mac !== '00:00:00:00:00:00')?.mac;

        details.push({
          name,
          ipv4,
          ipv6,
          gateway: defaultGateway || undefined,
          dns: dnsServers.length > 0 ? dnsServers : undefined,
          mac,
        });
      }

      this.cachedNetworkDetails = details;
      this.lastNetworkDetailsTime = now;
      return details;
    } catch {
      return this.cachedNetworkDetails;
    }
  }

  public static getInstance(): HardwareMonitorService {
    if (!HardwareMonitorService.instance) {
      HardwareMonitorService.instance = new HardwareMonitorService();
    }
    return HardwareMonitorService.instance;
  }

  /**
   * Initializes the service, loads configuration, and discovers hardware.
   */
  public async initialize(utils: MainExtensionUtils): Promise<void> {
    if (this.isInitialized) return;

    this.storeManager = await utils.getStorageManager();

    // 1. Load the user's saved configuration first.
    this.loadConfig();

    this.startPinging();

    this.registerIpcHandlers();
    this.registerLifecycleHandlers();
    this.isInitialized = true;

    void this.getNetworkDetails();

    // Hardware probing can call .NET, GitHub, and the external CLI. Keep it off
    // LynxHub's app-ready path so installing this extension does not delay window startup.
    void this.discoverHardware();
  }

  private stopPinging(): void {
    const stopPinger = (pinger: Pinger) => {
      pinger.stop();
      this.sendToRenderer(HMONITOR_IPC_STOP_PING, pinger.host);
    };

    this.pingers.forEach(stopPinger);
    this.pingers = [];
  }

  private startPinging(): void {
    const pingState = this.config.pingState;

    this.stopPinging();

    if (pingState.isActive) {
      Array.from(new Set(pingState.enabledHosts)).forEach(host => {
        if (!this.pingers.some(p => p.host === host)) {
          const pinger = new Pinger({host, timeoutMs: pingState.timeout, intervalMs: pingState.interval});

          pinger.onResult = result => {
            const timeString = result.timestamp.toLocaleTimeString();
            hardwareTelemetryHistory.recordPing(host, result.latency, result.alive);
            if (result.alive) {
              const data: PingData = {host, timeString, latency: result.latency};
              this.sendToRenderer(HMONITOR_IPC_UPDATE_PING, data);
            } else {
              this.sendToRenderer(HMONITOR_IPC_UPDATE_PING, host);
            }
          };

          pinger.onError = () => {
            hardwareTelemetryHistory.recordPing(host, undefined, false);
            this.sendToRenderer(HMONITOR_IPC_UPDATE_PING, host);
          };

          pinger.start();
          this.pingers.push(pinger);
        }
      });
    }
  }

  /**
   * Sets the webContents for IPC communication and starts monitoring if enabled.
   */
  public onMainWindowReady(utils: MainExtensionUtils): void {
    utils.getAppManager().then(appManager => {
      this.webContents = appManager.getWebContent();
      const mainWindow = appManager.getMainWindow();
      if (mainWindow) {
        hardwareFlyoutView.attach(mainWindow);
      }

      // Send any captured discovery errors that happened during early app launch
      if (this.lastError) {
        this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, this.lastError);
      }

      // Send the latest config to the renderer once it's ready
      this.sendToRenderer(HMONITOR_IPC_CONFIG_UPDATE, this.config);

      if (this.config.enabled) {
        void this.startMonitoring();
      }
    });
  }

  private sendToRenderer(channel: string, data: unknown): void {
    if (this.webContents && !this.webContents.isDestroyed()) {
      this.webContents.send(channel, data);
    }
  }

  private loadConfig(): void {
    if (!this.storeManager) return;

    let storedConfig = this.storeManager.getCustomData(HMONITOR_STORAGE_ID) as MonitoringSettings | undefined;

    // Perform migration or initialization if config is old or missing
    if (!storedConfig || storedConfig.configVersion < initialSettings.configVersion) {
      const migratedConfig: MonitoringSettings = {
        ...initialSettings,
        ...(storedConfig && {
          // Carry over old settings if they exist
          enabled: storedConfig.enabled,
          refreshInterval: storedConfig.refreshInterval,
          showSectionLabel: storedConfig.showSectionLabel,
          enabledMetrics: storedConfig.enabledMetrics, // Carry over old metric selections
          // Migrate compactMode to displayStyle
          displayStyle: (storedConfig as any).compactMode ? 'compact' : 'default',
          showAliasCpu: storedConfig.showAliasCpu ?? initialSettings.showAliasCpu,
          showAliasGpu: storedConfig.showAliasGpu ?? initialSettings.showAliasGpu,
          showAliasMemory: storedConfig.showAliasMemory ?? initialSettings.showAliasMemory,
          showAliasNetwork: storedConfig.showAliasNetwork ?? initialSettings.showAliasNetwork,
        }),
        configVersion: initialSettings.configVersion, // Ensure version is updated
      };

      // Ensure the 'custom' property exists during migration
      migratedConfig.enabledMetrics.cpu.forEach(c => (c.custom ??= []));
      migratedConfig.enabledMetrics.gpu.forEach(g => (g.custom ??= []));
      migratedConfig.enabledMetrics.memory.forEach(m => (m.custom ??= []));
      // Add network property if it doesn't exist from an older config
      migratedConfig.enabledMetrics.network ??= [];
      migratedConfig.enabledMetrics.network.forEach(n => (n.custom ??= []));

      storedConfig = migratedConfig;
    }
    if (!storedConfig.pingState) {
      storedConfig.pingState = initialSettings.pingState;
    }

    // Keep the last known hardware so the renderer can show configured sections immediately.
    // Background discovery will refresh this shortly after startup.
    this.config = {
      ...storedConfig,
      availableHardware: storedConfig.availableHardware ?? initialSettings.availableHardware,
      showAliasCpu: storedConfig.showAliasCpu ?? initialSettings.showAliasCpu,
      showAliasGpu: storedConfig.showAliasGpu ?? initialSettings.showAliasGpu,
      showAliasMemory: storedConfig.showAliasMemory ?? initialSettings.showAliasMemory,
      showAliasNetwork: storedConfig.showAliasNetwork ?? initialSettings.showAliasNetwork,
      sectionOrder: storedConfig.sectionOrder ?? initialSettings.sectionOrder,
      uptimeOrder: storedConfig.uptimeOrder ?? initialSettings.uptimeOrder,
    };
  }

  private saveConfig(): void {
    this.storeManager?.setCustomData(HMONITOR_STORAGE_ID, this.config);
  }

  private async discoverHardware(): Promise<void> {
    if (this.discoveryPromise) {
      return this.discoveryPromise;
    }

    this.discoveryPromise = this.performHardwareDiscovery().finally(() => {
      this.discoveryPromise = undefined;
    });

    return this.discoveryPromise;
  }

  private async performHardwareDiscovery(): Promise<void> {
    this.clearRediscoveryTimer();

    for (let i = 0; i < HARDWARE_CHECK_MAX_RETRIES; i++) {
      try {
        const monitor = new HardwareMonitor('error');
        const targetDir = join(app.getPath('downloads'), 'LynxHub');
        await monitor.checkRequirements(targetDir);

        const result = await monitor.getDataOnce(['cpu', 'gpu', 'memory', 'network']);
        const mapToHardwareInfo = (items: {Name: string; Sensors: any[]}[] | undefined | null): HardwareInfo[] => {
          if (!items) return [];
          return items.map(item => ({
            name: item.Name,
            sensors:
              item.Sensors?.map(s => ({
                Name: s.Name,
                Type: s.Type,
                Unit: s.Unit,
                Identifier: s.Identifier,
              })) ?? [],
          }));
        };

        this.config.availableHardware = {
          gpu: mapToHardwareInfo(result.GPU),
          cpu: mapToHardwareInfo(result.CPU),
          memory: mapToHardwareInfo(result.Memory),
          network: mapToHardwareInfo(result.Network),
        };

        // Reconcile discovered hardware with existing configuration.
        // Only add default settings for hardware that we don't have a configuration for.

        this.config.availableHardware.gpu.forEach(hw => {
          if (!this.config.enabledMetrics.gpu.some(g => g.name === hw.name)) {
            this.config.enabledMetrics.gpu.push({
              name: hw.name,
              active: true,
              enabled: ['temp', 'usage', 'vram'],
              custom: [],
            });
          }
        });

        this.config.availableHardware.cpu.forEach(hw => {
          if (!this.config.enabledMetrics.cpu.some(c => c.name === hw.name)) {
            this.config.enabledMetrics.cpu.push({
              name: hw.name,
              active: true,
              enabled: ['temp', 'usage'],
              custom: [],
            });
          }
        });

        this.config.availableHardware.memory.forEach(hw => {
          if (!this.config.enabledMetrics.memory.some(m => m.name === hw.name)) {
            this.config.enabledMetrics.memory.push({
              name: hw.name,
              active: true,
              enabled: ['memory'],
              custom: [],
            });
          }
        });

        this.config.availableHardware.network.forEach(hw => {
          if (!this.config.enabledMetrics.network.some(n => n.name === hw.name)) {
            this.config.enabledMetrics.network.push({
              name: hw.name,
              active: false,
              enabled: ['uploadSpeed', 'downloadSpeed'],
              custom: [],
            });
          }
        });

        this.lastError = null;
        this.saveConfig();
        this.sendToRenderer(HMONITOR_IPC_CONFIG_UPDATE, this.config);
        if (this.config.enabled && !this.hwMonitor) {
          void this.startMonitoring();
        }
        return; // Success
      } catch (error) {
        console.warn(`Hardware discovery attempt ${i + 1} failed:`, error);
        if (i === HARDWARE_CHECK_MAX_RETRIES - 1) {
          console.error('All hardware discovery attempts failed.');
          this.lastError = error;
          this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
          this.scheduleRediscovery();
        }
      }
    }
  }

  private scheduleRediscovery(): void {
    if (this.rediscoveryTimer) return;

    this.rediscoveryTimer = setTimeout(() => {
      this.rediscoveryTimer = undefined;
      void this.discoverHardware();
    }, HARDWARE_REDISCOVERY_DELAY_MS);
  }

  private clearRediscoveryTimer(): void {
    if (!this.rediscoveryTimer) return;

    clearTimeout(this.rediscoveryTimer);
    this.rediscoveryTimer = undefined;
  }

  private async startMonitoring(): Promise<void> {
    // Prevent starting if already running or misconfigured
    if (this.hwMonitor || !this.config) {
      return;
    }

    try {
      const components = getActiveComponentTypes(this.config.enabledMetrics);

      if (components.length === 0 || components.every(component => component === 'uptime')) {
        const hasDiscoveredHardware = Object.values(this.config.availableHardware).some(items => items.length > 0);
        if (!hasDiscoveredHardware) {
          this.scheduleRediscovery();
          return;
        }
      }

      this.hwMonitor = new HardwareMonitor('error');

      // Ensure requirements are checked for this instance before starting
      const targetDir = join(app.getPath('downloads'), 'LynxHub');
      await this.hwMonitor.checkRequirements(targetDir);

      this.hwMonitor.on('data', (data: HardwareReport) => {
        hardwareTelemetryHistory.recordHardwareReport(data);
        // Flatten all sensor values for easy lookup on the renderer side
        const rawSensors = [
          ...(data.CPU ?? []),
          ...(data.GPU ?? []),
          ...(data.Memory ?? []),
          ...(data.Network ?? []),
        ].flatMap(h => h.Sensors?.map(s => ({Identifier: s.Identifier, Value: s.Value})) ?? []);
        const reportWithRawSensors: Partial<HardwareDataReport> & HardwareReport = {
          ...data,
          rawSensors,
          networkDetails: this.cachedNetworkDetails,
        };
        this.sendToRenderer(HMONITOR_IPC_DATA_UPDATE, reportWithRawSensors);
        void this.getNetworkDetails();
      });

      this.hwMonitor.on('error', (error: MonitorError) => {
        console.error('Hardware Monitoring Error:', error.message, error.rawError ?? '');
        this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
      });

      const intervalMs = (this.config.refreshInterval || 1) * 1000;

      if (components.length > 0) {
        this.hwMonitor.startTimed(intervalMs, components);
      }
    } catch (error) {
      console.error('Failed to start monitoring:', error);
      this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
    }
  }

  private stopMonitoring(): void {
    this.hwMonitor?.stopTimed();
    this.hwMonitor = undefined;
  }

  private updateConfig(newConfig: MonitoringSettings): void {
    const oldConfig = this.config;

    // Check if monitoring needs to be restarted
    const shouldRestart =
      !isEqual(newConfig.enabledMetrics, oldConfig.enabledMetrics) ||
      !isEqual(newConfig.refreshInterval, oldConfig.refreshInterval);

    this.config = newConfig;
    this.saveConfig();

    if (newConfig.enabled && shouldRestart) {
      this.stopMonitoring();
    }

    // Toggle monitoring state if enabled status changed
    if (newConfig.enabled !== oldConfig.enabled) {
      newConfig.enabled ? void this.startMonitoring() : this.stopMonitoring();
    } else if (newConfig.enabled && shouldRestart) {
      // If already enabled but config changed, restart with new settings
      void this.startMonitoring();
    }

    this.startPinging();
  }

  private async resetConfig(): Promise<void> {
    if (!this.storeManager) return;

    this.config = {
      ...initialSettings,
      pingState: {
        ...initialSettings.pingState,
        hosts: [],
        enabledHosts: [],
      },
    };
    this.saveConfig();

    this.stopMonitoring();
    this.stopPinging();

    await this.discoverHardware();
  }

  private registerLifecycleHandlers(): void {
    app.on('window-all-closed', () => {
      hardwareFlyoutView.hide();
      this.stopPinging();
      this.stopMonitoring();
    });
  }

  private registerIpcHandlers(): void {
    ipcMain.on(HMONITOR_IPC_SET_CONFIG, (_, newConfig: string) => {
      // JSON serialization over IPC can turn undefined into null
      if (isNil(newConfig)) return;
      this.updateConfig(JSON.parse(newConfig));
    });
    ipcMain.on(HMONITOR_IPC_RESET_CONFIG, () => {
      void this.resetConfig();
    });

    ipcMain.on(HMONITOR_IPC_SHOW_FLYOUT, (_, data) => {
      let key: string | undefined;
      if (data.section === 'cpu') key = data.payload?.cpu?.data?.name;
      else if (data.section === 'gpu') key = data.payload?.gpu?.data?.name;
      else if (data.section === 'memory') key = data.payload?.memory?.data?.name;
      else if (data.section === 'network') key = data.payload?.network?.data?.name;
      else if (data.section === 'ping') key = data.payload?.ping?.host;

      data.history = hardwareTelemetryHistory.getHistory(data.section, key);
      void hardwareFlyoutView.show(data);
    });
    ipcMain.on(HMONITOR_IPC_UPDATE_FLYOUT, (_, data) => {
      let key: string | undefined;
      if (data.section === 'cpu') key = data.payload?.cpu?.data?.name;
      else if (data.section === 'gpu') key = data.payload?.gpu?.data?.name;
      else if (data.section === 'memory') key = data.payload?.memory?.data?.name;
      else if (data.section === 'network') key = data.payload?.network?.data?.name;
      else if (data.section === 'ping') key = data.payload?.ping?.host;

      data.history = hardwareTelemetryHistory.getHistory(data.section, key);
      hardwareFlyoutView.update(data);
    });

    ipcMain.on(HMONITOR_IPC_HIDE_FLYOUT, () => {
      hardwareFlyoutView.onTriggerLeave();
    });
    ipcMain.on(HMONITOR_IPC_FLYOUT_MOUSE_EVENT, (_, eventType: 'enter' | 'leave') => {
      hardwareFlyoutView.onFlyoutMouseEvent(eventType);
    });
    ipcMain.on(HMONITOR_IPC_FLYOUT_RESIZE, (_, data: {width?: number; height: number}) => {
      hardwareFlyoutView.onResize(data);
    });
    ipcMain.on(HMONITOR_IPC_FLYOUT_SET_RANGE, (_, range: TimeRangeOption) => {
      hardwareFlyoutView.setActiveRange(range);
    });
  }
}

export const hardwareMonitorService = HardwareMonitorService.getInstance();
