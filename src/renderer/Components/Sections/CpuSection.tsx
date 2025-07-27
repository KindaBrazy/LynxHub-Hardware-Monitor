import {Activity, Cpu, Thermometer} from 'lucide-react';
import {useMemo} from 'react';

import {CpuData} from '../../../cross/CrossTypes';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getTemperatureColor, getUsageColor} from '../Utils';

type Props = {
  data: CpuData | undefined;
  metrics: {
    name: string;
    enabled: string[];
  };
};

export default function CpuSection({data, metrics}: Props) {
  const {hasTemp, hasUsage} = useMemo(() => {
    const hasTemp = metrics.enabled.includes('temp');
    const hasUsage = metrics.enabled.includes('usage');
    return {hasTemp, hasUsage};
  }, [metrics]);

  const {temp, usage, name} = useMemo(
    () => ({temp: data?.temp || 0, usage: data?.usage || 0, name: data?.name || 'N/A'}),
    [data],
  );

  return (
    <Section icon={Cpu} title={name}>
      {hasTemp && (
        <MetricItem
          unit="°C"
          label="Temp"
          value={temp}
          icon={Thermometer}
          colorClass={getTemperatureColor(temp)}
          progress={{value: temp, max: 100, isTemp: true}}
        />
      )}

      {hasUsage && (
        <MetricItem
          unit="%"
          label="Usage"
          value={usage}
          icon={Activity}
          progress={{value: usage}}
          colorClass={getUsageColor(usage)}
        />
      )}
    </Section>
  );
}
