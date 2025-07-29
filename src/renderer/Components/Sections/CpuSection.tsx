import {Activity, Cpu, Thermometer} from 'lucide-react';
import {useMemo} from 'react';

import {CpuData} from '../../../cross/CrossTypes';
import {useSystemMonitorState} from '../../reducer';
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
  const compactMode = useSystemMonitorState('compactMode');

  const {hasTemp, hasUsage} = useMemo(() => {
    const hasTemp = metrics.enabled.includes('temp');
    const hasUsage = metrics.enabled.includes('usage');
    return {hasTemp, hasUsage};
  }, [metrics]);

  const {temp, usage, name} = useMemo(
    () => ({temp: data?.temp || 0, usage: data?.usage || 0, name: data?.name || ''}),
    [data],
  );

  return (
    <Section icon={Cpu} title={name}>
      {hasTemp &&
        (temp === 0 ? (
          <div
            className={
              `flex items-center ${compactMode ? 'px-2 py-0.5 gap-x-1.5' : 'px-3 py-2 gap-x-2'} rounded-lg border` +
              ` backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg` +
              ` text-slate-300 border-slate-600/30 bg-slate-800/40`
            }>
            <Thermometer className={`${compactMode ? 'size-3' : 'size-4'} flex-shrink-0 text-danger`} />
            <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
              <span className="text-danger">Admin Require</span>
            </div>
          </div>
        ) : (
          <MetricItem
            unit="°C"
            label="Temp"
            value={temp}
            icon={Thermometer}
            colorClass={getTemperatureColor(temp)}
            progress={{value: temp, max: 100, isTemp: true}}
          />
        ))}

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
