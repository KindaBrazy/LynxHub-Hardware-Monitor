import {
  ExtensionMainApi,
  MainExtensionUtils,
} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import {listenForHWChannels, onAppReady, onAppReadyToShow} from './HardwareMonitor';

export async function initialExtension(lynxApi: ExtensionMainApi, utils: MainExtensionUtils) {
  lynxApi.listenForChannels(() => listenForHWChannels());
  lynxApi.onReadyToShow(() => onAppReadyToShow(utils));
  lynxApi.onAppReady(() => onAppReady(utils));
}
