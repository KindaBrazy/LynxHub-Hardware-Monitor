import {Checkbox, Key, Label, ListBox, Select} from '@heroui/react';
import {CheckCircleIcon} from '@solar-icons/react/bold-duotone';
import {Reorder, useDragControls} from 'framer-motion';
import {isEqual} from 'lodash-es';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  Database,
  GripVertical,
  LucideProps,
  Thermometer,
  Timer,
} from 'lucide-react';
import {ForwardRefExoticComponent, memo, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import {HardwareMetricsConfig, MetricType, MonitoringSettings, SystemMetric} from '../../../cross/types';
import {hmonitorActions} from '../../state/hmonitorSlice';
import PingSettings from './PingSettings';
import SettingsCategoryCard from './SettingsCategoryCard';
import SettingsModalCard from './SettingsModalCard';

const METRIC_CONFIG: Record<string, {label: string; Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>}> = {
  temp: {label: 'Temperature', Icon: Thermometer},
  usage: {label: 'Usage', Icon: Activity},
  vram: {label: 'VRAM Usage', Icon: Database},
  memory: {label: 'Memory Usage', Icon: Database},
  uploadSpeed: {label: 'Upload Speed', Icon: ArrowUp},
  downloadSpeed: {label: 'Download Speed', Icon: ArrowDown},
  uploadData: {label: 'Data Uploaded', Icon: ArrowUp},
  downloadData: {label: 'Data Downloaded', Icon: ArrowDown},
  uptimeSystem: {label: 'System Uptime', Icon: Clock},
  uptimeApp: {label: 'App Uptime', Icon: Timer},
};

type MetricReorderItemProps = {
  metricId: string;
  isSelected: boolean;
  onToggle: () => void;
  onDragEnd?: () => void;
  labelText: string;
  IconComp: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>> | any;
};

const MetricReorderItem = memo(
  ({metricId, isSelected, onToggle, onDragEnd, labelText, IconComp}: MetricReorderItemProps) => {
    const dragControls = useDragControls();

    return (
      <Reorder.Item
        whileDrag={{
          zIndex: 50,
          scale: 1.03,
          boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.3)',
        }}
        className={
          'flex flex-row items-center gap-x-1.5 px-2 py-1.5 shrink-0 ' +
          ' rounded-xl border select-none transition-colors duration-150 ' +
          (isSelected
            ? 'border-accent/30 bg-accent/10 shadow-2xs text-foreground font-medium'
            : 'border-border opacity-60 text-muted bg-surface-secondary')
        }
        dragElastic={0}
        value={metricId}
        dragListener={false}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        dragControls={dragControls}>
        <div
          onPointerDown={e => {
            e.stopPropagation();
            dragControls.start(e);
          }}
          title="Drag to reorder metric"
          className="cursor-grab active:cursor-grabbing p-0.5 -m-0.5 flex items-center justify-center shrink-0">
          <GripVertical className="size-3.5 text-muted hover:text-foreground active:cursor-grabbing shrink-0" />
        </div>
        <Checkbox onChange={onToggle} isSelected={isSelected}>
          <Checkbox.Content className="flex flex-row items-center gap-x-1.5 text-xs">
            <Checkbox.Control className="size-4 rounded-md">
              <Checkbox.Indicator />
            </Checkbox.Control>
            <IconComp className={`size-3.5 shrink-0 ${isSelected ? 'text-accent' : 'text-muted'}`} />
            <span className="whitespace-nowrap">{labelText}</span>
          </Checkbox.Content>
        </Checkbox>
      </Reorder.Item>
    );
  },
);

MetricReorderItem.displayName = 'MetricReorderItem';

type HardwareMetricsReorderGroupProps = {
  type: MetricType;
  hardwareName: string | Key;
  config: HardwareMetricsConfig | undefined;
};

const HardwareMetricsReorderGroup = memo(({type, hardwareName, config}: HardwareMetricsReorderGroupProps) => {
  const dispatch = useDispatch();

  const nativeMetrics: SystemMetric[] = useMemo(() => {
    if (type === 'cpu') return ['temp', 'usage'];
    if (type === 'gpu') return ['temp', 'usage', 'vram'];
    if (type === 'memory') return ['memory'];
    if (type === 'network') return ['uploadSpeed', 'downloadSpeed', 'uploadData', 'downloadData'];
    return [];
  }, [type]);

  const customIds = useMemo(() => config?.custom?.map(m => m.id) ?? [], [config?.custom]);
  const allAvailableMetricIds = useMemo(() => [...nativeMetrics, ...customIds], [nativeMetrics, customIds]);

  const initialOrderedIds = useMemo(() => {
    const currentEnabled = config?.enabled ?? [];
    return [
      ...currentEnabled.filter(id => allAvailableMetricIds.includes(id as any)),
      ...allAvailableMetricIds.filter(id => !currentEnabled.includes(id)),
    ];
  }, [config?.enabled, allAvailableMetricIds]);

  const [items, setItems] = useState<string[]>(initialOrderedIds);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!isDraggingRef.current) {
      setItems(initialOrderedIds);
    }
  }, [initialOrderedIds]);

  if (!config) return null;

  const handleReorder = (newOrder: string[]) => {
    isDraggingRef.current = true;
    setItems(newOrder);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);

    const newEnabled = items.filter(id => config.enabled.includes(id));
    if (!isEqual(newEnabled, config.enabled)) {
      dispatch(hmonitorActions.updateHardwareMetrics({type, name: hardwareName as string, enabled: newEnabled}));
    }
  };

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <Reorder.Group
        axis="x"
        values={items}
        onReorder={handleReorder}
        className="flex flex-row items-center gap-2 w-full overflow-x-auto scrollbar-hide py-1">
        {items.map(metricId => {
          const isCustom = !nativeMetrics.includes(metricId as any);
          const isSelected = config.enabled.includes(metricId);

          const onToggle = () => {
            let newEnabled: string[];
            if (isSelected) {
              newEnabled = config.enabled.filter(id => id !== metricId);
            } else {
              newEnabled = items.filter(id => id === metricId || config.enabled.includes(id));
            }
            dispatch(hmonitorActions.updateHardwareMetrics({type, name: hardwareName as string, enabled: newEnabled}));
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
            <MetricReorderItem
              key={metricId}
              metricId={metricId}
              onToggle={onToggle}
              IconComp={IconComp}
              labelText={labelText}
              isSelected={isSelected}
              onDragEnd={handleDragEnd}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
});

HardwareMetricsReorderGroup.displayName = 'HardwareMetricsReorderGroup';

type UptimeMetricsReorderGroupProps = {
  uptimeOrder?: string[];
  uptimeEnabled: {system: boolean; app: boolean};
};

const UptimeMetricsReorderGroup = memo(({uptimeOrder, uptimeEnabled}: UptimeMetricsReorderGroupProps) => {
  const dispatch = useDispatch();
  const defaultUptimeOrder = useMemo(() => ['uptimeSystem', 'uptimeApp'], []);
  const currentOrder = useMemo(() => uptimeOrder || defaultUptimeOrder, [uptimeOrder, defaultUptimeOrder]);

  const [items, setItems] = useState<string[]>(currentOrder);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!isDraggingRef.current) {
      setItems(currentOrder);
    }
  }, [currentOrder]);

  const handleReorder = (newOrder: string[]) => {
    isDraggingRef.current = true;
    setItems(newOrder);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);

    if (!isEqual(items, currentOrder)) {
      dispatch(hmonitorActions.updateUptimeOrder(items));
    }
  };

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={handleReorder}
      className="flex flex-row items-center gap-2 w-full overflow-x-auto scrollbar-hide py-1">
      {items.map(metricId => {
        const isSelected = metricId === 'uptimeApp' ? uptimeEnabled.app : uptimeEnabled.system;
        const labelText = metricId === 'uptimeApp' ? 'Application Uptime' : 'System Uptime';
        const IconComp = metricId === 'uptimeApp' ? Timer : Clock;

        const onToggle = () => {
          if (metricId === 'uptimeApp') {
            dispatch(hmonitorActions.updateUptime({...uptimeEnabled, app: !isSelected}));
          } else {
            dispatch(hmonitorActions.updateUptime({...uptimeEnabled, system: !isSelected}));
          }
        };

        return (
          <MetricReorderItem
            key={metricId}
            metricId={metricId}
            onToggle={onToggle}
            IconComp={IconComp}
            labelText={labelText}
            isSelected={isSelected}
            onDragEnd={handleDragEnd}
          />
        );
      })}
    </Reorder.Group>
  );
});

UptimeMetricsReorderGroup.displayName = 'UptimeMetricsReorderGroup';

type SectionReorderItemProps = {
  type: string;
  index: number;
  totalSections: number;
  moveSection: (index: number, direction: 'up' | 'down') => void;
  children: (dragHandle: ReactNode) => ReactNode;
};

const SectionReorderItem = memo(({type, index, totalSections, moveSection, children}: SectionReorderItemProps) => {
  const dragControls = useDragControls();

  const dragHandle = (
    <div className="flex items-center gap-0.5 shrink-0">
      <div
        onPointerDown={e => {
          e.stopPropagation();
          dragControls.start(e);
        }}
        className={
          'cursor-grab active:cursor-grabbing p-1.5 rounded-md text-muted' +
          ' hover:text-foreground hover:bg-surface-secondary transition-colors'
        }
        title="Drag to reorder section">
        <GripVertical className="size-4" />
      </div>
      <div className="flex flex-col -space-y-1">
        <button
          className={
            'p-0.5 text-muted hover:text-foreground disabled:opacity-20' +
            ' disabled:pointer-events-none cursor-pointer'
          }
          type="button"
          disabled={index === 0}
          title="Move section up"
          onClick={() => moveSection(index, 'up')}>
          <ChevronUp className="size-3" />
        </button>
        <button
          className={
            'p-0.5 text-muted hover:text-foreground disabled:opacity-20' +
            ' disabled:pointer-events-none cursor-pointer'
          }
          type="button"
          title="Move section down"
          disabled={index === totalSections - 1}
          onClick={() => moveSection(index, 'down')}>
          <ChevronDown className="size-3" />
        </button>
      </div>
    </div>
  );

  return (
    <Reorder.Item
      whileDrag={{
        zIndex: 40,
        scale: 1.01,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.35)',
      }}
      value={type}
      dragElastic={0}
      dragListener={false}
      dragMomentum={false}
      dragControls={dragControls}
      className="relative select-none">
      {children(dragHandle)}
    </Reorder.Item>
  );
});

SectionReorderItem.displayName = 'SectionReorderItem';

type MetricsTabProps = {
  settings: MonitoringSettings;
  updateState: <K extends keyof MonitoringSettings>(key: K, value: MonitoringSettings[K]) => void;
  toggleHardwareActive: (name: string | Key, type: MetricType) => void;
  handleSectionReorder: (newOrder: string[]) => void;
  selectedNetworkName: Key;
  setSelectedNetworkName: (name: Key) => void;
};

export const MetricsTab = memo(
  ({
    settings,
    updateState,
    toggleHardwareActive,
    handleSectionReorder,
    selectedNetworkName,
    setSelectedNetworkName,
  }: MetricsTabProps) => {
    const {enabledMetrics, availableHardware} = settings;

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

    const moveSection = (index: number, direction: 'up' | 'down') => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sectionsToRender.length) return;
      const newOrder = [...sectionsToRender];
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      handleSectionReorder(newOrder);
    };

    const selectedNetworkConfig = useMemo(
      () => enabledMetrics.network.find(n => n.name === selectedNetworkName),
      [selectedNetworkName, enabledMetrics.network],
    );
    const selectedNetworkHardware = useMemo(
      () => availableHardware.network.find(n => n.name === selectedNetworkName),
      [selectedNetworkName, availableHardware.network],
    );

    const renderSectionSetting = (type: string, dragHandle: ReactNode) => {
      switch (type) {
        case 'gpu':
          return (
            <div className="flex flex-col gap-y-4">
              {availableHardware.gpu.map(hw => (
                <SettingsModalCard
                  headerExtra={active => (
                    <Checkbox
                      variant="secondary"
                      isDisabled={!active}
                      isSelected={settings.showAliasGpu}
                      onChange={val => updateState('showAliasGpu', val)}>
                      <Checkbox.Content className="text-xs">
                        <Checkbox.Control className="size-4 rounded-md">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        Friendly Alias
                      </Checkbox.Content>
                    </Checkbox>
                  )}
                  type="gpu"
                  hardware={hw}
                  dragHandle={dragHandle}
                  key={`gpu-settings-${hw.name}`}
                  onToggle={() => toggleHardwareActive(hw.name, 'gpu')}
                  config={enabledMetrics.gpu.find(m => m.name === hw.name)}>
                  <HardwareMetricsReorderGroup
                    type="gpu"
                    hardwareName={hw.name}
                    config={enabledMetrics.gpu.find(m => m.name === hw.name)}
                  />
                </SettingsModalCard>
              ))}
            </div>
          );

        case 'cpu':
          return (
            <div className="flex flex-col gap-y-4">
              {availableHardware.cpu.map(hw => (
                <SettingsModalCard
                  headerExtra={active => (
                    <Checkbox
                      variant="secondary"
                      isDisabled={!active}
                      isSelected={settings.showAliasCpu}
                      onChange={val => updateState('showAliasCpu', val)}>
                      <Checkbox.Content className="text-xs">
                        <Checkbox.Control className="size-4 rounded-md">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        Friendly Alias
                      </Checkbox.Content>
                    </Checkbox>
                  )}
                  type="cpu"
                  hardware={hw}
                  dragHandle={dragHandle}
                  key={`cpu-settings-${hw.name}`}
                  onToggle={() => toggleHardwareActive(hw.name, 'cpu')}
                  config={enabledMetrics.cpu.find(m => m.name === hw.name)}>
                  <HardwareMetricsReorderGroup
                    type="cpu"
                    hardwareName={hw.name}
                    config={enabledMetrics.cpu.find(m => m.name === hw.name)}
                  />
                </SettingsModalCard>
              ))}
            </div>
          );

        case 'memory':
          return (
            <div className="flex flex-col gap-y-4">
              {availableHardware.memory.map(hw => (
                <SettingsModalCard
                  headerExtra={active => (
                    <Checkbox
                      variant="secondary"
                      isDisabled={!active}
                      isSelected={settings.showAliasMemory}
                      onChange={val => updateState('showAliasMemory', val)}>
                      <Checkbox.Content className="text-xs">
                        <Checkbox.Control className="size-4 rounded-md">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        Friendly Alias
                      </Checkbox.Content>
                    </Checkbox>
                  )}
                  type="memory"
                  hardware={hw}
                  dragHandle={dragHandle}
                  key={`memory-settings-${hw.name}`}
                  onToggle={() => toggleHardwareActive(hw.name, 'memory')}
                  config={enabledMetrics.memory.find(m => m.name === hw.name)}>
                  <HardwareMetricsReorderGroup
                    type="memory"
                    hardwareName={hw.name}
                    config={enabledMetrics.memory.find(m => m.name === hw.name)}
                  />
                </SettingsModalCard>
              ))}
            </div>
          );

        case 'network':
          return (
            availableHardware.network.length > 0 && (
              <SettingsCategoryCard
                onToggle={
                  selectedNetworkConfig ? () => toggleHardwareActive(selectedNetworkName, 'network') : undefined
                }
                headerExtra={
                  selectedNetworkConfig && (
                    <Checkbox
                      variant="secondary"
                      isSelected={settings.showAliasNetwork}
                      isDisabled={!selectedNetworkConfig.active}
                      onChange={val => updateState('showAliasNetwork', val)}>
                      <Checkbox.Content className="text-xs">
                        <Checkbox.Control className="size-4 rounded-md">
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        Friendly Alias
                      </Checkbox.Content>
                    </Checkbox>
                  )
                }
                category="network"
                dragHandle={dragHandle}
                title="Network Interface"
                isActive={selectedNetworkConfig?.active}
                toggleAriaLabel="Toggle network monitoring">
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
                    <Select.Trigger className="text-xs h-9">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox items={availableHardware.network}>
                        {item => (
                          <ListBox.Item id={item.name} key={item.name}>
                            <Label className="text-xs">{item.name}</Label>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        )}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {selectedNetworkConfig && selectedNetworkHardware && (
                  <div className="w-full relative flex flex-col gap-y-1.5 pt-2 border-t border-surface-tertiary/40">
                    {!selectedNetworkConfig.active && (
                      <div
                        className={
                          'absolute inset-0 bg-surface/75 backdrop-blur-[1px] z-20' +
                          ' flex items-center justify-center rounded-xl'
                        }>
                        <p
                          className={
                            'text-xs text-muted font-medium bg-surface-secondary' +
                            ' px-3 py-1.5 rounded-full border border-border'
                          }>
                          Selected network interface is disabled. Toggle above to activate.
                        </p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground/80">Interface Metrics</span>
                      <span className="text-[11px] text-muted">Drag to reorder • Check to toggle</span>
                    </div>
                    <HardwareMetricsReorderGroup
                      type="network"
                      config={selectedNetworkConfig}
                      hardwareName={selectedNetworkName}
                    />
                  </div>
                )}
              </SettingsCategoryCard>
            )
          );

        case 'uptime':
          return (
            <SettingsCategoryCard category="uptime" dragHandle={dragHandle} title="System & Application Uptime">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground/80">Uptime Indicators</span>
                <span className="text-[11px] text-muted">Drag to reorder</span>
              </div>
              <UptimeMetricsReorderGroup uptimeOrder={settings.uptimeOrder} uptimeEnabled={enabledMetrics.uptime} />
            </SettingsCategoryCard>
          );

        case 'ping':
          return <PingSettings dragHandle={dragHandle} />;

        default:
          return null;
      }
    };

    return (
      <div className="flex flex-col gap-y-5 pb-4">
        {/* Hardware Discovery Overview Banner */}
        <div className={'p-4 bg-surface-secondary rounded-3xl flex items-center justify-between flex-wrap gap-3'}>
          <div className="flex items-center gap-x-2.5">
            <CheckCircleIcon className="size-5 text-accent" />
            <div>
              <span className="text-sm font-semibold text-foreground">Detected Hardware & Sensor Modules</span>
              <p className="text-xs text-muted">
                Reorder status bar sections by dragging handles or clicking arrows. Toggle individual sensors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className={'px-2.5 py-1 rounded-full bg-surface font-medium text-foreground'}>
              CPU: {availableHardware.cpu.length}
            </span>
            <span className={'px-2.5 py-1 rounded-full bg-surface font-medium text-foreground'}>
              GPU: {availableHardware.gpu.length}
            </span>
            <span className={'px-2.5 py-1 rounded-full bg-surface font-medium text-foreground'}>
              RAM: {availableHardware.memory.length}
            </span>
            <span className={'px-2.5 py-1 rounded-full bg-surface font-medium text-foreground'}>
              NIC: {availableHardware.network.length}
            </span>
          </div>
        </div>

        {/* Reorderable Section List */}
        <Reorder.Group
          axis="y"
          values={sectionsToRender}
          onReorder={handleSectionReorder}
          className="flex flex-col gap-y-4">
          {sectionsToRender.map((type, index) => (
            <SectionReorderItem
              key={type}
              type={type}
              index={index}
              moveSection={moveSection}
              totalSections={sectionsToRender.length}>
              {dragHandle => renderSectionSetting(type, dragHandle)}
            </SectionReorderItem>
          ))}
        </Reorder.Group>
      </div>
    );
  },
);

MetricsTab.displayName = 'MetricsTab';
export default MetricsTab;
