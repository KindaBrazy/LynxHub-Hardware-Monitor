import {
  ExtensionMainApi,
  MainExtensionUtils,
} from '../../../src/main/Managements/Plugin/Extensions/ExtensionTypes_Main';
import {hardwareMonitorService} from './HardwareMonitorService';

/**
 * Entry point for the extension's main process logic.
 * Hooks into the LynxHub application lifecycle.
 */
export async function initialExtension(lynxApi: ExtensionMainApi, utils: MainExtensionUtils) {
  // onAppReady is the first lifecycle event. It's the best place for initialization.
  lynxApi.onAppReady(() => hardwareMonitorService.initialize(utils));

  // onReadyToShow is triggered when the main window is visible.
  // This is when we can safely interact with the renderer process.
  lynxApi.onReadyToShow(() => hardwareMonitorService.onMainWindowReady(utils));
}
