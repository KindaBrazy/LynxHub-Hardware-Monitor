import {
  Button,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Switch,
} from '@heroui/react';
import {Clock, Cpu, Database, Layers, LucideProps, Thermometer, Timer} from 'lucide-react';
import {ForwardRefExoticComponent, RefAttributes, useState} from 'react';
import {useDispatch} from 'react-redux';

import LynxScroll from '../../../../src/renderer/src/App/Components/Reusable/LynxScroll';
import {AppDispatch} from '../../../../src/renderer/src/App/Redux/Store';
import {Clock_Icon} from '../../../../src/renderer/src/assets/icons/SvgIcons/SvgIcons';
import {systemMonitorActions} from '../reducer';
import {Settings_Icon} from '../SvgIcons';

// Define types
export type SystemMetrics =
  | 'cpuTemp'
  | 'cpuUsage'
  | 'gpuTemp'
  | 'gpuUsage'
  | 'memory'
  | 'uptimeSystemSeconds'
  | 'uptimeSeconds';

interface MetricConfig {
  id: SystemMetrics;
  label: string;
  description: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

type Props = {isOpen: boolean; show: string; tabID: string};

export default function SettingsModal({show, isOpen, tabID}: Props) {
  // Metrics configuration
  const metrics: MetricConfig[] = [
    {
      id: 'cpuTemp',
      label: 'CPU Temperature',
      description: 'Monitor CPU temperature in real-time',
      Icon: Thermometer,
    },
    {id: 'cpuUsage', label: 'CPU Usage', description: 'Track CPU utilization percentage', Icon: Cpu},
    {
      id: 'gpuTemp',
      label: 'GPU Temperature',
      description: 'Monitor GPU temperature in real-time',
      Icon: Thermometer,
    },
    {id: 'gpuUsage', label: 'GPU Usage', description: 'Track GPU utilization percentage', Icon: Layers},
    {id: 'memory', label: 'Memory Usage', description: 'Monitor RAM usage and availability', Icon: Database},
    {id: 'uptimeSystemSeconds', label: 'System Uptime', description: 'Track total system uptime', Icon: Clock},
    {id: 'uptimeSeconds', label: 'Application Uptime', description: 'Track application runtime', Icon: Timer},
  ];

  // State for settings
  const [enabledMetrics, setEnabledMetrics] = useState<Set<SystemMetrics>>(new Set(['cpuUsage', 'memory', 'gpuUsage']));
  const [appEnabled, setAppEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(1);
  const [compactMode, setCompactMode] = useState(false);
  const [showSectionLabels, setShowSectionLabels] = useState(true);

  // Toggle individual metric
  const toggleMetric = (metric: SystemMetrics) => {
    const newEnabledMetrics = new Set(enabledMetrics);
    if (newEnabledMetrics.has(metric)) {
      newEnabledMetrics.delete(metric);
    } else {
      newEnabledMetrics.add(metric);
    }
    setEnabledMetrics(newEnabledMetrics);
  };

  // Save settings
  const saveSettings = () => {
    // Here you would typically save settings to localStorage or send to a backend
    console.log({
      appEnabled,
      enabledMetrics: Array.from(enabledMetrics),
      refreshInterval,
      compactMode,
      showSectionLabels,
    });
  };

  const dispatch = useDispatch<AppDispatch>();
  const onOpenChange = (value: boolean) => {
    if (!value) {
      dispatch(systemMonitorActions.closeModal({tabID: tabID}));
      setTimeout(() => {
        dispatch(systemMonitorActions.removeModal({tabID: tabID}));
      }, 500);
    }
  };

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      isDismissable={false}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      classNames={{backdrop: `!top-10 ${show}`, wrapper: `!top-10 pb-8 ${show}`}}
      hideCloseButton>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2 justify-center">
                <Settings_Icon className="size-6" />
                <span>Hardware Monitor Settings</span>
              </div>
            </ModalHeader>

            <ModalBody as={LynxScroll}>
              {/* Main app toggle */}
              <div className="mb-4 rounded-lg bg-content2 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Enable System Monitoring</h3>
                    <p className="text-sm text-default-500">When disabled, all metrics collection will be paused</p>
                  </div>
                  <Switch size="lg" color="primary" isSelected={appEnabled} onValueChange={setAppEnabled} />
                </div>
              </div>

              {appEnabled && (
                <>
                  <Divider className="my-4" />

                  {/* Refresh interval */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-medium font-medium">Refresh Interval</h3>
                    <NumberInput
                      step={0.5}
                      maxValue={60}
                      minValue={0.5}
                      className="max-w-xs"
                      value={refreshInterval}
                      label="Seconds between updates"
                      onValueChange={setRefreshInterval}
                      startContent={<Clock_Icon className="size-6" />}
                      description="How frequently metrics should update (0.5-60 seconds)"
                    />
                  </div>

                  {/* Display options */}
                  <div className="mb-6 space-y-4">
                    <h3 className="text-medium font-medium">Display Options</h3>

                    <div
                      onClick={() => {
                        setCompactMode(prevState => !prevState);
                      }}
                      className={
                        'flex items-center justify-between rounded-lg px-2 ' +
                        'py-2 hover:bg-content2 transition-all duration-300 cursor-pointer'
                      }>
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-sm text-default-500">Use condensed layout to save space</p>
                      </div>
                      <Switch size="md" isSelected={compactMode} onValueChange={setCompactMode} />
                    </div>

                    <div
                      onClick={() => {
                        setShowSectionLabels(prevState => !prevState);
                      }}
                      className={
                        'flex items-center justify-between rounded-lg px-2 py-2 ' +
                        'hover:bg-content2 transition-all duration-300 cursor-pointer'
                      }>
                      <div>
                        <p className="font-medium">Show Section Labels</p>
                        <p className="text-sm text-default-500">Display headers for metric groups</p>
                      </div>
                      <Switch size="md" isSelected={showSectionLabels} onValueChange={setShowSectionLabels} />
                    </div>
                  </div>

                  <Divider className="my-4" />

                  {/* Metrics selection */}
                  <div>
                    <h3 className="mb-3 text-medium font-medium">Active Metrics</h3>
                    <div className="space-y-3">
                      {metrics.map(metric => {
                        const {Icon} = metric;
                        return (
                          <div
                            className={
                              'flex items-center justify-between rounded-lg px-2' +
                              ' py-2 hover:bg-content2 transition-all duration-300 cursor-pointer'
                            }
                            key={metric.id}
                            onClick={() => toggleMetric(metric.id)}>
                            <div className="flex items-center gap-3">
                              <div
                                className={
                                  'flex h-9 w-9 items-center justify-center ' + 'rounded-md bg-primary/10 text-primary'
                                }>
                                <Icon className="text-xl" />
                              </div>
                              <div>
                                <p className="font-medium">{metric.label}</p>
                                <p className="text-sm text-default-500">{metric.description}</p>
                              </div>
                            </div>
                            <Checkbox
                              color="primary"
                              isSelected={enabledMetrics.has(metric.id)}
                              onValueChange={() => toggleMetric(metric.id)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </ModalBody>

            <ModalFooter className="justify-between">
              <Button color="warning" variant="light" onPress={onClose} className="cursor-default">
                Cancel
              </Button>
              <Button
                onPress={() => {
                  saveSettings();
                  onClose();
                }}
                variant="light"
                color="success">
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
