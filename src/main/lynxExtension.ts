import {
  ExtensionMainApi,
  MainExtensionUtils,
} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import HardwareDataService from './Methods/Hardware2';

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
}
