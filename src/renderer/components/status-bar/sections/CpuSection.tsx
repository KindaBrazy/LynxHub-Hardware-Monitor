import {Activity, Cpu as CpuIcon, Gauge, Power, Thermometer} from 'lucide-react';
import {ElementType, memo, useMemo} from 'react';

import {CpuData, HardwareInfo, HardwareMetricsConfig, RawSensorValue} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
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

function CpuSection({data, metrics, hardwareInfo, rawSensorValues}: Props) {
  const compactMode = useHMonitorState('compactMode');
  const {temp, usage, name} = data || {temp: 0, usage: 0, name: ''};

  const hasTemp = useMemo(() => metrics.enabled.includes('temp'), [metrics.enabled]);
  const hasUsage = useMemo(() => metrics.enabled.includes('usage'), [metrics.enabled]);

  return (
    <Section title={name} icon={CpuIcon}>
      {hasTemp &&
        (temp > 0 ? (
          <MetricItem
            unit="°C"
            label="Temp"
            value={temp}
            icon={Thermometer}
            colorClass={getTemperatureColor(temp)}
            progress={{value: temp, max: 100, isTemp: true}}
          />
        ) : (
          // Special case for when temperature could not be read (e.g., needs admin rights)
          <MetricItem value="" label="Temp" icon={Thermometer}>
            <Thermometer className={`${compactMode ? 'size-3' : 'size-4'} shrink-0 text-danger`} />
            <span className="text-xs font-medium text-danger whitespace-nowrap">Admin Required</span>
          </MetricItem>
        ))}

      {hasUsage && (
        <MetricItem
          unit="%"
          label="Usage"
          value={usage}
          icon={Activity}
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
export default memo(CpuSection);
