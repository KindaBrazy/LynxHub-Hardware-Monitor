import {Button, Card, Chip, Input, ListBox, Select, Separator, Switch} from '@heroui/react';
import {Plus, X} from 'lucide-react';
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

  // Do not render if there are no custom sensors to add
  if (hardware.sensors.length === 0 && custom.length === 0) {
    return null;
  }

  return (
    <>
      {(custom.length > 0 || isAdding) && <Separator className="my-2" />}
      <div className="w-full flex flex-col gap-2">
        {custom.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {custom.map(metric => (
              <Chip size="lg" variant="soft" color="accent" key={metric.id} className="px-2">
                {metric.label}
                <Button
                  size="sm"
                  className="size-4.5"
                  variant="danger-soft"
                  onPress={() => handleRemoveMetric(metric.id)}
                  isIconOnly>
                  <X className="size-3" />
                </Button>
              </Chip>
            ))}
          </div>
        )}

        {isAdding ? (
          <div className="flex items-center gap-2 p-2">
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
              variant="secondary"
              placeholder="Select a sensor"
              value={formState.sensorIdentifier}
              fullWidth>
              <Select.Trigger>
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
                      {`${sensor.Name} (${sensor.Type})`}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  )}
                </ListBox>
              </Select.Popover>
            </Select>
            <Input
              variant="secondary"
              value={formState.label}
              placeholder="Display Label"
              onChange={e => setFormState(prev => ({...prev, label: e.target.value}))}
            />
            <Button size="sm" variant="secondary" className="shrink-0" onPress={handleAddMetric} isIconOnly>
              <Plus />
            </Button>
            <Button size="sm" variant="tertiary" className="shrink-0" onPress={() => setIsAdding(false)} isIconOnly>
              <X />
            </Button>
          </div>
        ) : (
          <Button className="mt-2" variant="tertiary" onPress={() => setIsAdding(true)} fullWidth>
            <Plus className="size-3" />
            Add Custom Metric
          </Button>
        )}
      </div>
    </>
  );
}

type Props = {
  onToggle: () => void;
  config: HardwareMetricsConfig | undefined;
  hardware: HardwareInfo;
  type: MetricType;
  children: ReactNode;
};

const SettingsModalCard = memo(({onToggle, config, hardware, type, children}: Props) => {
  if (!config) return null;
  const {active} = config;

  return (
    <Card>
      <Card.Header onClick={onToggle} className="flex flex-row justify-between cursor-pointer">
        <p className="font-medium">{hardware.name}</p>
        <Switch isSelected={active} onChange={onToggle}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </Card.Header>
      <Card.Content className="flex-col items-start gap-y-1">
        {/* Overlay to indicate that the controls are disabled */}
        {!active && <div className="absolute inset-1.5 top-10.5 bg-surface-secondary/50 z-20 rounded-3xl" />}

        <div className="flex flex-row items-center gap-x-2">{children}</div>
        <CustomMetricsSection type={type} config={config} hardware={hardware} />
      </Card.Content>
    </Card>
  );
});

export default SettingsModalCard;
