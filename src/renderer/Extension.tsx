import './index.css';

import {ExtensionRendererApi} from '../../../src/renderer/src/App/Extensions/ExtensionTypes_Renderer_Api';
import HardwareStatusBar from './Components/HardwareStatusBar';

export function InitialExtensions(lynxAPI: ExtensionRendererApi) {
  lynxAPI.statusBar.replaceContainer(HardwareStatusBar);
}
