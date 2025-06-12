import {Database, Monitor, Thermometer, Zap} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import {useSystemMonitorState} from '../../reducer';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getTemperatureColor, getUsageColor} from '../Utils';

type Props = {data: HardwareData};

export default function GpuSection({data}: Props) {
  const enabledMetrics = useSystemMonitorState('enabledMetrics');

  const {hasTemp, hasVram, hasUsage} = useMemo(() => {
    const hasTemp = enabledMetrics.includes('gpuTemp');
    const hasVram = enabledMetrics.includes('vram');
    const hasUsage = enabledMetrics.includes('gpuUsage');
    return {hasTemp, hasVram, hasUsage};
  }, [enabledMetrics]);

  const vramPercentage = useMemo(() => {
    return data.vramTotal > 0 ? (data.vramUsed / data.vramTotal) * 100 : 0;
  }, [data]);

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

      {hasVram && (
        <MetricItem
          label="VRAM"
          icon={Database}
          progress={{value: vramPercentage}}
          colorClass={getUsageColor(vramPercentage)}
          value={`${data.vramUsed.toFixed(1)}/${Math.round(data.vramTotal)}GB`}
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
