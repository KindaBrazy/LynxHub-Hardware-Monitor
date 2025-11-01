import {Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {ExtensionRendererApi} from '../../../../src/cross/plugin/ExtensionTypes_Renderer_Api';
import {HMONITOR_IPC_CONFIG_UPDATE} from '../../cross/constants';
import {MonitoringSettings} from '../../cross/types';
import {hmonitorActions} from '../state/hmonitorSlice';

/**
 * A provider component that listens for configuration updates from the main process
 * and syncs them with the Redux state. This is registered via LynxHub's `addCustomHook`.
 */
function ConfigProviderWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleConfigUpdate = (_: unknown, newConfig: MonitoringSettings) => {
      if (newConfig) {
        dispatch(hmonitorActions.setConfig(newConfig));
      }
    };

    window.electron.ipcRenderer.on(HMONITOR_IPC_CONFIG_UPDATE, handleConfigUpdate);
    return () => window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_CONFIG_UPDATE);
  }, [dispatch]);

  return <Fragment />;
}

export default function ConfigProvider(lynxAPI: ExtensionRendererApi) {
  lynxAPI.addCustomHook(ConfigProviderWrapper);
}
