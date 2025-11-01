import {Activity, Database, Gauge, Monitor, Power, Thermometer, Zap} from 'lucide-react';
import {ElementType, memo, useMemo} from 'react';

import {GpuData, HardwareInfo, HardwareMetricsConfig, RawSensorValue} from '../../../../cross/types';
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

function GpuSection({data, metrics, hardwareInfo, rawSensorValues}: Props) {
  const {temp, usage, name, totalVram, usedVram} = data || {temp: 0, usage: 0, name: '', totalVram: 0, usedVram: 0};

  const hasTemp = useMemo(() => metrics.enabled.includes('temp'), [metrics.enabled]);
  const hasUsage = useMemo(() => metrics.enabled.includes('usage'), [metrics.enabled]);
  const hasVram = useMemo(() => metrics.enabled.includes('vram'), [metrics.enabled]);

  const vramPercentage = useMemo(() => (totalVram > 0 ? (usedVram / totalVram) * 100 : 0), [totalVram, usedVram]);

  return (
    <Section title={name} icon={Monitor}>
      {hasTemp && (
        <MetricItem
          unit="°C"
          label="Temp"
          value={temp}
          icon={Thermometer}
          colorClass={getTemperatureColor(temp)}
          progress={{value: temp, max: 100, isTemp: true}}
        />
      )}

      {hasVram && (
        <MetricItem
          label="VRAM"
          icon={Database}
          progress={{value: vramPercentage}}
          colorClass={getUsageColor(vramPercentage)}
          value={`${usedVram.toFixed(1)}/${Math.round(totalVram)}GB`}
        />
      )}

      {hasUsage && (
        <MetricItem
          unit="%"
          icon={Zap}
          label="Usage"
          value={usage}
          progress={{value: usage}}
          colorClass={getUsageColor(usage)}
        />
      )}

      {/* Render Custom Metrics */}
      {metrics.custom?.map(customMetric => {
        const sensorInfo = hardwareInfo?.sensors.find(s => s.Identifier === customMetric.sensorIdentifier);
        const sensorReading = rawSensorValues.find(s => s.Identifier === customMetric.sensorIdentifier);

        if (!sensorInfo || sensorReading?.Value === null || sensorReading?.Value === undefined) {
          return null;
        }
        const value = Number.isInteger(sensorReading.Value)
          ? sensorReading.Value
          : parseFloat(sensorReading.Value.toFixed(1));

        return (
          <MetricItem
            value={value}
            key={customMetric.id}
            unit={sensorInfo.Unit}
            label={customMetric.label}
            icon={getIconForSensorType(sensorInfo.Type)}
          />
        );
      })}
    </Section>
  );
}

export default memo(GpuSection);
