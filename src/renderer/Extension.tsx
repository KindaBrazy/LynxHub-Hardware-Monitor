import './index.css';

import {ExtensionRendererApi} from '../../../src/renderer/src/App/Extensions/ExtensionTypes_Renderer_Api';
import HardwareStatusBar from './Components/HardwareStatusBar';
import ModalManager from './Components/ModalManager';
import ToolsPage from './Components/ToolsPage';
import extensionReducer from './reducer';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
  lynxAPI.addReducer([{name: 'extension', reducer: extensionReducer}]);

  lynxAPI.customizePages.tools.addComponent(ToolsPage);
  lynxAPI.addModal(ModalManager);
}
