import {Activity, ArrowDown, ArrowUp, Database, Gauge, Power, Thermometer, Wifi} from 'lucide-react';
import {ElementType, memo, useMemo} from 'react';

import {HardwareInfo, HardwareMetricsConfig, NetworkData, RawSensorValue} from '../../../../cross/types';
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
  data: NetworkData | undefined;
  metrics: HardwareMetricsConfig;
  hardwareInfo: HardwareInfo | undefined;
  rawSensorValues: RawSensorValue[];
};

function NetworkSection({data, metrics, hardwareInfo, rawSensorValues}: Props) {
  const {name, uploadSpeed, downloadSpeed, uploadData, downloadData} = data || {
    name: '',
    uploadSpeed: 0,
    downloadSpeed: 0,
    uploadData: 0,
    downloadData: 0,
  };

  const hasUploadSpeed = useMemo(() => metrics.enabled.includes('uploadSpeed'), [metrics.enabled]);
  const hasDownloadSpeed = useMemo(() => metrics.enabled.includes('downloadSpeed'), [metrics.enabled]);
  const hasUploadData = useMemo(() => metrics.enabled.includes('uploadData'), [metrics.enabled]);
  const hasDownloadData = useMemo(() => metrics.enabled.includes('downloadData'), [metrics.enabled]);

  if (!hasUploadSpeed && !hasDownloadSpeed && !hasUploadData && !hasDownloadData) return null;

  return (
    <Section icon={Wifi} title={name}>
      {hasUploadSpeed && <MetricItem label="Up" unit=" Mbps" icon={ArrowUp} value={uploadSpeed} />}
      {hasDownloadSpeed && <MetricItem label="Down" unit=" Mbps" icon={ArrowDown} value={downloadSpeed} />}

      {hasUploadData && <MetricItem unit=" MB" icon={ArrowUp} label="Up Data" value={uploadData} />}
      {hasDownloadData && <MetricItem unit=" MB" icon={ArrowDown} label="Down Data" value={downloadData} />}

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

export default memo(NetworkSection);
