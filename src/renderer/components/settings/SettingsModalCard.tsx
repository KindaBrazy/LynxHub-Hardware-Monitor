import {Button, Card, CardBody, CardHeader, Chip, Divider, Input, Select, SelectItem, Switch} from '@heroui/react';
import {Plus, Trash2} from 'lucide-react';
import {memo, ReactNode, useState} from 'react';
import {useDispatch} from 'react-redux';

import {HardwareInfo, HardwareMetricsConfig, MetricType} from '../../../cross/types';
import {hmonitorActions} from '../../state/hmonitorSlice';

type AddMetricFormState = {
  sensorIdentifier: string;
  label: string;
};

type Props = {
  onToggle: () => void;
  config: HardwareMetricsConfig | undefined;
  hardware: HardwareInfo;
  type: MetricType;
  children: ReactNode;
};

function SettingsModalCard({onToggle, config, hardware, type, children}: Props) {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [formState, setFormState] = useState<AddMetricFormState>({sensorIdentifier: '', label: ''});

  if (!config) return null;
  const {name, active, custom = []} = config;

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

  return (
    <Card as="div" className="!shadow-sm p-2" fullWidth>
      <CardHeader onClick={onToggle} className="flex flex-row justify-between cursor-pointer">
        <p className="font-medium">{hardware.name}</p>
        <Switch isSelected={active} onValueChange={onToggle} />
      </CardHeader>
      <CardBody className="flex-col items-start relative">
        {/* Overlay to indicate that the controls are disabled */}
        {!active && <div className="absolute inset-0 bg-background/50 z-20 m-1 rounded-xl" />}

        <div className="flex flex-row items-center">{children}</div>

        {(custom.length > 0 || isAdding) && <Divider className="my-2" />}

        {/* Custom Metrics Section */}
        <div className="w-full flex flex-col gap-2">
          {custom.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {custom.map(metric => (
                <Chip
                  variant="flat"
                  key={metric.id}
                  endContent={<Trash2 className="size-3.5" />}
                  onClose={() => handleRemoveMetric(metric.id)}>
                  {metric.label}
                </Chip>
              ))}
            </div>
          )}

          {isAdding ? (
            <div className="flex items-end gap-2 p-2 rounded-lg bg-content2">
              <Select
                onChange={e =>
                  setFormState(prev => ({
                    ...prev,
                    sensorIdentifier: e.target.value,
                    label: e.target.value
                      ? (hardware.sensors.find(s => s.Identifier === e.target.value)?.Name ?? '')
                      : '',
                  }))
                }
                size="sm"
                label="Sensor"
                placeholder="Select a sensor"
                selectedKeys={formState.sensorIdentifier ? [formState.sensorIdentifier] : []}>
                {hardware.sensors.map(sensor => (
                  <SelectItem key={sensor.Identifier}>{`${sensor.Name} (${sensor.Type})`}</SelectItem>
                ))}
              </Select>
              <Input
                size="sm"
                label="Display Label"
                value={formState.label}
                onValueChange={label => setFormState(prev => ({...prev, label}))}
              />
              <Button size="sm" variant="flat" color="success" onPress={handleAddMetric} isIconOnly>
                <Plus className="size-4" />
              </Button>
              <Button size="sm" color="warning" variant="light" onPress={() => setIsAdding(false)} isIconOnly>
                &times;
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="bordered"
              onPress={() => setIsAdding(true)}
              startContent={<Plus className="size-4" />}>
              Add Custom Metric
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
export default memo(SettingsModalCard);
