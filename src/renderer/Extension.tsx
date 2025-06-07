import './index.css';

import {ExtensionRendererApi} from '../../../src/renderer/src/App/Extensions/ExtensionTypes_Renderer_Api';
import HardwareStatusBar from './Components/HardwareStatusBar';
import ModalManager from './Components/ModalManager';
import ToolsPage from './Components/ToolsPage';
import UpdateConfig from './Components/UpdateConfig';
import extensionReducer from './reducer';

/* TODO:
    Take care of errors
*/

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
  lynxAPI.addReducer([{name: 'extension', reducer: extensionReducer}]);

  lynxAPI.addCustomHook(UpdateConfig);

  lynxAPI.customizePages.tools.addComponent(ToolsPage);
  lynxAPI.addModal(ModalManager);
}
