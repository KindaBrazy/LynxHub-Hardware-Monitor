import {Monitor, Thermometer, Zap} from 'lucide-react';

import {HardwareData} from '../../../cross/CrossTypes';
import {getTemperatureColor, getUsageColor} from '../Utils';
import MetricItem from './MetricItem';
import Section from './Section';

type Props = {data: HardwareData};

export default function GpuSection({data}: Props) {
  return (
    <Section title="GPU" icon={Monitor}>
      <MetricItem
        unit="°C"
        label="Temp"
        icon={Thermometer}
        value={data.gpuTemp}
        colorClass={getTemperatureColor(data.gpuTemp)}
        progress={{value: data.gpuTemp, max: 100, isTemp: true}}
      />
      <MetricItem
        unit="%"
        icon={Zap}
        label="Usage"
        value={data.gpuUsage}
        progress={{value: data.gpuUsage}}
        colorClass={getUsageColor(data.gpuUsage)}
      />
    </Section>
  );
}
