import {join} from 'node:path';

import HardwareMonitor, {HardwareReport, MonitorError} from '@lynxhub/hwmonitor';
import {app, ipcMain, WebContents} from 'electron';

import {MainExtensionUtils} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import StorageManager from '../../../src/main/Managements/Storage/StorageManager';
import {
  HMONITOR_IPC_DATA_ID,
  HMONITOR_IPC_ERROR_MONITORING,
  HMONITOR_IPC_STOP_ID,
  HMONITOR_IPC_UPDATE_CONFIG,
  HMONITOR_STORAGE_ID,
  initialSystemMetrics,
} from '../cross/CrossConst';
import {MonitoringSettings} from '../cross/CrossTypes';
import {getComponentTypesFromSystemMetrics} from './Utils';

let storeManager: StorageManager | undefined = undefined;
let hwMonitor: HardwareMonitor | undefined = undefined;
let currentConfig: MonitoringSettings | undefined = undefined;
let webContent: WebContents | undefined = undefined;

async function startMonitoring() {
  if (!webContent) return;

  try {
    hwMonitor = new HardwareMonitor();

    const targetDir = join(app.getPath('downloads'), 'LynxHub');
    await hwMonitor.checkRequirements(targetDir);

    hwMonitor.on('data', (data: HardwareReport) => {
      webContent?.send(HMONITOR_IPC_DATA_ID, data);
    });

    hwMonitor.on('error', (error: MonitorError) => {
      console.error('Timed Monitoring Error:', error.message);
      if (error.stderrData) console.error('Stderr:', error.stderrData);
      if (error.rawError) console.error('Raw Error:', error.rawError);
      webContent?.send(HMONITOR_IPC_ERROR_MONITORING, error);
    });

    hwMonitor.startTimed(
      (currentConfig?.refreshInterval || 1) * 1000,
      getComponentTypesFromSystemMetrics(currentConfig?.enabledMetrics || []),
    );
  } catch (e) {
    console.error(e);
    webContent?.send(HMONITOR_IPC_ERROR_MONITORING, e);
  }
}

function stopMonitoring() {
  hwMonitor?.stopTimed();
  hwMonitor = undefined;
}

export function onAppStart(utils: MainExtensionUtils) {
  utils.getStorageManager().then(manager => {
    storeManager = manager;
    currentConfig = storeManager.getCustomData(HMONITOR_STORAGE_ID);

    if (!currentConfig) {
      currentConfig = {
        enabled: true,
        compactMode: false,
        showSectionLabel: true,
        refreshInterval: 1,
        enabledMetrics: initialSystemMetrics,
      };
      storeManager.setCustomData(HMONITOR_STORAGE_ID, currentConfig);
    }

    utils.getAppManager().then(appManager => {
      webContent = appManager.getWebContent();
      if (currentConfig?.enabled) startMonitoring();
    });
  });
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
    config.enabledMetrics !== currentConfig?.enabledMetrics ||
    config.refreshInterval !== currentConfig?.refreshInterval
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
}
