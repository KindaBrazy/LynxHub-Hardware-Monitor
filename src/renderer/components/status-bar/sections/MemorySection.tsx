import {Activity, Database, Gauge, HardDrive, MemoryStick, Power, Thermometer} from 'lucide-react';
import {ElementType, memo, useMemo} from 'react';

import {HardwareInfo, HardwareMetricsConfig, MemoryData, RawSensorValue} from '../../../../cross/types';
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

function MemorySection({data, metrics, hardwareInfo, rawSensorValues}: Props) {
  const {name, used, total} = data || {name: '', used: 0, total: 0};
  const memPercentage = useMemo(() => (total > 0 ? (used / total) * 100 : 0), [total, used]);

  return (
    <Section title={name} icon={MemoryStick}>
      <MetricItem
        label="RAM"
        icon={HardDrive}
        progress={{value: memPercentage}}
        colorClass={getUsageColor(memPercentage)}
        value={`${used.toFixed(1)}/${total.toFixed(1)}GB`}
      />
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

export default memo(MemorySection);
