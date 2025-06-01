import {Activity, Cpu, Thermometer} from 'lucide-react';

import {HardwareData} from '../../../cross/CrossTypes';
import {getTemperatureColor, getUsageColor} from '../Utils';
import MetricItem from './MetricItem';
import Section from './Section';

type Props = {data: HardwareData};

export default function CpuSection({data}: Props) {
  return (
    <Section icon={Cpu} title="CPU">
      <MetricItem
        unit="°C"
        label="Temp"
        icon={Thermometer}
        value={data.cpuTemp}
        colorClass={getTemperatureColor(data.cpuTemp)}
        progress={{value: data.cpuTemp, max: 100, isTemp: true}}
      />
      <MetricItem
        unit="%"
        label="Usage"
        icon={Activity}
        value={data.cpuUsage}
        progress={{value: data.cpuUsage}}
        colorClass={getUsageColor(data.cpuUsage)}
      />
    </Section>
  );
}
