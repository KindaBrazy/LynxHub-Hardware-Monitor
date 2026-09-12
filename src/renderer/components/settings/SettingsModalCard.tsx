import {Button, Card, Chip, Input, ListBox, Select, Switch} from '@heroui/react';
import {CpuBoltIcon} from '@solar-icons/react/bold-duotone';
import {AnimatePresence, motion} from 'framer-motion';
import {Activity, Database, HardDrive, Plus, X} from 'lucide-react';
import {memo, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';

import {HardwareInfo, HardwareMetricsConfig, MetricType} from '../../../cross/types';
import {hmonitorActions} from '../../state/hmonitorSlice';

type AddMetricFormState = {
  sensorIdentifier: string;
  label: string;
};

type CustomMetricsProps = {
  config: HardwareMetricsConfig;
  hardware: HardwareInfo;
  type: MetricType;
};

const CATEGORY_META: Record<string, {badge: string; badgeClass: string; iconBgClass: string}> = {
  cpu: {
    badge: 'CPU',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    iconBgClass: 'bg-cyan-500/15 text-cyan-400',
  },
  gpu: {
    badge: 'GPU',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    iconBgClass: 'bg-purple-500/15 text-purple-400',
  },
  memory: {
    badge: 'RAM',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    iconBgClass: 'bg-emerald-500/15 text-emerald-400',
  },
  network: {
    badge: 'NET',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    iconBgClass: 'bg-amber-500/15 text-amber-400',
  },
};

/**
 * A reusable component for managing custom metrics for a piece of hardware.
 */
export function CustomMetricsSection({config, hardware, type}: CustomMetricsProps) {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [formState, setFormState] = useState<AddMetricFormState>({sensorIdentifier: '', label: ''});

  const {name, custom = []} = config;

  const handleAddMetric = () => {
    if (!formState.sensorIdentifier || !formState.label) return;
    const newMetric = {
      id: crypto.randomUUID(),
      label: formState.label,
      sensorIdentifier: formState.sensorIdentifier,
    };
    dispatch(hmonitorActions.addCustomMetric({type, name, metric: newMetric}));
    setFormState({sensorIdentifier: '', label: ''});
    setIsAdding(false);
  };

  const handleRemoveMetric = (metricId: string) => {
    dispatch(hmonitorActions.removeCustomMetric({type, name, metricId}));
  };

  if (hardware.sensors.length === 0 && custom.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-2 pt-2.5 border-t border-surface-tertiary/40">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground/80">Custom Sensors ({custom.length})</span>
        {!isAdding && hardware.sensors.length > 0 && (
          <Button size="sm" variant="secondary" className="text-xs h-6 px-2.5" onPress={() => setIsAdding(true)}>
            <Plus className="size-3" />
            Add Custom Sensor
          </Button>
        )}
      </div>

      {custom.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {custom.map(metric => (
              <motion.div
                key={metric.id}
                exit={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                initial={{opacity: 0, scale: 0.9}}
                layout>
                <Chip
                  variant="soft"
                  color="accent"
                  className="flex items-center text-xs font-medium bg-accent/15 border border-accent/30 text-accent">
                  <span>{metric.label}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => handleRemoveMetric(metric.id)}
                    className="size-4 min-w-0 p-0 rounded-full hover:bg-danger-soft hover:text-danger ml-1"
                    isIconOnly>
                    <X className="size-3" />
                  </Button>
                </Chip>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {isAdding && (
        <div
          className={
            'flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3' +
            ' bg-surface rounded-xl border border-surface-tertiary shadow-xs'
          }>
          <Select
            onChange={key => {
              if (!key) return;
              const value = key as string;
              setFormState(prev => ({
                ...prev,
                sensorIdentifier: value,
                label: value ? (hardware.sensors.find(s => s.Identifier === value)?.Name ?? '') : '',
              }));
            }}
            className="flex-1"
            variant="secondary"
            value={formState.sensorIdentifier}
            placeholder="Select available sensor">
            <Select.Trigger className="text-xs">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox items={hardware.sensors}>
                {sensor => (
                  <ListBox.Item
                    id={sensor.Identifier}
                    key={sensor.Identifier}
                    textValue={`${sensor.Name} (${sensor.Type})`}>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-foreground">{sensor.Name}</span>
                      <span className="text-[10px] text-muted">{sensor.Type}</span>
                    </div>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                )}
              </ListBox>
            </Select.Popover>
          </Select>

          <Input
            variant="secondary"
            value={formState.label}
            placeholder="Display label"
            className="text-xs sm:w-44"
            onChange={e => setFormState(prev => ({...prev, label: e.target.value}))}
          />

          <div className="flex items-center gap-1.5 shrink-0 justify-end">
            <Button
              size="sm"
              variant="primary"
              className="text-xs"
              onPress={handleAddMetric}
              isDisabled={!formState.sensorIdentifier || !formState.label}>
              <Plus className="size-3.5" />
              Add
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="shrink-0 text-xs"
              onPress={() => setIsAdding(false)}
              isIconOnly>
              <X className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type Props = {
  onToggle: () => void;
  config: HardwareMetricsConfig | undefined;
  hardware: HardwareInfo;
  type: MetricType;
  children: ReactNode;
  dragHandle?: ReactNode;
  headerExtra?: (active: boolean) => ReactNode;
};

const SettingsModalCard = memo(({onToggle, config, hardware, type, children, dragHandle, headerExtra}: Props) => {
  if (!config) return null;
  const {active} = config;
  const meta = CATEGORY_META[type] || {
    badge: type.toUpperCase(),
    badgeClass: 'bg-accent/15 text-accent border-accent/30',
    iconBgClass: 'bg-accent/15 text-accent',
  };

  return (
    <Card className="rounded-3xl bg-surface-secondary/70 border border-border overflow-hidden shadow-xs">
      <Card.Header
        className={
          'flex flex-row justify-between items-center bg-surface/80 rounded-3xl' +
          ' py-3 px-4 border-b border-surface-tertiary/60'
        }>
        <div className="flex flex-row items-center gap-x-3">
          {dragHandle}
          <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${meta.iconBgClass}`}>
            {type === 'cpu' && <CpuBoltIcon className="size-4.5" />}
            {type === 'gpu' && <Activity className="size-4.5" />}
            {type === 'memory' && <Database className="size-4.5" />}
            {type === 'network' && <HardDrive className="size-4.5" />}
          </div>
          <div className="flex items-center gap-x-2">
            <span
              className={
                'px-1.5 py-0.5 rounded-md text-[10px] font-bold ' + `tracking-wide uppercase border ${meta.badgeClass}`
              }>
              {meta.badge}
            </span>
            <span className="font-semibold text-foreground text-sm hover:text-foreground/90 transition-colors">
              {hardware.name}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-3">
          {headerExtra?.(active)}
          <Switch isSelected={active} onChange={onToggle} aria-label={`Toggle active state for ${hardware.name}`}>
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        </div>
      </Card.Header>

      <Card.Content className="flex flex-col gap-y-3 p-3.5 relative bg-surface/80 rounded-3xl">
        {/* Overlay when component is disabled */}
        {!active && (
          <div
            className={
              'absolute inset-0 bg-surface/75 backdrop-blur-[1px] z-20' +
              ' flex items-center justify-center rounded-b-xl'
            }>
            <p
              className={
                'text-xs text-muted font-medium bg-surface-secondary px-3' +
                ' py-1.5 rounded-lg border border-surface-tertiary shadow-xs'
              }>
              This hardware component is currently disabled. Toggle the switch to activate.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-y-1.5 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/80">Available Metrics</span>
            <span className="text-[11px] text-muted">Drag to reorder • Check to toggle</span>
          </div>
          <div className="flex flex-row items-center gap-x-2 w-full">{children}</div>
        </div>

        <CustomMetricsSection type={type} config={config} hardware={hardware} />
      </Card.Content>
    </Card>
  );
});

SettingsModalCard.displayName = 'SettingsModalCard';
export default SettingsModalCard;
