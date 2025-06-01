import {Monitor, Thermometer, Zap} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import {useSystemMonitorState} from '../../reducer';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getTemperatureColor, getUsageColor} from '../Utils';

type Props = {data: HardwareData};

export default function GpuSection({data}: Props) {
  const enableMonitor = useSystemMonitorState('enableMonitor');

  const {hasTemp, hasUsage} = useMemo(() => {
    const hasTemp = enableMonitor.includes('gpuTemp');
    const hasUsage = enableMonitor.includes('gpuUsage');
    return {hasTemp, hasUsage};
  }, [enableMonitor]);

  return (
    <Section title="GPU" icon={Monitor}>
      {hasTemp && (
        <MetricItem
          unit="°C"
          label="Temp"
          icon={Thermometer}
          value={data.gpuTemp}
          colorClass={getTemperatureColor(data.gpuTemp)}
          progress={{value: data.gpuTemp, max: 100, isTemp: true}}
        />
      )}
      {hasUsage && (
        <MetricItem
          unit="%"
          icon={Zap}
          label="Usage"
          value={data.gpuUsage}
          progress={{value: data.gpuUsage}}
          colorClass={getUsageColor(data.gpuUsage)}
        />
      )}
    </Section>
  );
}
