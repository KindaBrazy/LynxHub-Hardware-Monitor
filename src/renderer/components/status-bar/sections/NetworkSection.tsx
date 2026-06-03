import {convertStorageUnit, formatSize} from '@lynx_common/utils';
import {Activity, ArrowDown, ArrowUp, Database, Gauge, Power, Thermometer, Wifi} from 'lucide-react';
import {ElementType, memo, ReactNode, useMemo} from 'react';

import {HardwareInfo, HardwareMetricsConfig, NetworkData, RawSensorValue} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {getNetworkAlias} from '../../../utils/aliasUtils';
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

const NetworkSection = memo(({data, metrics, hardwareInfo, rawSensorValues}: Props) => {
  const showAliasNetwork = useHMonitorState('showAliasNetwork');
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

  const sensorReadingMap = useMemo(() => {
    const map = new Map<string, RawSensorValue>();
    rawSensorValues.forEach(val => map.set(val.Identifier, val));
    return map;
  }, [rawSensorValues]);

  const title = showAliasNetwork ? getNetworkAlias(name) : name;

  const renderedMetrics = useMemo(() => {
    const list: ReactNode[] = [];
    const processedIds = new Set<string>();

    metrics.enabled.forEach(metricId => {
      processedIds.add(metricId);
      if (metricId === 'uploadSpeed') {
        list.push(<MetricItem label="Up" icon={ArrowUp} key="uploadSpeed" value={formatSize(uploadSpeed)} />);
      } else if (metricId === 'downloadSpeed') {
        list.push(<MetricItem label="Down" icon={ArrowDown} key="downloadSpeed" value={formatSize(downloadSpeed)} />);
      } else if (metricId === 'uploadData') {
        list.push(
          <MetricItem
            icon={ArrowUp}
            label="Up Data"
            key="uploadData"
            value={formatSize(convertStorageUnit(uploadData?.toString() ?? '0', 'GB', 'B') || 0)}
          />,
        );
      } else if (metricId === 'downloadData') {
        list.push(
          <MetricItem
            icon={ArrowDown}
            label="Down Data"
            key="downloadData"
            value={formatSize(convertStorageUnit(downloadData?.toString() ?? '0', 'GB', 'B') || 0)}
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

    if (!hasUploadSpeed && !hasDownloadSpeed && !hasUploadData && !hasDownloadData) return null;

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
    uploadSpeed,
    downloadSpeed,
    uploadData,
    downloadData,
    hardwareInfo,
    sensorReadingMap,
  ]);

  if (renderedMetrics?.length === 0) return null;

  return (
    <Section icon={Wifi} title={title}>
      {renderedMetrics}
    </Section>
  );
});

export default NetworkSection;
