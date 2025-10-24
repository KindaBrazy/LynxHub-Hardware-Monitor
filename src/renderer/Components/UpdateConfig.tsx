import {Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {ExtensionRendererApi} from '../../../../src/cross/plugin/ExtensionTypes_Renderer_Api';
import {HMONITOR_IPC_ON_CONFIG} from '../../cross/CrossConst';
import {MonitoringSettings} from '../../cross/CrossTypes';
import {systemMonitorActions} from '../reducer';

export default function AddCustomHook(lynxAPI: ExtensionRendererApi) {
  const UpdateConfig = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      window.electron.ipcRenderer.on(HMONITOR_IPC_ON_CONFIG, (_, configs: MonitoringSettings) => {
        dispatch(systemMonitorActions.setConfig(configs));
      });

      return () => window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_ON_CONFIG);
    }, []);

    return <Fragment />;
  };

  lynxAPI.addCustomHook(UpdateConfig);
}
