import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {ToolsCard} from '../../../../src/renderer/src/App/Components/Reusable/ToolsCard';
import {useTabsState} from '../../../../src/renderer/src/App/Redux/Reducer/TabsReducer';
import {hmonitorActions} from '../state/hmonitorSlice';

const CARD_PROPS = {
  title: 'Hardware Monitor',
  description: 'Configure real-time monitoring of CPU, GPU, and Memory usage in the status bar.',
  icon: 'https://raw.githubusercontent.com/KindaBrazy/LynxHub-Hardware-Monitor/refs/heads/metadata/icon.png',
};

/**
 * Renders a card on the LynxHub "Tools" page that allows users
 * to open the hardware monitor settings.
 */
export default function ToolsPage() {
  const activeTab = useTabsState('activeTab');
  const dispatch = useDispatch();

  const openSettingsModal = useCallback(() => {
    dispatch(hmonitorActions.openModal({tabID: activeTab}));
  }, [activeTab, dispatch]);

  return <ToolsCard {...CARD_PROPS} onPress={openSettingsModal} />;
}
