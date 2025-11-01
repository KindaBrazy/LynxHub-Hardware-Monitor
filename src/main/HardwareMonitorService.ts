import {join} from 'node:path';

import HardwareMonitor, {HardwareReport, MonitorError} from '@lynxhub/hwmonitor';
import {app, ipcMain, WebContents} from 'electron';
import {isEmpty, isEqual, isNil} from 'lodash';

import {MainExtensionUtils} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import StorageManager from '../../../src/main/Managements/Storage/StorageManager';
import {
  HMONITOR_IPC_CONFIG_UPDATE,
  HMONITOR_IPC_DATA_UPDATE,
  HMONITOR_IPC_MONITORING_ERROR,
  HMONITOR_IPC_SET_CONFIG,
  HMONITOR_STORAGE_ID,
  initialSettings,
} from '../cross/constants';
import {HardwareDataReport, HardwareInfo, MonitoringSettings} from '../cross/types';
import {getActiveComponentTypes} from './utils';

const HARDWARE_CHECK_MAX_RETRIES = 5;

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

  private constructor() {}

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
    await this.discoverHardware(); // Discover hardware before loading config for migration
    this.loadConfig();
    this.registerIpcHandlers();

    this.isInitialized = true;
  }

  /**
   * Sets the webContents for IPC communication and starts monitoring if enabled.
   */
  public onMainWindowReady(utils: MainExtensionUtils): void {
    utils.getAppManager().then(appManager => {
      this.webContents = appManager.getWebContent();
      // Send the latest config to the renderer once it's ready
      this.sendToRenderer(HMONITOR_IPC_CONFIG_UPDATE, this.config);

      if (this.config.enabled) {
        this.startMonitoring();
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
      const migratedConfig = {
        ...initialSettings,
        ...(storedConfig && {
          // Carry over old settings if they exist
          enabled: storedConfig.enabled,
          refreshInterval: storedConfig.refreshInterval,
          compactMode: storedConfig.compactMode,
          showSectionLabel: storedConfig.showSectionLabel,
          enabledMetrics: storedConfig.enabledMetrics, // Carry over old metric selections
        }),
      };

      // Add the new `custom` property during migration
      migratedConfig.enabledMetrics.cpu.forEach(c => (c.custom ??= []));
      migratedConfig.enabledMetrics.gpu.forEach(g => (g.custom ??= []));
      migratedConfig.enabledMetrics.memory.forEach(m => (m.custom ??= []));

      storedConfig = migratedConfig;
    }

    this.config = {...storedConfig, availableHardware: this.config.availableHardware};
    this.saveConfig();
  }

  private saveConfig(): void {
    this.storeManager?.setCustomData(HMONITOR_STORAGE_ID, this.config);
  }

  private async discoverHardware(): Promise<void> {
    for (let i = 0; i < HARDWARE_CHECK_MAX_RETRIES; i++) {
      try {
        const monitor = new HardwareMonitor('error');
        const targetDir = join(app.getPath('downloads'), 'LynxHub');
        await monitor.checkRequirements(targetDir);

        const result = await monitor.getDataOnce(['cpu', 'gpu', 'memory']);
        const mapToHardwareInfo = (items: {Name: string; Sensors: any[]}[]): HardwareInfo[] => {
          return items.map(item => ({
            name: item.Name,
            sensors: item.Sensors.map(s => ({
              Name: s.Name,
              Type: s.Type,
              Unit: s.Unit,
              Identifier: s.Identifier,
            })),
          }));
        };

        this.config.availableHardware = {
          gpu: mapToHardwareInfo(result.GPU),
          cpu: mapToHardwareInfo(result.CPU),
          memory: mapToHardwareInfo(result.Memory),
        };

        // Populate enabled metrics for newly discovered hardware
        if (isEmpty(this.config.enabledMetrics.gpu)) {
          this.config.enabledMetrics.gpu = this.config.availableHardware.gpu.map(h => ({
            name: h.name,
            active: true,
            enabled: ['temp', 'usage', 'vram'],
            custom: [],
          }));
        }
        if (isEmpty(this.config.enabledMetrics.cpu)) {
          this.config.enabledMetrics.cpu = this.config.availableHardware.cpu.map(h => ({
            name: h.name,
            active: true,
            enabled: ['temp', 'usage'],
            custom: [],
          }));
        }
        if (isEmpty(this.config.enabledMetrics.memory)) {
          this.config.enabledMetrics.memory = this.config.availableHardware.memory.map(h => ({
            name: h.name,
            active: true,
            enabled: ['memory'],
            custom: [],
          }));
        }

        this.saveConfig();
        this.sendToRenderer(HMONITOR_IPC_CONFIG_UPDATE, this.config);
        return; // Success
      } catch (error) {
        console.warn(`Hardware discovery attempt ${i + 1} failed:`, error);
        if (i === HARDWARE_CHECK_MAX_RETRIES - 1) {
          console.error('All hardware discovery attempts failed.');
          this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
        }
      }
    }
  }

  private async startMonitoring(): Promise<void> {
    // Prevent starting if already running or misconfigured
    if (this.hwMonitor || !this.config) {
      return;
    }

    try {
      this.hwMonitor = new HardwareMonitor('error');

      // Ensure requirements are checked for this instance before starting
      const targetDir = join(app.getPath('downloads'), 'LynxHub');
      await this.hwMonitor.checkRequirements(targetDir);

      this.hwMonitor.on('data', (data: HardwareReport) => {
        // Flatten all sensor values for easy lookup on the renderer side
        const rawSensors = [...data.CPU, ...data.GPU, ...data.Memory].flatMap(h =>
          h.Sensors.map(s => ({Identifier: s.Identifier, Value: s.Value})),
        );
        const reportWithRawSensors: Partial<HardwareDataReport> & HardwareReport = {...data, rawSensors};
        this.sendToRenderer(HMONITOR_IPC_DATA_UPDATE, reportWithRawSensors);
      });

      this.hwMonitor.on('error', (error: MonitorError) => {
        console.error('Hardware Monitoring Error:', error.message, error.rawError ?? '');
        this.sendToRenderer(HMONITOR_IPC_MONITORING_ERROR, error);
      });

      const intervalMs = (this.config.refreshInterval || 1) * 1000;
      const components = getActiveComponentTypes(this.config.enabledMetrics);

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

    if (newConfig.enabled && shouldRestart) {
      this.stopMonitoring();
    }

    // Toggle monitoring state if enabled status changed
    if (newConfig.enabled !== oldConfig.enabled) {
      newConfig.enabled ? this.startMonitoring() : this.stopMonitoring();
    } else if (newConfig.enabled && shouldRestart) {
      // If already enabled but config changed, restart with new settings
      this.startMonitoring();
    }

    this.config = newConfig;
    this.saveConfig();
  }

  private registerIpcHandlers(): void {
    ipcMain.on(HMONITOR_IPC_SET_CONFIG, (_, newConfig: string) => {
      // JSON serialization over IPC can turn undefined into null
      if (isNil(newConfig)) return;
      this.updateConfig(JSON.parse(newConfig));
    });
  }
}

export const hardwareMonitorService = HardwareMonitorService.getInstance();
