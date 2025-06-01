import {Activity, Cpu, Thermometer} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import {useHMonitorState} from '../../reducer';
import {getTemperatureColor, getUsageColor} from '../Utils';
import MetricItem from './MetricItem';
import Section from './Section';

type Props = {data: HardwareData};

export default function CpuSection({data}: Props) {
  const enableMonitor = useHMonitorState('enableMonitor');

  const {hasTemp, hasUsage} = useMemo(() => {
    const hasTemp = enableMonitor.includes('cpuTemp');
    const hasUsage = enableMonitor.includes('cpuUsage');
    return {hasTemp, hasUsage};
  }, [enableMonitor]);

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
