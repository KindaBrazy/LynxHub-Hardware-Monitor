import {Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {ExtensionRendererApi} from '../../../../src/renderer/src/App/Extensions/ExtensionTypes_Renderer_Api';
import {HMONITOR_IPC_GET_HARDWARE, HMONITOR_STORAGE_ID} from '../../cross/CrossConst';
import {AvailableHardware, MonitoringSettings} from '../../cross/CrossTypes';
import {systemMonitorActions} from '../reducer';

export default function AddCustomHook(lynxAPI: ExtensionRendererApi) {
  const UpdateConfig = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      if (lynxAPI.rendererIpc) {
        lynxAPI.rendererIpc.storage.getCustom(HMONITOR_STORAGE_ID).then((result: MonitoringSettings) => {
          dispatch(systemMonitorActions.setConfig(result));
        });
        window.electron.ipcRenderer.invoke(HMONITOR_IPC_GET_HARDWARE).then((data: AvailableHardware) => {
          if (data) {
            dispatch(systemMonitorActions.setAvailableHardware(data));
          }
        });
      }
    }, []);

    return <Fragment />;
  };

  lynxAPI.addCustomHook(UpdateConfig);
}
