import {Activity, Cpu, Thermometer} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import {useSystemMonitorState} from '../../reducer';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getTemperatureColor, getUsageColor} from '../Utils';

type Props = {data: HardwareData};

export default function CpuSection({data}: Props) {
  const enabledMetrics = useSystemMonitorState('enabledMetrics');

  const {hasTemp, hasUsage} = useMemo(() => {
    const hasTemp = enabledMetrics.includes('cpuTemp');
    const hasUsage = enabledMetrics.includes('cpuUsage');
    return {hasTemp, hasUsage};
  }, [enabledMetrics]);

  return (
    <Section icon={Cpu} title="CPU">
      {hasTemp && (
        <MetricItem
          unit="°C"
          label="Temp"
          icon={Thermometer}
          value={data.cpuTemp}
          colorClass={getTemperatureColor(data.cpuTemp)}
          progress={{value: data.cpuTemp, max: 100, isTemp: true}}
        />
      )}

      {hasUsage && (
        <MetricItem
          unit="%"
          label="Usage"
          icon={Activity}
          value={data.cpuUsage}
          progress={{value: data.cpuUsage}}
          colorClass={getUsageColor(data.cpuUsage)}
        />
      )}
    </Section>
  );
}
