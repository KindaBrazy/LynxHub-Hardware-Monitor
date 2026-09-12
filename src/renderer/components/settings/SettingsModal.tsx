import {Button, Key, Modal, ScrollShadow, Spinner, Tabs, UseOverlayStateReturn} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {AppDispatch} from '@lynx/redux/store';
import storageIpc from '@lynx_shared/ipc/storage';
import {CpuBoltIcon, DisketteIcon, RestartIcon, SettingsMinimalisticIcon} from '@solar-icons/react/bold-duotone';
import {AnimatePresence, motion} from 'framer-motion';
import {useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {HMONITOR_IPC_RESET_CONFIG, HMONITOR_STORAGE_ID} from '../../../cross/constants';
import {DisplayStyle, MetricType, MonitoringSettings} from '../../../cross/types';
import {toastHolder} from '../../classHolder';
import {hmonitorActions, useHMonitorSelector} from '../../state/hmonitorSlice';
import ConfigurationTab from './ConfigurationTab';
import MetricsTab from './MetricsTab';

type SettingsModalProps = {state: UseOverlayStateReturn};

export default function SettingsModal({state}: SettingsModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useHMonitorSelector(state => state.hmonitor);
  const {displayStyle, availableHardware} = settings;

  const [activeTab, setActiveTab] = useState<Key>('config');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [selectedNetworkName, setSelectedNetworkName] = useState<Key>(availableHardware.network[0]?.name || '');

  const isRawStyle = useMemo(() => displayStyle === 'raw' || displayStyle === 'raw-two-column', [displayStyle]);

  function updateState<K extends keyof MonitoringSettings>(key: K, value: MonitoringSettings[K]) {
    dispatch(hmonitorActions.updateState({key, value}));
  }

  const handleDisplayStyleChange = (style: DisplayStyle) => {
    updateState('displayStyle', style);
    if (style === 'raw' || style === 'raw-two-column') {
      updateState('showSectionLabel', false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      storageIpc.getCustom(HMONITOR_STORAGE_ID).then(savedSettings => {
        if (savedSettings) dispatch(hmonitorActions.setConfig(savedSettings as MonitoringSettings));
      });
    }
    state.setOpen(value);
  };

  const saveSettings = () => {
    setIsSaving(true);
    dispatch(hmonitorActions.saveSettings());
    setTimeout(() => {
      setIsSaving(false);
      toastHolder?.top.success('Hardware monitor settings saved!');
      state.close();
    }, 450);
  };

  const resetSettings = () => {
    setIsResetting(true);
    window.electron.ipcRenderer.send(HMONITOR_IPC_RESET_CONFIG);
    setTimeout(() => {
      setIsResetting(false);
      toastHolder?.top.success('Settings restored to defaults!');
    }, 700);
  };

  const toggleHardwareActive = useCallback(
    (name: string | Key, type: MetricType) => {
      const hardwareConfig = settings.enabledMetrics[type].find(metric => metric.name === name);
      if (hardwareConfig) {
        dispatch(hmonitorActions.updateHardwareActive({type, name: name as string, active: !hardwareConfig.active}));
      }
    },
    [settings.enabledMetrics, dispatch],
  );

  const handleSectionReorder = (newOrder: string[]) => {
    const allTypes = ['cpu', 'gpu', 'memory', 'network', 'uptime', 'ping'];
    const missing = allTypes.filter(type => !newOrder.includes(type));
    dispatch(hmonitorActions.updateSectionOrder([...newOrder, ...missing]));
  };

  return (
    <TabModal
      size="lg"
      isOpen={state.isOpen}
      onOpenChange={handleOpenChange}
      dialogClassName="max-w-5xl px-0 overflow-hidden flex flex-col max-h-[88vh]">
      <Modal.CloseTrigger />

      {/* Modal Header */}
      <Modal.Header className="px-6 pt-5 pb-3 flex flex-col gap-y-3 border-b border-surface-tertiary/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div
              className={
                'size-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-sm'
              }>
              <CpuBoltIcon className="size-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Modal.Heading className="text-base font-bold text-foreground">Hardware Monitor</Modal.Heading>
              </div>
              <p className="text-xs text-muted">
                Configure real-time CPU, GPU, Memory, Network, Uptime, and Latency telemetry
              </p>
            </div>
          </div>
        </div>

        {/* HeroUI v3 Tabs Navigation */}
        <div className="w-full pt-1">
          <Tabs variant="primary" className="w-full" selectedKey={activeTab} onSelectionChange={setActiveTab}>
            <Tabs.ListContainer>
              <Tabs.List aria-label="Settings Categories" className="w-full grid grid-cols-2 gap-1">
                <Tabs.Tab id="config" className={'flex items-center justify-center gap-2 font-semibold'}>
                  <SettingsMinimalisticIcon className="size-4" />
                  <span>Configuration & Layout</span>
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="metrics" className={'flex items-center justify-center gap-2 font-semibold'}>
                  <CpuBoltIcon className="size-4" />
                  <span>Metrics & Hardware</span>
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>
      </Modal.Header>

      {/* Modal Body with Animated Tab Panels */}
      <Modal.Body className="p-0 overflow-hidden flex-1 relative min-h-96">
        <ScrollShadow className="px-6 py-4 size-full">
          <AnimatePresence mode="wait">
            {activeTab === 'config' ? (
              <motion.div
                key="config-tab"
                exit={{opacity: 0, y: -6}}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.15, ease: 'easeOut'}}>
                <ConfigurationTab
                  settings={settings}
                  isRawStyle={isRawStyle}
                  updateState={updateState}
                  handleDisplayStyleChange={handleDisplayStyleChange}
                />
              </motion.div>
            ) : (
              <motion.div
                key="metrics-tab"
                exit={{opacity: 0, y: -6}}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.15, ease: 'easeOut'}}>
                <MetricsTab
                  settings={settings}
                  updateState={updateState}
                  selectedNetworkName={selectedNetworkName}
                  toggleHardwareActive={toggleHardwareActive}
                  handleSectionReorder={handleSectionReorder}
                  setSelectedNetworkName={setSelectedNetworkName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollShadow>
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer className={'px-6 pt-4 flex flex-row items-center justify-between w-full'}>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={resetSettings}
          isDisabled={isSaving || isResetting}
          className="text-xs font-medium transition-transform active:scale-[0.97]">
          {isResetting ? <Spinner size="sm" color="current" /> : <RestartIcon className="size-4" />}
          Reset Defaults
        </Button>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="tertiary"
            onPress={() => state.close()}
            className="text-xs font-medium transition-transform active:scale-[0.97]">
            Cancel
          </Button>

          <Button
            size="sm"
            variant="primary"
            isPending={isSaving}
            onPress={saveSettings}
            className="text-xs font-semibold px-4 transition-transform active:scale-[0.97] shadow-sm">
            {isSaving ? (
              <Spinner size="sm" color="current" />
            ) : (
              <>
                <DisketteIcon className="size-4" />
                <span>Save Settings</span>
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </TabModal>
  );
}
