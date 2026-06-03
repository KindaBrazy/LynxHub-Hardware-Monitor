import {Activity, Database, Gauge, Monitor, Power, Thermometer, Zap} from 'lucide-react';
import {ElementType, memo, ReactNode, useMemo} from 'react';

import {GpuData, HardwareInfo, HardwareMetricsConfig, RawSensorValue} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {getGpuAlias} from '../../../utils/aliasUtils';
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
    case 'Data':
    case 'SmallData':
      return Database;
    default:
      return Activity;
  }
};

type Props = {
  data: GpuData | undefined;
  metrics: HardwareMetricsConfig;
  hardwareInfo: HardwareInfo | undefined;
  rawSensorValues: RawSensorValue[];
};

const GpuSection = memo(({data, metrics, hardwareInfo, rawSensorValues}: Props) => {
  const showAliasGpu = useHMonitorState('showAliasGpu');
  const {temp, usage, name, totalVram, usedVram} = data || {temp: 0, usage: 0, name: '', totalVram: 0, usedVram: 0};

  const vramPercentage = useMemo(() => (totalVram > 0 ? (usedVram / totalVram) * 100 : 0), [totalVram, usedVram]);

  const sensorReadingMap = useMemo(() => {
    const map = new Map<string, RawSensorValue>();
    rawSensorValues.forEach(val => map.set(val.Identifier, val));
    return map;
  }, [rawSensorValues]);

  const title = showAliasGpu ? getGpuAlias(name) : name;

  const renderedMetrics = useMemo(() => {
    const list: ReactNode[] = [];
    const processedIds = new Set<string>();

    metrics.enabled.forEach(metricId => {
      processedIds.add(metricId);
      if (metricId === 'temp') {
        list.push(
          <MetricItem
            unit="°C"
            key="temp"
            label="Temp"
            value={temp}
            icon={Thermometer}
            colorClass={getTemperatureColor(temp)}
            progress={{value: temp, max: 100, isTemp: true}}
          />,
        );
      } else if (metricId === 'vram') {
        list.push(
          <MetricItem
            key="vram"
            label="VRAM"
            icon={Database}
            progress={{value: vramPercentage}}
            colorClass={getUsageColor(vramPercentage)}
            value={`${usedVram.toFixed(1)}/${Math.round(totalVram)}GB`}
          />,
        );
      } else if (metricId === 'usage') {
        list.push(
          <MetricItem
            unit="%"
            icon={Zap}
            key="usage"
            label="Usage"
            value={Math.min(usage, 100)}
            colorClass={getUsageColor(usage)}
            progress={{value: Math.min(usage, 100)}}
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
  }, [
    metrics.enabled,
    metrics.custom,
    temp,
    usage,
    vramPercentage,
    usedVram,
    totalVram,
    hardwareInfo,
    sensorReadingMap,
  ]);

  return (
    <Section title={title} icon={Monitor}>
      {renderedMetrics}
    </Section>
  );
});

export default GpuSection;
