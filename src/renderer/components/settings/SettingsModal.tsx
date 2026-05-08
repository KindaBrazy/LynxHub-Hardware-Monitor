import {
  Button,
  Card,
  Checkbox,
  Description,
  Key,
  Label,
  ListBox,
  Modal,
  NumberField,
  Select,
  Separator,
  Spinner,
  Switch,
  UseOverlayStateReturn,
} from '@heroui/react';
import LynxScroll from '@lynx/components/LynxScroll';
import LynxSwitch from '@lynx/components/LynxSwitch';
import TabModal from '@lynx/components/TabModal';
import {topToast} from '@lynx/layouts/ToastProviders';
import {AppDispatch} from '@lynx/redux/store';
import storageIpc from '@lynx_shared/ipc/storage';
import {Diskette} from '@solar-icons/react-perf/BoldDuotone';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowDown, ArrowUp, Clock, Cpu, Database, LucideProps, Thermometer, Timer} from 'lucide-react';
import {ForwardRefExoticComponent, useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {HMONITOR_STORAGE_ID} from '../../../cross/constants';
import {DisplayStyle, HardwareMetricsConfig, MetricType, MonitoringSettings, SystemMetric} from '../../../cross/types';
import {hmonitorActions, useHMonitorSelector} from '../../state/hmonitorSlice';
import MetricVisibilitySettings from './MetricVisibilitySettings';
import SettingsModalCard from './SettingsModalCard';

// Configuration for each available metric type, defining its UI representation.
const METRIC_CONFIG: Record<string, {label: string; Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>}> = {
  temp: {label: 'Temperature', Icon: Thermometer},
  usage: {label: 'Usage', Icon: Cpu},
  vram: {label: 'VRAM', Icon: Database},
  memory: {label: 'Memory Usage', Icon: Database},
  uploadSpeed: {label: 'Upload Speed', Icon: ArrowUp},
  downloadSpeed: {label: 'Download Speed', Icon: ArrowDown},
  uploadData: {label: 'Data Uploaded', Icon: ArrowUp},
  downloadData: {label: 'Data Downloaded', Icon: ArrowDown},
  uptimeSystem: {label: 'System Uptime', Icon: Clock},
  uptimeApp: {label: 'Application Uptime', Icon: Timer},
};

const DISPLAY_STYLES = [
  {value: 'default', label: 'Default', description: 'Standard view with progress bars and labels.'},
  {value: 'compact', label: 'Compact', description: 'A smaller, space-saving layout.'},
  {value: 'two-column', label: 'Two Column', description: 'Metrics are stacked vertically to save horizontal space.'},
  {value: 'raw', label: 'Raw Text', description: 'Minimalist text-only view for the smallest footprint.'},
  {
    value: 'raw-two-column',
    label: 'Raw Text (Two Column)',
    description: 'Minimalist text stacked vertically.',
  },
];

type SettingsModalProps = {state: UseOverlayStateReturn};

export default function SettingsModal({state}: SettingsModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useHMonitorSelector(state => state.hmonitor);
  const {enabled, enabledMetrics, displayStyle, refreshInterval, showSectionLabel, availableHardware} = settings;

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedNetworkName, setSelectedNetworkName] = useState<Key>(availableHardware.network[0]?.name || '');

  const isRawStyle = useMemo(() => displayStyle === 'raw' || displayStyle === 'raw-two-column', [displayStyle]);

  const selectedNetworkConfig = useMemo(
    () => enabledMetrics.network.find(n => n.name === selectedNetworkName),
    [selectedNetworkName, enabledMetrics.network],
  );
  const selectedNetworkHardware = useMemo(
    () => availableHardware.network.find(n => n.name === selectedNetworkName),
    [selectedNetworkName, availableHardware.network],
  );

  function updateState<K extends keyof MonitoringSettings>(key: K, value: MonitoringSettings[K]) {
    dispatch(hmonitorActions.updateState({key, value}));
  }

  const handleDisplayStyleChange = (style: DisplayStyle) => {
    updateState('displayStyle', style);
    // Automatically disable incompatible settings for raw modes
    if (style === 'raw' || style === 'raw-two-column') {
      updateState('showSectionLabel', false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      // Revert changes if the modal is closed without saving
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
      topToast.success('Settings saved successfully!');
    }, 700);
  };

  const getMetricItem = useCallback(
    (metricId: SystemMetric, type: MetricType | 'uptime', hardwareName: string | Key) => {
      const config = METRIC_CONFIG[metricId];
      if (!config) return null;

      let isSelected: boolean;
      let onToggle: () => void;

      if (type === 'uptime') {
        const uptimeType = metricId === 'uptimeApp' ? 'app' : 'system';
        isSelected = enabledMetrics.uptime[uptimeType];
        onToggle = () => dispatch(hmonitorActions.updateUptime({...enabledMetrics.uptime, [uptimeType]: !isSelected}));
      } else {
        const hardwareConfig = (enabledMetrics[type] as HardwareMetricsConfig[]).find(
          metric => metric.name === hardwareName,
        );
        isSelected = !!hardwareConfig?.enabled.includes(metricId);

        onToggle = () => {
          if (!hardwareConfig) return;
          const newEnabled = isSelected
            ? hardwareConfig.enabled.filter(m => m !== metricId)
            : [...hardwareConfig.enabled, metricId];
          dispatch(hmonitorActions.updateHardwareMetrics({type, name: hardwareName as string, enabled: newEnabled}));
        };
      }

      return (
        <Checkbox variant="secondary" onChange={onToggle} isSelected={isSelected}>
          <Checkbox.Content className="flex flex-row items-center gap-x-1">
            <config.Icon className="size-3.5" />
            <Label className="cursor-pointer">{config.label}</Label>
          </Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>
      );
    },
    [enabledMetrics, dispatch],
  );

  const toggleHardwareActive = useCallback(
    (name: string | Key, type: MetricType) => {
      const hardwareConfig = enabledMetrics[type].find(metric => metric.name === name);
      if (hardwareConfig) {
        dispatch(hmonitorActions.updateHardwareActive({type, name: name as string, active: !hardwareConfig.active}));
      }
    },
    [enabledMetrics, dispatch],
  );

  return (
    <TabModal size="lg" isOpen={state.isOpen} onOpenChange={handleOpenChange} dialogClassName="max-w-3xl px-0">
      <Modal.CloseTrigger />
      <Modal.Header className="px-5">
        <Modal.Heading className="items-center justify-center">Hardware Monitor Settings</Modal.Heading>
      </Modal.Header>
      <Modal.Body className="overflow-hidden">
        <LynxScroll className="px-4 size-full">
          <div
            onClick={() => updateState('enabled', !enabled)}
            className="mb-4 rounded-xl bg-surface-secondary p-4 cursor-pointer flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base pointer-events-none">Enable System Monitoring</Label>
              <Description className="pointer-events-none">
                When disabled, all metrics collection will be paused
              </Description>
            </div>
            <Switch size="lg" isSelected={enabled} onChange={value => updateState('enabled', value)}>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
          </div>

          <AnimatePresence>
            {enabled && (
              <motion.div
                transition={{delay: 0.1}}
                className="flex flex-col gap-y-4"
                exit={{translateY: -10, opacity: 0}}
                animate={{translateY: 0, opacity: 1}}
                initial={{translateY: 10, opacity: 0}}>
                <div className="p-4 bg-surface-secondary rounded-3xl flex flex-col gap-y-4">
                  <NumberField
                    step={0.5}
                    maxValue={60}
                    minValue={0.5}
                    value={refreshInterval}
                    onChange={value => updateState('refreshInterval', value)}
                    fullWidth>
                    <Label>Refresh Interval (Seconds)</Label>
                    <NumberField.Group>
                      <NumberField.DecrementButton />
                      <NumberField.Input />
                      <NumberField.IncrementButton />
                    </NumberField.Group>
                    <Description>How frequently metrics should update (0.5-60 seconds)</Description>
                  </NumberField>

                  <Select
                    value={displayStyle}
                    selectionMode="single"
                    placeholder="Select a display style"
                    onChange={value => handleDisplayStyleChange(value as DisplayStyle)}>
                    <Label>Display Style</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {DISPLAY_STYLES.map(style => (
                          <ListBox.Item id={style.value} key={style.value}>
                            <div className="flex flex-col">
                              <Label>{style.label}</Label>
                              <Description>{style.description}</Description>
                            </div>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <LynxSwitch
                    onEnabledChange={value => {
                      if (!isRawStyle) updateState('showSectionLabel', value);
                    }}
                    className="p-1"
                    isDisabled={isRawStyle}
                    enabled={showSectionLabel}
                    title="Show Section Labels"
                    description="Display headers for metric groups (disabled for Raw styles)"
                  />
                  <div className={isRawStyle ? 'opacity-50 pointer-events-none' : ''}>
                    <MetricVisibilitySettings />
                    {isRawStyle && (
                      <p className="text-xs text-muted mt-1">
                        Metric visibility is not applicable for Raw display styles.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 p-2 bg-surface-secondary rounded-3xl">
                  {availableHardware.gpu.map(hw => (
                    <SettingsModalCard
                      type="gpu"
                      hardware={hw}
                      key={`gpu-settings-${hw.name}`}
                      onToggle={() => toggleHardwareActive(hw.name, 'gpu')}
                      config={enabledMetrics.gpu.find(m => m.name === hw.name)}>
                      {getMetricItem('temp', 'gpu', hw.name)}
                      <Separator className="h-2.5 w-px mx-1" />
                      {getMetricItem('usage', 'gpu', hw.name)}
                      <Separator className="h-2.5 w-px mx-1" />
                      {getMetricItem('vram', 'gpu', hw.name)}
                    </SettingsModalCard>
                  ))}

                  {availableHardware.cpu.map(hw => (
                    <SettingsModalCard
                      type="cpu"
                      hardware={hw}
                      key={`cpu-settings-${hw.name}`}
                      onToggle={() => toggleHardwareActive(hw.name, 'cpu')}
                      config={enabledMetrics.cpu.find(m => m.name === hw.name)}>
                      {getMetricItem('temp', 'cpu', hw.name)}
                      <Separator className="h-2.5 w-px mx-1" />
                      {getMetricItem('usage', 'cpu', hw.name)}
                    </SettingsModalCard>
                  ))}

                  {availableHardware.memory.map(hw => (
                    <SettingsModalCard
                      type="memory"
                      hardware={hw}
                      key={`memory-settings-${hw.name}`}
                      onToggle={() => toggleHardwareActive(hw.name, 'memory')}
                      config={enabledMetrics.memory.find(m => m.name === hw.name)}>
                      {getMetricItem('memory', 'memory', hw.name)}
                    </SettingsModalCard>
                  ))}

                  {/* Network Settings Card */}
                  {availableHardware.network.length > 0 && (
                    <Card>
                      <Card.Header className="flex flex-row justify-between">
                        <p className="font-medium">Network Interface</p>
                        {selectedNetworkConfig && (
                          <Switch
                            isSelected={selectedNetworkConfig.active}
                            onChange={() => toggleHardwareActive(selectedNetworkName, 'network')}>
                            <Switch.Control>
                              <Switch.Thumb />
                            </Switch.Control>
                          </Switch>
                        )}
                      </Card.Header>
                      <Card.Content className="flex-col items-start relative gap-y-4">
                        <Select
                          onChange={value => {
                            if (value) setSelectedNetworkName(value);
                          }}
                          variant="secondary"
                          selectionMode="single"
                          value={selectedNetworkName}
                          placeholder="Select a network interface to configure"
                          fullWidth>
                          <Label>Display Style</Label>
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox items={availableHardware.network}>
                              {item => (
                                <ListBox.Item id={item.name} key={item.name}>
                                  <Label>{item.name}</Label>
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              )}
                            </ListBox>
                          </Select.Popover>
                        </Select>

                        {selectedNetworkConfig && selectedNetworkHardware && (
                          <div className="w-full relative">
                            {!selectedNetworkConfig.active && (
                              <div className="absolute inset-0 bg-background/50 z-20 -m-1 rounded-xl" />
                            )}
                            <div className="grid grid-cols-2 items-center">
                              {getMetricItem('uploadSpeed', 'network', selectedNetworkName)}
                              {getMetricItem('downloadSpeed', 'network', selectedNetworkName)}
                              {getMetricItem('uploadData', 'network', selectedNetworkName)}
                              {getMetricItem('downloadData', 'network', selectedNetworkName)}
                            </div>
                          </div>
                        )}
                      </Card.Content>
                    </Card>
                  )}

                  <Card>
                    <Card.Header className="font-medium">Uptime</Card.Header>
                    <Card.Content className="flex-row items-center">
                      {getMetricItem('uptimeSystem', 'uptime', 'system')}
                      <Separator className="h-2.5 w-px mx-1" />
                      {getMetricItem('uptimeApp', 'uptime', 'app')}
                    </Card.Content>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LynxScroll>
      </Modal.Body>

      <Modal.Footer className="px-4">
        <Button isPending={isSaving} onPress={saveSettings}>
          {isSaving ? <Spinner color="current" /> : <Diskette />}
          {!isSaving && 'Save Settings'}
        </Button>
      </Modal.Footer>
    </TabModal>
  );
}
