import {Database, Monitor, Thermometer, Zap} from 'lucide-react';
import {useMemo} from 'react';

import {GpuData} from '../../../cross/CrossTypes';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getTemperatureColor, getUsageColor} from '../Utils';

type Props = {
  data: GpuData | undefined;
  metrics: {
    name: string;
    enabled: string[];
  };
};

export default function GpuSection({data, metrics}: Props) {
  const {hasTemp, hasUsage, hasVram} = useMemo(() => {
    const hasTemp = metrics.enabled.includes('temp');
    const hasUsage = metrics.enabled.includes('usage');
    const hasVram = metrics.enabled.includes('vram');
    return {hasTemp, hasUsage, hasVram};
  }, [metrics]);

  const {temp, usage, name, totalVram, usedVram} = useMemo(
    () => ({
      temp: data?.temp || 0,
      usage: data?.usage || 0,
      name: data?.name || 'N/A',
      totalVram: data?.totalVram || 0,
      usedVram: data?.usedVram || 0,
    }),
    [data],
  );

  const vramPercentage = useMemo(() => {
    return totalVram > 0 ? (usedVram / totalVram) * 100 : 0;
  }, [totalVram, usedVram]);

  return (
    <Section title={name} icon={Monitor}>
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

      {hasVram && (
        <MetricItem
          label="VRAM"
          icon={Database}
          progress={{value: vramPercentage}}
          colorClass={getUsageColor(vramPercentage)}
          value={`${usedVram.toFixed(1)}/${Math.round(usedVram)}GB`}
        />
      )}

      {hasUsage && (
        <MetricItem
          unit="%"
          icon={Zap}
          label="Usage"
          value={usage}
          progress={{value: usage}}
          colorClass={getUsageColor(usage)}
        />
      )}
    </Section>
  );
}
