import {ipcMain} from 'electron';

import {
  ExtensionMainApi,
  MainExtensionUtils,
} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import StorageManager from '../../../src/main/Managements/Storage/StorageManager';
import {HMONITOR_IPC_STOP_ID, HMONITOR_STORAGE_ID, initialSystemMetrics} from '../cross/CrossConst';
import {MonitoringSettings} from '../cross/CrossTypes';
import {startMonitoring, stopMonitoring} from './HardwareMonitor';

let storeManager: StorageManager | undefined = undefined;

export async function initialExtension(lynxApi: ExtensionMainApi, utils: MainExtensionUtils) {
  lynxApi.onReadyToShow(() => {
    utils.getStorageManager().then(manager => {
      storeManager = manager;

      let data: MonitoringSettings = storeManager.getCustomData(HMONITOR_STORAGE_ID);

      if (!data) {
        data = {
          enabled: true,
          compactMode: false,
          showSectionLabel: true,
          enabledMetrics: initialSystemMetrics,
        };
        storeManager.setCustomData(HMONITOR_STORAGE_ID, data);
      }

      if (data.enabled) {
        utils.getAppManager().then(appManager => {
          const webContent = appManager.getWebContent();

          if (webContent) startMonitoring(webContent, data.enabledMetrics);
        });

        ipcMain.on(HMONITOR_IPC_STOP_ID, () => stopMonitoring());
      }
    });
  });
}
