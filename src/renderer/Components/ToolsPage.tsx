import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {ToolsCard} from '../../../../src/renderer/src/App/Components/Reusable/ToolsCard';
import {useTabsState} from '../../../../src/renderer/src/App/Redux/Reducer/TabsReducer';
import {systemMonitorActions} from '../reducer';

const title: string = 'Hardware Monitor';
const description: string =
  'A configurable and real-time monitoring of CPU, GPU, and Memory usage, displayed in the status bar.';
const icon: string =
  'https://raw.githubusercontent.com/KindaBrazy/LynxHub-Hardware-Monitor/refs/heads/metadata/icon.png';

export default function ToolsPage() {
  const activeTab = useTabsState('activeTab');
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    dispatch(systemMonitorActions.openModal({tabID: activeTab}));
  }, [activeTab]);

  return <ToolsCard icon={icon} title={title} onPress={openModal} description={description} />;
}
