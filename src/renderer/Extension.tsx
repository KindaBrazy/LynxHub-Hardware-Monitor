import './index.css';

import {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';

import {SENTRY_DSN} from '../cross/constants';
import {setToast} from './classHolder';
import HardwareStatusBar from './components/status-bar/HardwareStatusBar';
import ConfigProvider from './integrations/ConfigProvider';
import HardwareMonitorCard from './integrations/ToolsPage';
import hmonitorReducer from './state/hmonitorSlice';

/**
 * Entry point for the extension's renderer process.
 * This function is called by LynxHub to integrate the extension's UI components.
 */
export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  lynxAPI.initBrowserSentry(SENTRY_DSN);

  // Register the Redux slice for state management.
  lynxAPI.addReducer([{name: 'hmonitor', reducer: hmonitorReducer}]);
  if (lynxAPI.toast) setToast(lynxAPI.toast);

  // Replace the default status bar container with our custom hardware monitor.
  // @ts-ignore-next-line - Type mismatch with host application, but functionally correct.
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);

  // Integrate the settings card into the "Tools" page.
  lynxAPI.cards.registerToolsCard?.({
    id: 'hardware-monitor',
    title: 'Hardware Monitor',
    description: 'Configure real-time monitoring of CPU, GPU, and Memory usage in the status bar.',
    component: HardwareMonitorCard,
    where: 'tools_page',
  });

  if (!lynxAPI.cards.registerToolsCard) {
    lynxAPI.customizePages.tools.add.cardsContainer(HardwareMonitorCard);
  }

  // Add a provider component that listens for configuration updates from the main process.
  ConfigProvider(lynxAPI);
}
