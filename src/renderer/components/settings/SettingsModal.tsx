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
  ScrollShadow,
  Select,
  Spinner,
  Switch,
  UseOverlayStateReturn,
} from '@heroui/react';
import LynxSwitch from '@lynx/components/LynxSwitch';
import TabModal from '@lynx/components/TabModal';
import {topToast} from '@lynx/layouts/ToastProviders';
import {AppDispatch} from '@lynx/redux/store';
import storageIpc from '@lynx_shared/ipc/storage';
import {Diskette} from '@solar-icons/react-perf/BoldDuotone';
import {AnimatePresence, motion, Reorder} from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Cpu,
  Database,
  GripVertical,
  LucideProps,
  RotateCcw,
  Thermometer,
  Timer,
} from 'lucide-react';
import {ForwardRefExoticComponent, ReactNode, useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {HMONITOR_IPC_RESET_CONFIG, HMONITOR_STORAGE_ID} from '../../../cross/constants';
import {DisplayStyle, MetricType, MonitoringSettings, SystemMetric} from '../../../cross/types';
import {hmonitorActions, useHMonitorSelector} from '../../state/hmonitorSlice';
import MetricVisibilitySettings from './MetricVisibilitySettings';
import PingSettings from './PingSettings';
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

  const resetSettings = () => {
    setIsSaving(true);
    window.electron.ipcRenderer.send(HMONITOR_IPC_RESET_CONFIG);
    setTimeout(() => {
      setIsSaving(false);
      topToast.success('Settings reset successfully!');
    }, 1000);
  };

  const toggleHardwareActive = useCallback(
    (name: string | Key, type: MetricType) => {
      const hardwareConfig = enabledMetrics[type].find(metric => metric.name === name);
      if (hardwareConfig) {
        dispatch(hmonitorActions.updateHardwareActive({type, name: name as string, active: !hardwareConfig.active}));
      }
    },
    [enabledMetrics, dispatch],
  );

  const sectionsToRender = useMemo(() => {
    const defaultOrder = ['cpu', 'gpu', 'memory', 'network', 'uptime', 'ping'];
    const currentOrder =
      settings.sectionOrder && settings.sectionOrder.length > 0 ? settings.sectionOrder : defaultOrder;
    return currentOrder.filter(type => {
      if (type === 'cpu') return availableHardware.cpu.length > 0;
      if (type === 'gpu') return availableHardware.gpu.length > 0;
      if (type === 'memory') return availableHardware.memory.length > 0;
      if (type === 'network') return availableHardware.network.length > 0;
      return true;
    });
  }, [settings.sectionOrder, availableHardware]);

  const handleSectionReorder = (newOrder: string[]) => {
    const allTypes = ['cpu', 'gpu', 'memory', 'network', 'uptime', 'ping'];
    const missing = allTypes.filter(type => !newOrder.includes(type));
    dispatch(hmonitorActions.updateSectionOrder([...newOrder, ...missing]));
  };

  const renderMetricsReorderGroup = (type: MetricType, hardwareName: string | Key) => {
    const config = enabledMetrics[type].find(m => m.name === hardwareName);
    if (!config) return null;

    let nativeMetrics: SystemMetric[] = [];
    if (type === 'cpu') nativeMetrics = ['temp', 'usage'];
    else if (type === 'gpu') nativeMetrics = ['temp', 'usage', 'vram'];
    else if (type === 'memory') nativeMetrics = ['memory'];
    else if (type === 'network') nativeMetrics = ['uploadSpeed', 'downloadSpeed', 'uploadData', 'downloadData'];

    const customIds = config.custom.map(m => m.id);
    const allAvailableMetricIds = [...nativeMetrics, ...customIds];

    const currentEnabled = config.enabled;
    const orderedMetricIds = [
      ...currentEnabled.filter(id => allAvailableMetricIds.includes(id as any)),
      ...allAvailableMetricIds.filter(id => !currentEnabled.includes(id)),
    ];

    const handleReorder = (newOrder: string[]) => {
      const newEnabled = newOrder.filter(id => currentEnabled.includes(id));
      dispatch(hmonitorActions.updateHardwareMetrics({type, name: hardwareName as string, enabled: newEnabled}));
    };

    return (
      <div className="flex flex-col gap-y-2 w-full">
        <Reorder.Group
          axis="x"
          values={orderedMetricIds}
          onReorder={handleReorder}
          className="flex flex-row flex-wrap items-center gap-2 w-full">
          {orderedMetricIds.map(metricId => {
            const isCustom = !nativeMetrics.includes(metricId as any);
            const isSelected = currentEnabled.includes(metricId);

            const onToggle = () => {
              const newEnabled = isSelected
                ? currentEnabled.filter(id => id !== metricId)
                : [...currentEnabled, metricId];
              dispatch(
                hmonitorActions.updateHardwareMetrics({type, name: hardwareName as string, enabled: newEnabled}),
              );
            };

            let labelText: string;
            let IconComp: any;

            if (isCustom) {
              const customConfig = config.custom.find(c => c.id === metricId);
              labelText = customConfig?.label || 'Custom Metric';
              IconComp = Database;
            } else {
              const metConfig = METRIC_CONFIG[metricId];
              labelText = metConfig?.label || metricId;
              IconComp = metConfig?.Icon || Cpu;
            }

            return (
              <Reorder.Item
                className={
                  `flex flex-row items-center gap-x-1.5 px-3 py-1.5 bg-surface` +
                  ` rounded-xl border border-foreground/10 ${!isSelected ? 'opacity-50' : ''}`
                }
                key={metricId}
                value={metricId}>
                <GripVertical
                  className={
                    'size-3.5 cursor-grab text-foreground/40 hover:text-foreground/80 active:cursor-grabbing shrink-0'
                  }
                />
                <Checkbox variant="secondary" onChange={onToggle} isSelected={isSelected}>
                  <Checkbox.Content className="flex flex-row items-center gap-x-1">
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <IconComp className="size-3.5 shrink-0" />
                    {labelText}
                  </Checkbox.Content>
                </Checkbox>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    );
  };

  const renderUptimeMetricsReorderGroup = () => {
    const defaultUptimeOrder = ['uptimeSystem', 'uptimeApp'];
    const currentOrder = settings.uptimeOrder || defaultUptimeOrder;

    const handleReorder = (newOrder: string[]) => {
      dispatch(hmonitorActions.updateUptimeOrder(newOrder));
    };

    return (
      <Reorder.Group
        axis="x"
        values={currentOrder}
        onReorder={handleReorder}
        className="flex flex-row items-center gap-2 w-full">
        {currentOrder.map(metricId => {
          const isSelected = metricId === 'uptimeApp' ? enabledMetrics.uptime.app : enabledMetrics.uptime.system;
          const labelText = metricId === 'uptimeApp' ? 'Application Uptime' : 'System Uptime';
          const IconComp = metricId === 'uptimeApp' ? Timer : Clock;

          const onToggle = () => {
            if (metricId === 'uptimeApp') {
              dispatch(hmonitorActions.updateUptime({...enabledMetrics.uptime, app: !isSelected}));
            } else {
              dispatch(hmonitorActions.updateUptime({...enabledMetrics.uptime, system: !isSelected}));
            }
          };

          return (
            <Reorder.Item
              className={
                `flex flex-row items-center gap-x-1.5 px-3 py-1.5 bg-surface` +
                ` rounded-xl border border-foreground/10 ${!isSelected ? 'opacity-50' : ''}`
              }
              key={metricId}
              value={metricId}>
              <GripVertical
                className={
                  'size-3.5 cursor-grab text-foreground/40 hover:text-foreground/80 active:cursor-grabbing shrink-0'
                }
              />
              <Checkbox variant="secondary" onChange={onToggle} isSelected={isSelected}>
                <Checkbox.Content className="flex flex-row items-center gap-x-1">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <IconComp className="size-3.5 shrink-0" />
                  {labelText}
                </Checkbox.Content>
              </Checkbox>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    );
  };

  const renderSectionSetting = (type: string, dragHandle: ReactNode) => {
    switch (type) {
      case 'gpu':
        return (
          <div className="flex flex-col gap-y-2">
            {availableHardware.gpu.map(hw => (
              <SettingsModalCard
                headerExtra={active => (
                  <Checkbox
                    variant="secondary"
                    isDisabled={!active}
                    isSelected={settings.showAliasGpu}
                    onChange={val => updateState('showAliasGpu', val)}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Use Alias
                    </Checkbox.Content>
                  </Checkbox>
                )}
                type="gpu"
                hardware={hw}
                dragHandle={dragHandle}
                key={`gpu-settings-${hw.name}`}
                onToggle={() => toggleHardwareActive(hw.name, 'gpu')}
                config={enabledMetrics.gpu.find(m => m.name === hw.name)}>
                {renderMetricsReorderGroup('gpu', hw.name)}
              </SettingsModalCard>
            ))}
          </div>
        );
      case 'cpu':
        return (
          <div className="flex flex-col gap-y-2">
            {availableHardware.cpu.map(hw => (
              <SettingsModalCard
                headerExtra={active => (
                  <Checkbox
                    variant="secondary"
                    isDisabled={!active}
                    isSelected={settings.showAliasCpu}
                    onChange={val => updateState('showAliasCpu', val)}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Use Alias
                    </Checkbox.Content>
                  </Checkbox>
                )}
                type="cpu"
                hardware={hw}
                dragHandle={dragHandle}
                key={`cpu-settings-${hw.name}`}
                onToggle={() => toggleHardwareActive(hw.name, 'cpu')}
                config={enabledMetrics.cpu.find(m => m.name === hw.name)}>
                {renderMetricsReorderGroup('cpu', hw.name)}
              </SettingsModalCard>
            ))}
          </div>
        );
      case 'memory':
        return (
          <div className="flex flex-col gap-y-2">
            {availableHardware.memory.map(hw => (
              <SettingsModalCard
                headerExtra={active => (
                  <Checkbox
                    variant="secondary"
                    isDisabled={!active}
                    isSelected={settings.showAliasMemory}
                    onChange={val => updateState('showAliasMemory', val)}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Use Alias
                    </Checkbox.Content>
                  </Checkbox>
                )}
                type="memory"
                hardware={hw}
                dragHandle={dragHandle}
                key={`memory-settings-${hw.name}`}
                onToggle={() => toggleHardwareActive(hw.name, 'memory')}
                config={enabledMetrics.memory.find(m => m.name === hw.name)}>
                {renderMetricsReorderGroup('memory', hw.name)}
              </SettingsModalCard>
            ))}
          </div>
        );
      case 'network':
        return (
          availableHardware.network.length > 0 && (
            <Card>
              <Card.Header className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-x-2">
                  {dragHandle}
                  <p className="font-medium">Network Interface</p>
                </div>
                <div className="flex flex-row items-center gap-x-4">
                  {selectedNetworkConfig && (
                    <Checkbox
                      variant="secondary"
                      isSelected={settings.showAliasNetwork}
                      isDisabled={!selectedNetworkConfig.active}
                      onChange={val => updateState('showAliasNetwork', val)}>
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        Use Alias
                      </Checkbox.Content>
                    </Checkbox>
                  )}
                  {selectedNetworkConfig && (
                    <Switch
                      aria-label="Toggle network monitoring"
                      isSelected={selectedNetworkConfig.active}
                      onChange={() => toggleHardwareActive(selectedNetworkName, 'network')}>
                      <Switch.Content>
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                      </Switch.Content>
                    </Switch>
                  )}
                </div>
              </Card.Header>
              <Card.Content className="flex-col items-start relative gap-y-4">
                <div className="w-full flex items-center justify-between gap-4">
                  <Select
                    onChange={value => {
                      if (value) setSelectedNetworkName(value);
                    }}
                    variant="secondary"
                    selectionMode="single"
                    value={selectedNetworkName}
                    placeholder="Select a network interface to configure"
                    fullWidth>
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
                </div>

                {selectedNetworkConfig && selectedNetworkHardware && (
                  <div className="w-full relative">
                    {!selectedNetworkConfig.active && (
                      <div className="absolute inset-0 bg-background/50 z-20 -m-1 rounded-xl" />
                    )}
                    {renderMetricsReorderGroup('network', selectedNetworkName)}
                  </div>
                )}
              </Card.Content>
            </Card>
          )
        );
      case 'uptime':
        return (
          <Card>
            <Card.Header className="flex flex-row items-center gap-x-2">
              {dragHandle}
              <p className="font-medium">Uptime</p>
            </Card.Header>
            <Card.Content className="flex-row items-center gap-2">{renderUptimeMetricsReorderGroup()}</Card.Content>
          </Card>
        );
      case 'ping':
        return <PingSettings dragHandle={dragHandle} />;
      default:
        return null;
    }
  };

  return (
    <TabModal size="lg" isOpen={state.isOpen} onOpenChange={handleOpenChange} dialogClassName="max-w-4xl px-0">
      <Modal.CloseTrigger />
      <Modal.Header className="px-5">
        <Modal.Heading className="items-center justify-center">Hardware Monitor Settings</Modal.Heading>
      </Modal.Header>
      <Modal.Body className="overflow-hidden">
        <ScrollShadow className="px-4 size-full">
          <div
            onClick={() => updateState('enabled', !enabled)}
            className="mb-4 rounded-xl bg-surface-secondary p-4 cursor-pointer flex items-center justify-between">
            <div className="flex flex-col">
              <Label className="text-base pointer-events-none">Enable System Monitoring</Label>
              <Description className="pointer-events-none">
                When disabled, all metrics collection will be paused
              </Description>
            </div>
            <Switch
              size="lg"
              isSelected={enabled}
              aria-label="Toggle system monitoring"
              onChange={value => updateState('enabled', value)}>
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
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

                <Reorder.Group
                  axis="y"
                  values={sectionsToRender}
                  onReorder={handleSectionReorder}
                  className="flex flex-col gap-y-2 p-2 bg-surface-secondary rounded-3xl">
                  {sectionsToRender.map(type => {
                    const dragHandle = (
                      <div
                        className={
                          'cursor-grab active:cursor-grabbing p-1 text-foreground/40 hover:text-foreground/80' +
                          ' transition-colors shrink-0'
                        }>
                        <GripVertical className="size-4" />
                      </div>
                    );
                    return (
                      <Reorder.Item key={type} value={type} className="relative select-none">
                        {renderSectionSetting(type, dragHandle)}
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollShadow>
      </Modal.Body>

      <Modal.Footer className="px-4 justify-between w-full flex flex-row">
        <Button variant="danger-soft" isDisabled={isSaving} onPress={resetSettings}>
          <RotateCcw className="size-4" />
          Reset to Default
        </Button>
        <Button isPending={isSaving} onPress={saveSettings}>
          {isSaving ? <Spinner color="current" /> : <Diskette />}
          {!isSaving && 'Save Settings'}
        </Button>
      </Modal.Footer>
    </TabModal>
  );
}
