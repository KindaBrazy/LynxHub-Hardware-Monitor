import {Activity, Clock} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import {useSystemMonitorState} from '../../reducer';
import MetricItem from '../MetricItem';
import Section from '../Section';

const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

type Props = {data: HardwareData};

export default function UpTimeSection({data}: Props) {
  const enabledMetrics = useSystemMonitorState('enabledMetrics');

  const {upApp, upSystem} = useMemo(() => {
    const upApp = enabledMetrics.includes('uptimeSeconds');
    const upSystem = enabledMetrics.includes('uptimeSystemSeconds');
    return {upApp, upSystem};
  }, [enabledMetrics]);

  return (
    <Section icon={Clock} title="Uptime">
      {upSystem && <MetricItem icon={Clock} label="System" value={formatUptime(data.uptimeSystemSeconds)} />}
      {upApp && <MetricItem label="App" icon={Activity} value={formatUptime(data.uptimeSeconds)} />}
    </Section>
  );
}
