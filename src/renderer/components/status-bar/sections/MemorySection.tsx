import {Activity, Database, Gauge, HardDrive, MemoryStick, Power, Thermometer} from 'lucide-react';
import {ElementType, memo, useMemo} from 'react';

import {HardwareInfo, HardwareMetricsConfig, MemoryData, RawSensorValue} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {getUsageColor} from '../../../utils/colorUtils';
import {getMemoryAlias} from '../../../utils/aliasUtils';
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
  const showAliasMemory = useHMonitorState('showAliasMemory');
  const {name, used, total} = data || {name: '', used: 0, total: 0};
  const memPercentage = useMemo(() => (total > 0 ? (used / total) * 100 : 0), [total, used]);
  const sensorReadingMap = useMemo(() => {
    const map = new Map<string, RawSensorValue>();
    rawSensorValues.forEach(val => map.set(val.Identifier, val));
    return map;
  }, [rawSensorValues]);

  const title = showAliasMemory ? getMemoryAlias(name) : name;

  return (
    <Section title={title} icon={MemoryStick}>
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
        const sensorReading = sensorReadingMap.get(customMetric.sensorIdentifier);

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
