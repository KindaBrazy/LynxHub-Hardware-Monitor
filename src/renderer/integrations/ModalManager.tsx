import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useTabsState} from '../../../../src/renderer/src/App/Redux/Reducer/TabsReducer';
import {AppDispatch} from '../../../../src/renderer/src/App/Redux/Store';
import SettingsModal from '../components/settings/SettingsModal';
import {hmonitorActions, useHMonitorState} from '../state/hmonitorSlice';

/**
 * Manages the lifecycle of settings modals, ensuring one modal exists per application tab.
 * It also handles cleanup when a tab is closed.
 */
export default function ModalManager() {
  const dispatch = useDispatch<AppDispatch>();
  const activeTab = useTabsState('activeTab');
  const tabs = useTabsState('tabs');
  const modals = useHMonitorState('modals');

  // Effect to close and remove modals associated with closed tabs
  useEffect(() => {
    const openModalTabIds = new Set(modals.map(m => m.tabID));
    const existingTabIds = new Set(tabs.map(t => t.id));

    openModalTabIds.forEach(tabID => {
      if (!existingTabIds.has(tabID)) {
        dispatch(hmonitorActions.removeModal({tabID}));
      }
    });
  }, [tabs, modals, dispatch]);

  return (
    <>
      {modals.map(modal => (
        <SettingsModal
          tabID={modal.tabID}
          isOpen={modal.isOpen}
          key={`hmonitor-settings-modal-${modal.tabID}`}
          show={activeTab === modal.tabID ? 'flex' : 'hidden'}
        />
      ))}
    </>
  );
}
