import {useDispatch} from 'react-redux';

import rendererIpc from '../../../../src/renderer/src/App/RendererIpc';
import {HMONITOR_STORAGE_ID} from '../../cross/CrossConst';
import {MonitoringSettings} from '../../cross/CrossTypes';
import {systemMonitorActions} from '../reducer';

export default function UpdateConfig() {
  const dispatch = useDispatch();
  rendererIpc.storage.getCustom(HMONITOR_STORAGE_ID).then((result: MonitoringSettings) => {
    dispatch(systemMonitorActions.setConfig(result));
  });

  return <></>;
}
