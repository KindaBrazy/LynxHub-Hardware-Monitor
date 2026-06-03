import {Activity, Database, Gauge, HardDrive, MemoryStick, Power, Thermometer} from 'lucide-react';
import {ElementType, memo, ReactNode, useMemo} from 'react';

import {HardwareInfo, HardwareMetricsConfig, MemoryData, RawSensorValue} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {getMemoryAlias} from '../../../utils/aliasUtils';
import {getUsageColor} from '../../../utils/colorUtils';
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
    case 'Data':
    case 'SmallData':
      return Database;
    default:
      return Activity;
  }
};

type Props = {
  data: MemoryData | undefined;
  metrics: HardwareMetricsConfig;
  hardwareInfo: HardwareInfo | undefined;
  rawSensorValues: RawSensorValue[];
};

const MemorySection = memo(({data, metrics, hardwareInfo, rawSensorValues}: Props) => {
  const showAliasMemory = useHMonitorState('showAliasMemory');
  const {name, used, total} = data || {name: '', used: 0, total: 0};
  const memPercentage = useMemo(() => (total > 0 ? (used / total) * 100 : 0), [total, used]);
  const sensorReadingMap = useMemo(() => {
    const map = new Map<string, RawSensorValue>();
    rawSensorValues.forEach(val => map.set(val.Identifier, val));
    return map;
  }, [rawSensorValues]);

  const title = showAliasMemory ? getMemoryAlias(name) : name;

  const renderedMetrics = useMemo(() => {
    const list: ReactNode[] = [];
    const processedIds = new Set<string>();

    metrics.enabled.forEach(metricId => {
      processedIds.add(metricId);
      if (metricId === 'memory') {
        list.push(
          <MetricItem
            label="RAM"
            key="memory"
            icon={HardDrive}
            progress={{value: memPercentage}}
            colorClass={getUsageColor(memPercentage)}
            value={`${used.toFixed(1)}/${total.toFixed(1)}GB`}
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
  }, [metrics.enabled, metrics.custom, memPercentage, used, total, hardwareInfo, sensorReadingMap]);

  return (
    <Section title={title} icon={MemoryStick}>
      {renderedMetrics}
    </Section>
  );
});

export default MemorySection;
