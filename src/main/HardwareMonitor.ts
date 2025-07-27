import {join} from 'node:path';

import HardwareMonitor, {HardwareReport, MonitorError} from '@lynxhub/hwmonitor';
import {app, ipcMain, WebContents} from 'electron';
import {isArray, isEqual} from 'lodash';

import {MainExtensionUtils} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import StorageManager from '../../../src/main/Managements/Storage/StorageManager';
import {
  HMONITOR_IPC_DATA_ID,
  HMONITOR_IPC_ERROR_MONITORING,
  HMONITOR_IPC_GET_HARDWARE,
  HMONITOR_IPC_STOP_ID,
  HMONITOR_IPC_UPDATE_CONFIG,
  HMONITOR_STORAGE_ID,
  initialSystemMetrics,
} from '../cross/CrossConst';
import {AvailableHardware, MonitoringSettings} from '../cross/CrossTypes';
import {getActiveComponentTypes} from './Utils';

let storeManager: StorageManager | undefined = undefined;
let hwMonitor: HardwareMonitor | undefined = undefined;
let currentConfig: MonitoringSettings | undefined = undefined;
let webContent: WebContents | undefined = undefined;

async function startMonitoring() {
  if (!webContent || !currentConfig) {
    console.warn(
      `Cannot start monitoring. Web content or config not found., webContent: ${webContent}, config:${currentConfig}`,
    );
    return;
  }

  try {
    hwMonitor = new HardwareMonitor('info');

    const targetDir = join(app.getPath('downloads'), 'LynxHub');
    await hwMonitor.checkRequirements(targetDir);

    hwMonitor.on('data', (data: HardwareReport) => {
      if (webContent) webContent.send(HMONITOR_IPC_DATA_ID, data);
    });

    hwMonitor.on('error', (error: MonitorError) => {
      console.error('Timed Monitoring Error:', error.message);
      if (error.stderrData) console.error('Stderr:', error.stderrData);
      if (error.rawError) console.error('Raw Error:', error.rawError);
      if (webContent) webContent.send(HMONITOR_IPC_ERROR_MONITORING, error);
    });

    const targetInterval = (currentConfig.refreshInterval || 1) * 1000;
    const targetComponents = getActiveComponentTypes(currentConfig.enabledMetrics);

    hwMonitor.startTimed(targetInterval, targetComponents);
  } catch (e) {
    console.error(e);
    if (webContent) webContent.send(HMONITOR_IPC_ERROR_MONITORING, e);
  }
}

function stopMonitoring() {
  hwMonitor?.stopTimed();
  hwMonitor = undefined;
}

export async function onAppReady(utils: MainExtensionUtils) {
  console.log('App Ready');
  utils.getStorageManager().then(manager => {
    storeManager = manager;
    currentConfig = storeManager.getCustomData(HMONITOR_STORAGE_ID);

    // noinspection SuspiciousTypeOfGuard
    if (!currentConfig || isArray(currentConfig.enabledMetrics)) {
      currentConfig = {
        enabled: true,
        compactMode: false,
        showSectionLabel: true,
        showMetricLabel: true,
        refreshInterval: 1,
        enabledMetrics: initialSystemMetrics,
      };
      storeManager.setCustomData(HMONITOR_STORAGE_ID, currentConfig);
    } else if (!currentConfig.showMetricLabel) {
      currentConfig.showMetricLabel = true;
      storeManager.setCustomData(HMONITOR_STORAGE_ID, currentConfig);
    }
  });
}

async function getHardwareNames(): Promise<AvailableHardware> {
  const hm = new HardwareMonitor('error');

  const targetDir = join(app.getPath('downloads'), 'LynxHub');
  await hm.checkRequirements(targetDir);

  const result = await hm.getDataOnce(['cpu', 'gpu', 'memory']);
  const gpu = result.GPU.map(item => item.Name);
  const cpu = result.CPU.map(item => item.Name);
  const memory = result.Memory.map(item => item.Name);

  return {cpu, gpu, memory};
}

let started: boolean = false;

export function onAppReadyToShow(utils: MainExtensionUtils) {
  console.log('App Ready To Show');
  if (!started) {
    utils.getAppManager().then(appManager => {
      webContent = appManager.getWebContent();
      if (currentConfig?.enabled) startMonitoring();
    });
    started = true;
  }
}

function updateConfig(config: MonitoringSettings) {
  if (config.enabled !== currentConfig?.enabled) {
    if (config.enabled) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  }

  if (
    !isEqual(config.enabledMetrics, currentConfig?.enabledMetrics) ||
    !isEqual(config.refreshInterval, currentConfig?.refreshInterval)
  ) {
    stopMonitoring();
    startMonitoring();
  }

  currentConfig = config;
  storeManager?.setCustomData(HMONITOR_STORAGE_ID, config);
}

export function listenForHWChannels() {
  ipcMain.on(HMONITOR_IPC_STOP_ID, () => stopMonitoring());
  ipcMain.on(HMONITOR_IPC_UPDATE_CONFIG, (_, config: string) => updateConfig(JSON.parse(config)));
  ipcMain.handle(HMONITOR_IPC_GET_HARDWARE, () => getHardwareNames());
}
