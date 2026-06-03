import {Activity, Cpu as CpuIcon, Gauge, Power, Thermometer} from 'lucide-react';
import {ElementType, memo, ReactNode, useMemo} from 'react';

import {CpuData, HardwareInfo, HardwareMetricsConfig, RawSensorValue} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {getCpuAlias} from '../../../utils/aliasUtils';
import {getTemperatureColor, getUsageColor} from '../../../utils/colorUtils';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

const getIconForSensorType = (type: string): ElementType => {
  switch (type) {
    case 'Temperature':
      return Thermometer;
    case 'Load':
      return Activity;
    case 'Power':
      return Power;
    case 'Clock':
      return Gauge;
    default:
      return Activity;
  }
};

type Props = {
  data: CpuData | undefined;
  metrics: HardwareMetricsConfig;
  hardwareInfo: HardwareInfo | undefined;
  rawSensorValues: RawSensorValue[];
};

const CpuSection = memo(({data, metrics, hardwareInfo, rawSensorValues}: Props) => {
  const displayStyle = useHMonitorState('displayStyle');
  const showAliasCpu = useHMonitorState('showAliasCpu');
  const {temp, usage, name} = data || {temp: 0, usage: 0, name: ''};

  const sensorReadingMap = useMemo(() => {
    const map = new Map<string, RawSensorValue>();
    rawSensorValues.forEach(val => map.set(val.Identifier, val));
    return map;
  }, [rawSensorValues]);

  const title = showAliasCpu ? getCpuAlias(name) : name;

  const renderedMetrics = useMemo(() => {
    const list: ReactNode[] = [];
    const processedIds = new Set<string>();

    metrics.enabled.forEach(metricId => {
      processedIds.add(metricId);
      if (metricId === 'temp') {
        list.push(
          temp > 0 ? (
            <MetricItem
              unit="°C"
              key="temp"
              label="Temp"
              value={temp}
              icon={Thermometer}
              colorClass={getTemperatureColor(temp)}
              progress={{value: temp, max: 100, isTemp: true}}
            />
          ) : (
            <MetricItem key="temp" label="Temp" icon={Thermometer} value="Admin Required">
              <Thermometer
                className={`${
                  ['compact', 'two-column'].includes(displayStyle) ? 'size-3' : 'size-4'
                } shrink-0 text-danger`}
              />
              <span className="text-xs font-medium text-danger whitespace-nowrap">Admin Required</span>
            </MetricItem>
          ),
        );
      } else if (metricId === 'usage') {
        list.push(
          <MetricItem
            unit="%"
            key="usage"
            label="Usage"
            value={usage}
            icon={Activity}
            progress={{value: usage}}
            colorClass={getUsageColor(usage)}
          />,
        );
      } else {
        const customMetric = metrics.custom?.find(m => m.id === metricId);
        if (customMetric) {
          const sensorInfo = hardwareInfo?.sensors.find(s => s.Identifier === customMetric.sensorIdentifier);
          const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
          if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== undefined) {
            const value = Number.isInteger(sensorReading.Value)
              ? sensorReading.Value
              : parseFloat(sensorReading.Value.toFixed(1));
            list.push(
              <MetricItem
                value={value}
                key={customMetric.id}
                unit={sensorInfo.Unit}
                label={customMetric.label}
                icon={getIconForSensorType(sensorInfo.Type)}
              />,
            );
          }
        }
      }
    });

    metrics.custom?.forEach(customMetric => {
      if (processedIds.has(customMetric.id)) return;
      const sensorInfo = hardwareInfo?.sensors.find(s => s.Identifier === customMetric.sensorIdentifier);
      const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);
      if (sensorInfo && sensorReading?.Value !== null && sensorReading?.Value !== undefined) {
        const value = Number.isInteger(sensorReading.Value)
          ? sensorReading.Value
          : parseFloat(sensorReading.Value.toFixed(1));
        list.push(
          <MetricItem
            value={value}
            key={customMetric.id}
            unit={sensorInfo.Unit}
            label={customMetric.label}
            icon={getIconForSensorType(sensorInfo.Type)}
          />,
        );
      }
    });

    return list;
  }, [metrics.enabled, metrics.custom, temp, usage, displayStyle, hardwareInfo, sensorReadingMap]);

  return (
    <Section title={title} icon={CpuIcon}>
      {renderedMetrics}
    </Section>
  );
});

export default CpuSection;
