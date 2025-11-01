import {Database, Monitor, Thermometer, Zap} from 'lucide-react';
import {memo, useMemo} from 'react';

import {GpuData, HardwareMetricsConfig} from '../../../../cross/types';
import {getTemperatureColor, getUsageColor} from '../../../utils/colorUtils';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type Props = {
  data: GpuData | undefined;
  metrics: HardwareMetricsConfig;
};

function GpuSection({data, metrics}: Props) {
  const {temp, usage, name, totalVram, usedVram} = data || {temp: 0, usage: 0, name: '', totalVram: 0, usedVram: 0};

  const hasTemp = useMemo(() => metrics.enabled.includes('temp'), [metrics.enabled]);
  const hasUsage = useMemo(() => metrics.enabled.includes('usage'), [metrics.enabled]);
  const hasVram = useMemo(() => metrics.enabled.includes('vram'), [metrics.enabled]);

  const vramPercentage = useMemo(() => (totalVram > 0 ? (usedVram / totalVram) * 100 : 0), [totalVram, usedVram]);

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
          value={`${usedVram.toFixed(1)}/${Math.round(totalVram)}GB`}
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

export default memo(GpuSection);
