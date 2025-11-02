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
  Select,
  SelectItem,
  Switch,
} from '@heroui/react';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowDown, ArrowUp, Clock, Cpu, Database, LucideProps, Thermometer, Timer} from 'lucide-react';
import {ForwardRefExoticComponent, useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import LynxScroll from '../../../../../src/renderer/src/App/Components/Reusable/LynxScroll';
import {AppDispatch} from '../../../../../src/renderer/src/App/Redux/Store';
import rendererIpc from '../../../../../src/renderer/src/App/RendererIpc';
import {lynxTopToast} from '../../../../../src/renderer/src/App/Utils/UtilHooks';
import {Clock_Icon} from '../../../../../src/renderer/src/assets/icons/SvgIcons/SvgIcons';
import {HMONITOR_STORAGE_ID} from '../../../cross/constants';
import {DisplayStyle, HardwareMetricsConfig, MetricType, MonitoringSettings, SystemMetric} from '../../../cross/types';
import {hmonitorActions, SystemMonitorState, useHMonitorSelector} from '../../state/hmonitorSlice';
import MetricVisibilitySettings from './MetricVisibilitySettings';
import SettingsModalCard from './SettingsModalCard'; // Configuration for each available metric type, defining its UI representation.

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

type SettingsModalProps = {isOpen: boolean; show: string; tabID: string};

export default function SettingsModal({show, isOpen, tabID}: SettingsModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useHMonitorSelector(state => state.hmonitor);
  const {enabled, enabledMetrics, displayStyle, refreshInterval, showSectionLabel, availableHardware} = settings;

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedNetworkName, setSelectedNetworkName] = useState<string>(availableHardware.network[0]?.name || '');

  const isRawStyle = useMemo(() => displayStyle === 'raw' || displayStyle === 'raw-two-column', [displayStyle]);

  const selectedNetworkConfig = useMemo(
    () => enabledMetrics.network.find(n => n.name === selectedNetworkName),
    [selectedNetworkName, enabledMetrics.network],
  );
  const selectedNetworkHardware = useMemo(
    () => availableHardware.network.find(n => n.name === selectedNetworkName),
    [selectedNetworkName, availableHardware.network],
  );

  function updateState<K extends keyof SystemMonitorState>(key: K, value: SystemMonitorState[K]) {
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
                        <Select
                          label="Display Style"
                          labelPlacement="outside"
                          selectedKeys={[displayStyle]}
                          placeholder="Select a display style"
                          onChange={e => handleDisplayStyleChange(e.target.value as DisplayStyle)}>
                          {DISPLAY_STYLES.map(style => (
                            <SelectItem key={style.value} textValue={style.value} description={style.description}>
                              {style.label}
                            </SelectItem>
                          ))}
                        </Select>

                        <div
                          className={
                            'flex items-center justify-between rounded-lg px-2 py-2 ' +
                            'hover:bg-content2 transition-all duration-300 cursor-pointer'
                          }
                          onClick={() => !isRawStyle && updateState('showSectionLabel', !showSectionLabel)}>
                          <div>
                            <p className={`font-medium ${isRawStyle ? 'text-foreground-400' : ''}`}>
                              Show Section Labels
                            </p>
                            <p className="text-xs text-foreground-400">
                              Display headers for metric groups (disabled for Raw styles)
                            </p>
                          </div>
                          <Switch size="sm" isDisabled={isRawStyle} isSelected={showSectionLabel} />
                        </div>
                        <div className={isRawStyle ? 'opacity-50 pointer-events-none' : ''}>
                          <MetricVisibilitySettings />
                          {isRawStyle && (
                            <p className="text-xs text-foreground-400 mt-1">
                              Metric visibility is not applicable for Raw display styles.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        'flex flex-col gap-y-2 shadow-sm p-4 bg-foreground-100 ' + 'dark:bg-LynxRaisinBlack rounded-xl'
                      }>
                      {availableHardware.gpu.map(hw => (
                        <SettingsModalCard
                          type="gpu"
                          hardware={hw}
                          key={`gpu-settings-${hw.name}`}
                          onToggle={() => toggleHardwareActive(hw.name, 'gpu')}
                          config={enabledMetrics.gpu.find(m => m.name === hw.name)}>
                          {getMetricItem('temp', 'gpu', hw.name)}
                          <Divider className="h-4 mx-1" orientation="vertical" />
                          {getMetricItem('usage', 'gpu', hw.name)}
                          <Divider className="h-4 mx-1" orientation="vertical" />
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
                          <Divider className="h-4 mx-1" orientation="vertical" />
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
                        <Card as="div" className="!shadow-sm p-2" fullWidth>
                          <CardHeader className="flex flex-row justify-between">
                            <p className="font-medium">Network Interface</p>
                            {selectedNetworkConfig && (
                              <Switch
                                isSelected={selectedNetworkConfig.active}
                                onValueChange={() => toggleHardwareActive(selectedNetworkName, 'network')}
                              />
                            )}
                          </CardHeader>
                          <CardBody className="flex-col items-start relative gap-y-4">
                            <Select
                              selectionMode="single"
                              items={availableHardware.network}
                              aria-label="Select Network Interface"
                              placeholder="Select a network interface to configure"
                              onChange={e => setSelectedNetworkName(e.target.value)}
                              selectedKeys={selectedNetworkName ? [selectedNetworkName] : []}
                              disallowEmptySelection>
                              {item => <SelectItem key={item.name}>{item.name}</SelectItem>}
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
                          </CardBody>
                        </Card>
                      )}

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
