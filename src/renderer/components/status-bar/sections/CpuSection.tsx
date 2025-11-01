import {Activity, Cpu as CpuIcon, Thermometer} from 'lucide-react';
import {memo, useMemo} from 'react';

import {CpuData, HardwareMetricsConfig} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {getTemperatureColor, getUsageColor} from '../../../utils/colorUtils';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type Props = {
  data: CpuData | undefined;
  metrics: HardwareMetricsConfig;
};

function CpuSection({data, metrics}: Props) {
  const compactMode = useHMonitorState('compactMode');
  const {temp, usage, name} = data || {temp: 0, usage: 0, name: ''};

  const hasTemp = useMemo(() => metrics.enabled.includes('temp'), [metrics.enabled]);
  const hasUsage = useMemo(() => metrics.enabled.includes('usage'), [metrics.enabled]);

  return (
    <Section title={name} icon={CpuIcon}>
      {hasTemp &&
        (temp > 0 ? (
          <MetricItem
            unit="°C"
            label="Temp"
            value={temp}
            icon={Thermometer}
            colorClass={getTemperatureColor(temp)}
            progress={{value: temp, max: 100, isTemp: true}}
          />
        ) : (
          // Special case for when temperature could not be read (e.g., needs admin rights)
          <MetricItem value="" label="Temp" icon={Thermometer}>
            <Thermometer className={`${compactMode ? 'size-3' : 'size-4'} shrink-0 text-danger`} />
            <span className="text-xs font-medium text-danger whitespace-nowrap">Admin Required</span>
          </MetricItem>
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
export default memo(CpuSection);
