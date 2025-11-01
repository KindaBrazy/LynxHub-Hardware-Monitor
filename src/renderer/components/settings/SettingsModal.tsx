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
import {AnimatePresence, motion} from 'framer-motion';
import {Clock, Cpu, Database, LucideProps, Thermometer, Timer} from 'lucide-react';
import {ForwardRefExoticComponent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import LynxScroll from '../../../../../src/renderer/src/App/Components/Reusable/LynxScroll';
import {AppDispatch} from '../../../../../src/renderer/src/App/Redux/Store';
import rendererIpc from '../../../../../src/renderer/src/App/RendererIpc';
import {lynxTopToast} from '../../../../../src/renderer/src/App/Utils/UtilHooks';
import {Clock_Icon} from '../../../../../src/renderer/src/assets/icons/SvgIcons/SvgIcons';
import {HMONITOR_STORAGE_ID} from '../../../cross/constants';
import {HardwareMetricsConfig, MetricType, MonitoringSettings, SystemMetric} from '../../../cross/types';
import {hmonitorActions, HMonitorState, useHMonitorSelector} from '../../state/hmonitorSlice';
import MetricVisibilitySettings from './MetricVisibilitySettings';
import SettingsModalCard from './SettingsModalCard';

// Configuration for each available metric type, defining its UI representation.
const METRIC_CONFIG: Record<string, {label: string; Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>}> = {
  temp: {label: 'Temperature', Icon: Thermometer},
  usage: {label: 'Usage', Icon: Cpu},
  vram: {label: 'VRAM', Icon: Database},
  memory: {label: 'Memory Usage', Icon: Database},
  uptimeSystem: {label: 'System Uptime', Icon: Clock},
  uptimeApp: {label: 'Application Uptime', Icon: Timer},
};

type SettingsModalProps = {isOpen: boolean; show: string; tabID: string};

export default function SettingsModal({show, isOpen, tabID}: SettingsModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useHMonitorSelector(state => state.hmonitor);
  const {enabled, enabledMetrics, compactMode, refreshInterval, showSectionLabel, availableHardware} = settings;

  const [isSaving, setIsSaving] = useState<boolean>(false);

  function updateState<K extends keyof HMonitorState>(key: K, value: HMonitorState[K]) {
    dispatch(hmonitorActions.updateState({key, value}));
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      // Revert changes if the modal is closed without saving
      rendererIpc.storage.getCustom(HMONITOR_STORAGE_ID).then((savedSettings: MonitoringSettings) => {
        if (savedSettings) dispatch(hmonitorActions.setConfig(savedSettings));
      });
      dispatch(hmonitorActions.closeModal({tabID}));
      setTimeout(() => dispatch(hmonitorActions.removeModal({tabID})), 500);
    }
  };

  const saveSettings = () => {
    setIsSaving(true);
    dispatch(hmonitorActions.saveSettings());
    setTimeout(() => {
      setIsSaving(false);
      lynxTopToast(dispatch).success('Settings saved successfully!');
    }, 700);
  };

  const getMetricItem = useCallback(
    (metricId: SystemMetric, type: MetricType | 'uptime', hardwareName: string) => {
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
          dispatch(hmonitorActions.updateHardwareMetrics({type, name: hardwareName, enabled: newEnabled}));
        };
      }

      return (
        <div
          className={
            'flex items-center p-2 gap-x-2 rounded-lg hover:bg-foreground-100' +
            ' transition-colors duration-200 cursor-pointer'
          }
          key={metricId}
          onClick={onToggle}>
          <config.Icon className="size-5 text-secondary" />
          <span className="font-medium">{config.label}</span>
          <Checkbox color="secondary" isSelected={isSelected} onValueChange={onToggle} />
        </div>
      );
    },
    [enabledMetrics, dispatch],
  );

  const toggleHardwareActive = useCallback(
    (name: string, type: MetricType) => {
      const hardwareConfig = enabledMetrics[type].find(metric => metric.name === name);
      if (hardwareConfig) {
        dispatch(hmonitorActions.updateHardwareActive({type, name, active: !hardwareConfig.active}));
      }
    },
    [enabledMetrics, dispatch],
  );

  return (
    <Modal
      size="3xl"
      isOpen={isOpen}
      placement="center"
      isDismissable={false}
      scrollBehavior="inside"
      onOpenChange={handleOpenChange}
      classNames={{backdrop: `!top-10 ${show}`, wrapper: `!top-10 pb-8 ${show}`}}
      hideCloseButton>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="items-center justify-center">Hardware Monitor Settings</ModalHeader>
            <ModalBody as={LynxScroll}>
              <div className="mb-4 rounded-xl bg-content2 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Enable System Monitoring</h3>
                    <p className="text-xs text-foreground-400">When disabled, all metrics collection will be paused</p>
                  </div>
                  <Switch color="primary" isSelected={enabled} onValueChange={value => updateState('enabled', value)} />
                </div>
              </div>

              <AnimatePresence>
                {enabled && (
                  <motion.div
                    transition={{delay: 0.1}}
                    className="flex flex-col gap-y-4"
                    exit={{translateY: -10, opacity: 0}}
                    animate={{translateY: 0, opacity: 1}}
                    initial={{translateY: 10, opacity: 0}}>
                    <div className="p-4 shadow-sm bg-foreground-100 dark:bg-LynxRaisinBlack rounded-xl">
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

                      <div className="mb-6 space-y-4">
                        <div
                          className={
                            'flex items-center justify-between rounded-lg px-2 py-2 ' +
                            'hover:bg-content2 transition-all duration-300 cursor-pointer'
                          }
                          onClick={() => updateState('compactMode', !compactMode)}>
                          <div>
                            <p className="font-medium">Compact Mode</p>
                            <p className="text-xs text-foreground-400">Use condensed layout to save space</p>
                          </div>
                          <Switch size="sm" isSelected={compactMode} />
                        </div>

                        <div
                          className={
                            'flex items-center justify-between rounded-lg px-2 py-2 ' +
                            'hover:bg-content2 transition-all duration-300 cursor-pointer'
                          }
                          onClick={() => updateState('showSectionLabel', !showSectionLabel)}>
                          <div>
                            <p className="font-medium">Show Section Labels</p>
                            <p className="text-xs text-foreground-400">Display headers for metric groups</p>
                          </div>
                          <Switch size="sm" isSelected={showSectionLabel} />
                        </div>
                        <MetricVisibilitySettings />
                      </div>
                    </div>

                    <div
                      className={
                        'flex flex-col gap-y-2 shadow-sm p-4 bg-foreground-100 ' + 'dark:bg-LynxRaisinBlack rounded-xl'
                      }>
                      {availableHardware.gpu.map(name => (
                        <SettingsModalCard
                          title={name}
                          key={`gpu-settings-${name}`}
                          onToggle={() => toggleHardwareActive(name, 'gpu')}
                          isSelected={enabledMetrics.gpu.find(m => m.name === name)?.active ?? false}>
                          {getMetricItem('temp', 'gpu', name)}
                          <Divider className="h-4 mx-1" orientation="vertical" />
                          {getMetricItem('usage', 'gpu', name)}
                          <Divider className="h-4 mx-1" orientation="vertical" />
                          {getMetricItem('vram', 'gpu', name)}
                        </SettingsModalCard>
                      ))}

                      {availableHardware.cpu.map(name => (
                        <SettingsModalCard
                          title={name}
                          key={`cpu-settings-${name}`}
                          onToggle={() => toggleHardwareActive(name, 'cpu')}
                          isSelected={enabledMetrics.cpu.find(m => m.name === name)?.active ?? false}>
                          {getMetricItem('temp', 'cpu', name)}
                          <Divider className="h-4 mx-1" orientation="vertical" />
                          {getMetricItem('usage', 'cpu', name)}
                        </SettingsModalCard>
                      ))}

                      {availableHardware.memory.map(name => (
                        <SettingsModalCard
                          title={name}
                          key={`memory-settings-${name}`}
                          onToggle={() => toggleHardwareActive(name, 'memory')}
                          isSelected={enabledMetrics.memory.find(m => m.name === name)?.active ?? false}>
                          {getMetricItem('memory', 'memory', name)}
                        </SettingsModalCard>
                      ))}

                      <Card as="div" className="!shadow-sm p-2" fullWidth>
                        <CardHeader className="font-medium">Uptime</CardHeader>
                        <CardBody className="flex-row items-center">
                          {getMetricItem('uptimeSystem', 'uptime', 'system')}
                          <Divider className="h-4 mx-1" orientation="vertical" />
                          {getMetricItem('uptimeApp', 'uptime', 'app')}
                        </CardBody>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
