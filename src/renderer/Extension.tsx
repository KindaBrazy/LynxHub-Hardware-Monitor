import './index.css';

import {ExtensionRendererApi} from '../../../src/cross/plugin/ExtensionTypes_Renderer_Api';
import HardwareStatusBar from './Components/HardwareStatusBar';
import ModalManager from './Components/ModalManager';
import ToolsPage from './Components/ToolsPage';
import AddCustomHook from './Components/UpdateConfig';
import extensionReducer from './reducer';

/* TODO:
    Take care of errors
*/

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  // @ts-ignore-next-line
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
  lynxAPI.addReducer([{name: 'extension', reducer: extensionReducer}]);

  AddCustomHook(lynxAPI);

  lynxAPI.customizePages.tools.addComponent(ToolsPage);
  lynxAPI.addModal(ModalManager);
}
