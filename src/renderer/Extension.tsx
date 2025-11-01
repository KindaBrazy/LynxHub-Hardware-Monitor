import './index.css';

import {ExtensionRendererApi} from '../../../src/cross/plugin/ExtensionTypes_Renderer_Api';
import HardwareStatusBar from './components/status-bar/HardwareStatusBar';
import ConfigProvider from './integrations/ConfigProvider';
import ModalManager from './integrations/ModalManager';
import ToolsPage from './integrations/ToolsPage';
import hmonitorReducer from './state/hmonitorSlice';

/**
 * Entry point for the extension's renderer process.
 * This function is called by LynxHub to integrate the extension's UI components.
 */
export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  // Register the Redux slice for state management.
  lynxAPI.addReducer([{name: 'hmonitor', reducer: hmonitorReducer}]);

  // Replace the default status bar container with our custom hardware monitor.
  // @ts-ignore-next-line - Type mismatch with host application, but functionally correct.
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);

  // Integrate the settings card into the "Tools" page.
  lynxAPI.customizePages.tools.addComponent(ToolsPage);

  // Add the modal manager to handle the settings dialog.
  lynxAPI.addModal(ModalManager);

  // Add a provider component that listens for configuration updates from the main process.
  ConfigProvider(lynxAPI);
}
