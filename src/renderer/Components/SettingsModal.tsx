import {
  Button,
  Card,
  CardBody,
  CardHeader,
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
import {Clock, Cpu, Database, LucideProps, Thermometer, Timer} from 'lucide-react';
import {ForwardRefExoticComponent, RefAttributes, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import LynxScroll from '../../../../src/renderer/src/App/Components/Reusable/LynxScroll';
import {AppDispatch} from '../../../../src/renderer/src/App/Redux/Store';
import rendererIpc from '../../../../src/renderer/src/App/RendererIpc';
import {lynxTopToast} from '../../../../src/renderer/src/App/Utils/UtilHooks';
import {Clock_Icon} from '../../../../src/renderer/src/assets/icons/SvgIcons/SvgIcons';
import {HMONITOR_STORAGE_ID} from '../../cross/CrossConst';
import {AvailableHardware, MetricItem, MetricType, MonitoringSettings, SystemMetrics} from '../../cross/CrossTypes';
import {systemMonitorActions, SystemMonitorState, useSystemMonitorState} from '../reducer';
import SettingsModal_Card from './Sections/SettingsModal_Card';
import Settings_MetricVisibility from './Settings_MetricVisibility';

type MetricConfig = {
  id: SystemMetrics;
  label: string;
  description: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};

// Metrics configuration
const metrics: MetricConfig[] = [
  {
    id: 'temp',
    label: 'Temperature',
    description: 'Monitor temperature in real-time',
    Icon: Thermometer,
  },
  {id: 'usage', label: 'Usage', description: 'Track utilization percentage', Icon: Cpu},
  {id: 'vram', label: 'VRAM', description: 'Monitor GPU memory usage', Icon: Database},
  {id: 'memory', label: 'Memory Usage', description: 'Monitor RAM usage and availability', Icon: Database},
  {id: 'uptimeSystemSeconds', label: 'System Uptime', description: 'Track total system uptime', Icon: Clock},
  {id: 'uptimeSeconds', label: 'Application Uptime', description: 'Track application runtime', Icon: Timer},
];

type Props = {isOpen: boolean; show: string; tabID: string};

export default function SettingsModal({show, isOpen, tabID}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const appEnabled = useSystemMonitorState('enabled');
  const enabledMetrics = useSystemMonitorState('enabledMetrics');
  const compactMode = useSystemMonitorState('compactMode');
  const refreshInterval = useSystemMonitorState('refreshInterval');
  const showSectionLabel = useSystemMonitorState('showSectionLabel');
  const availableHardware = useSystemMonitorState('availableHardware');

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const updateState = <K extends keyof SystemMonitorState>(key: K, value: SystemMonitorState[K]) =>
    dispatch(
      systemMonitorActions.updateState({
        key,
        value,
      }),
    );

  const onOpenChange = (value: boolean) => {
    if (!value) {
      rendererIpc.storage.getCustom(HMONITOR_STORAGE_ID).then((result: MonitoringSettings) => {
        dispatch(systemMonitorActions.setConfig(result));
      });
      dispatch(systemMonitorActions.closeModal({tabID: tabID}));
      setTimeout(() => {
        dispatch(systemMonitorActions.removeModal({tabID: tabID}));
      }, 500);
    }
  };

  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      lynxTopToast(dispatch).success('Settings saved successfully!');
    }, 700);
    dispatch(systemMonitorActions.saveSettings());
  };

  const getMetricItem = useCallback(
    (item: SystemMetrics, type: MetricType, name: string) => {
      const result = metrics.find(metric => metric.id === item);
      if (!result) return null;

      let isSelected: boolean;
      let toggle: () => void;

      if (type === 'uptime') {
        const upType = item === 'uptimeSeconds' ? 'app' : 'system';
        isSelected = enabledMetrics.uptime[upType];
        const result = {
          ...enabledMetrics.uptime,
          [upType]: !isSelected,
        };
        toggle = () => dispatch(systemMonitorActions.updateUptime(result));
      } else {
        isSelected = !!(enabledMetrics[type] as MetricItem)
          .find(metric => metric.name === name)
          ?.enabled.includes(item);

        toggle = () => {
          const targetMetric = enabledMetrics[type].find(metric => metric.name === name);

          if (!targetMetric) return;

          const currentEnabled = new Set(targetMetric.enabled);
          if (currentEnabled.has(item)) {
            currentEnabled.delete(item);
          } else {
            currentEnabled.add(item);
          }

          const newEnabledMetrics = {
            ...enabledMetrics,
            [type]: enabledMetrics[type].map(metric => {
              if (metric.name !== name) return metric;
              return {
                ...metric,
                enabled: Array.from(currentEnabled),
              };
            }),
          };

          dispatch(systemMonitorActions.updateMetrics(newEnabledMetrics));
        };
      }

      const {Icon, label} = result;

      return (
        <div
          className={
            'flex items-center p-2 gap-x-2 rounded-lg hover:bg-foreground-100' +
            ' transition-colors duration-200 cursor-pointer'
          }
          key={result.id}
          onClick={toggle}>
          <Icon className="size-5 text-secondary" />

          <span className="font-medium">{label}</span>

          <Checkbox color="secondary" onValueChange={toggle} isSelected={isSelected} />
        </div>
      );
    },
    [enabledMetrics],
  );

  const toggleHardware = useCallback(
    (name: string, type: keyof AvailableHardware, value?: boolean) => {
      const isActive = enabledMetrics[type].find(metric => metric.name === name)?.active;

      if (isActive || value !== true) {
        const result = {
          ...enabledMetrics,
          [type]: enabledMetrics[type].map(metric => (metric.name === name ? {...metric, active: false} : metric)),
        };
        dispatch(systemMonitorActions.updateMetrics(result));
      } else {
        const result = {
          ...enabledMetrics,
          [type]: enabledMetrics[type].map(metric => (metric.name === name ? {...metric, active: true} : metric)),
        };
        dispatch(systemMonitorActions.updateMetrics(result));
      }
    },
    [enabledMetrics],
  );

  const isActive = useCallback(
    (name: string, type: keyof AvailableHardware) => {
      return enabledMetrics[type].find(metric => metric.name === name)?.active || false;
    },
    [enabledMetrics],
  );

  return (
    <Modal
      classNames={{
        backdrop: `!top-10 ${show}`,
        wrapper: `!top-10 pb-8 ${show}`,
      }}
      size="3xl"
      isOpen={isOpen}
      placement="center"
      isDismissable={false}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      hideCloseButton>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="items-center justify-center">Hardware Monitor Settings</ModalHeader>

            <ModalBody as={LynxScroll}>
              {/* Main app toggle */}
              <div className="mb-4 rounded-xl bg-content2 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Enable System Monitoring</h3>
                    <p className="text-xs text-foreground-400">When disabled, all metrics collection will be paused</p>
                  </div>
                  <Switch
                    color="primary"
                    isSelected={appEnabled}
                    onValueChange={value => updateState('enabled', value)}
                  />
                </div>
              </div>

              {appEnabled && (
                <>
                  <Divider className="my-4 bg-foreground-100" />

                  {/* Refresh interval */}
                  <div className="mb-6 pt-1">
                    <NumberInput
                      step={0.5}
                      maxValue={60}
                      minValue={0.5}
                      value={refreshInterval}
                      labelPlacement="outside"
                      label="Refresh Interval"
                      classNames={{label: 'text-medium'}}
                      startContent={<Clock_Icon className="size-6" />}
                      onValueChange={value => updateState('refreshInterval', value)}
                      description="How frequently metrics should update (0.5-60 seconds)"
                      endContent={<span className="text-xs text-foreground-500">Seconds</span>}
                    />
                  </div>

                  {/* Display options */}
                  <div className="mb-6 space-y-4">
                    <h3 className="text-medium font-medium">Display Options</h3>

                    <div
                      onClick={() => {
                        updateState('compactMode', !compactMode);
                      }}
                      className={
                        'flex items-center justify-between rounded-lg px-2 ' +
                        'py-2 hover:bg-content2 transition-all duration-300 cursor-pointer'
                      }>
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-xs text-foreground-400">Use condensed layout to save space</p>
                      </div>
                      <Switch
                        onValueChange={value => {
                          updateState('compactMode', value);
                        }}
                        size="sm"
                        isSelected={compactMode}
                      />
                    </div>

                    <div
                      onClick={() => {
                        updateState('showSectionLabel', !showSectionLabel);
                      }}
                      className={
                        'flex items-center justify-between rounded-lg px-2 py-2 ' +
                        'hover:bg-content2 transition-all duration-300 cursor-pointer'
                      }>
                      <div>
                        <p className="font-medium">Show Section Labels</p>
                        <p className="text-xs text-foreground-400">Display headers for metric groups</p>
                      </div>
                      <Switch
                        onValueChange={value => {
                          updateState('showSectionLabel', value);
                        }}
                        size="sm"
                        isSelected={showSectionLabel}
                      />
                    </div>

                    <Settings_MetricVisibility />
                  </div>

                  {/* Metrics selection */}
                  <Divider className="my-4 bg-foreground-100" />

                  {availableHardware.gpu.map(item => (
                    <SettingsModal_Card
                      onPress={() => {
                        toggleHardware(item, 'gpu');
                      }}
                      onValueChange={value => {
                        toggleHardware(item, 'gpu', value);
                      }}
                      title={item}
                      key={`hardware_${item}_item`}
                      isSelected={isActive(item, 'gpu')}>
                      {getMetricItem('temp', 'gpu', item)}
                      <Divider className="h-4 mx-1" orientation="vertical" />
                      {getMetricItem('usage', 'gpu', item)}
                      <Divider className="h-4 mx-1" orientation="vertical" />
                      {getMetricItem('vram', 'gpu', item)}
                    </SettingsModal_Card>
                  ))}

                  {availableHardware.cpu.map(item => (
                    <SettingsModal_Card
                      onPress={() => {
                        toggleHardware(item, 'cpu');
                      }}
                      onValueChange={value => {
                        toggleHardware(item, 'cpu', value);
                      }}
                      title={item}
                      key={`hardware_${item}_item`}
                      isSelected={isActive(item, 'cpu')}>
                      {getMetricItem('temp', 'cpu', item)}
                      <Divider className="h-4 mx-1" orientation="vertical" />
                      {getMetricItem('usage', 'cpu', item)}
                    </SettingsModal_Card>
                  ))}

                  {availableHardware.memory.map(item => (
                    <SettingsModal_Card
                      onPress={() => {
                        toggleHardware(item, 'memory');
                      }}
                      onValueChange={value => {
                        toggleHardware(item, 'memory', value);
                      }}
                      title={item}
                      key={`hardware_${item}_item`}
                      isSelected={isActive(item, 'memory')}>
                      {getMetricItem('memory', 'memory', item)}
                    </SettingsModal_Card>
                  ))}

                  <Card
                    className="border-1 border-foreground-100 pt-2 px-2
                    hover:border-foreground-200 transition-all duration-200 mt-4"
                    as="div"
                    fullWidth>
                    <CardHeader className="font-medium">Uptime</CardHeader>
                    <CardBody className="flex-row items-center">
                      {getMetricItem('uptimeSystemSeconds', 'uptime', 'uptime')}
                      <Divider className="h-4 mx-1" orientation="vertical" />
                      {getMetricItem('uptimeSeconds', 'uptime', 'uptime')}
                    </CardBody>
                  </Card>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="success" variant="light" isLoading={isSaving} onPress={saveSettings}>
                {!isSaving && 'Save Settings'}
              </Button>
              <Button color="warning" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
