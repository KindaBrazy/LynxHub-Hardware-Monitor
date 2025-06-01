import './index.css';

import {ExtensionRendererApi} from '../../../src/renderer/src/App/Extensions/ExtensionTypes_Renderer_Api';
import HardwareStatusBar from './Components/HardwareStatusBar';
import extensionReducer from './reducer';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
  lynxAPI.addReducer([{name: 'extension', reducer: extensionReducer}]);
}
