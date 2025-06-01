import {ipcMain} from 'electron';

import {
  ExtensionMainApi,
  MainExtensionUtils,
} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import StorageManager from '../../../src/main/Managements/Storage/StorageManager';
import {HMONITOR_IPC_STOP_ID, HMONITOR_STORAGE_ID} from '../cross/CrossConst';
import {HMonitorStorageType} from '../cross/CrossTypes';
import HardwareDataService from './Methods/Hardware2';

let storeManager: StorageManager | undefined = undefined;
let dataService: HardwareDataService | undefined = undefined;

export async function initialExtension(lynxApi: ExtensionMainApi, utils: MainExtensionUtils) {
  lynxApi.onReadyToShow(() => {
    utils.getStorageManager().then(manager => {
      storeManager = manager;

      let data: HMonitorStorageType = storeManager.getCustomData(HMONITOR_STORAGE_ID);

      if (!data) {
        data = {
          enabled: true,
          compactMode: false,
          showSectionLabel: true,
          enableMonitor: [
            'cpuTemp',
            'cpuUsage',
            'gpuTemp',
            'gpuUsage',
            'memory',
            'uptimeSystemSeconds',
            'uptimeSeconds',
          ],
        };
        storeManager.setCustomData(HMONITOR_STORAGE_ID, data);
      }

      if (data.enabled) {
        utils.getAppManager().then(appManager => {
          const window = appManager.getMainWindow();

          if (window) {
            dataService = new HardwareDataService(window);
            dataService.startCollecting(1000);
          }
        });

        ipcMain.on(HMONITOR_IPC_STOP_ID, () => {
          if (dataService) dataService.stopCollecting();
        });
      }
    });
  });
}
