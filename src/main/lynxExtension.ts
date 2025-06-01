import {
  EMenuItem,
  ExtensionMainApi,
  MainExtensionUtils,
} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import StorageManager from '../../../src/main/Managements/Storage/StorageManager';
import HardwareDataService from './Methods/Hardware2';
import {listenForChannels} from './Methods/IpcChannels';

let storeManager: StorageManager | undefined = undefined;

async function onAppReady() {
  console.log('Extension onAppReady storeManager: ', storeManager?.getData('cards').installedCards);
}

function trayMenu_AddItem(): {item: EMenuItem; index: number} {
  return {item: {label: 'Extension Test', type: 'checkbox'}, index: 3};
}

export async function initialExtension(lynxApi: ExtensionMainApi, utils: MainExtensionUtils) {
  lynxApi.onReadyToShow(() => {
    utils.getAppManager().then(appManager => {
      const window = appManager.getMainWindow();
      if (window) {
        const dataService = new HardwareDataService(window);
        dataService.startCollecting(1000);
      }
    });
  });

  return;

  utils.getStorageManager().then(storageManager => {
    storeManager = storageManager;
  });
  utils.getModuleManager().then(moduleManager => {
    console.log('Extension moduleManager: ', moduleManager.getInstalledPluginInfo());
  });

  lynxApi.trayMenu_AddItem(trayMenu_AddItem);
  lynxApi.listenForChannels(listenForChannels);

  lynxApi.onAppReady(onAppReady);
}
