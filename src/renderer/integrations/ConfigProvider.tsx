import {ExtensionRendererApi} from '@lynx/plugins/extensions/types/api';
import {Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux';

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

    const clearListener = window.electron.ipcRenderer.on(HMONITOR_IPC_CONFIG_UPDATE, handleConfigUpdate);
    return () => clearListener();
  }, [dispatch]);

  return <Fragment />;
}

export default function ConfigProvider(lynxAPI: ExtensionRendererApi) {
  lynxAPI.addCustomHook(ConfigProviderWrapper);
}
