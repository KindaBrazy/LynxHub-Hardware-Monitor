import {Activity, Clock} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import {useHMonitorState} from '../../reducer';
import MetricItem from './MetricItem';
import Section from './Section';

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
  const enableMonitor = useHMonitorState('enableMonitor');

  const {upApp, upSystem} = useMemo(() => {
    const upApp = enableMonitor.includes('uptimeSeconds');
    const upSystem = enableMonitor.includes('uptimeSystemSeconds');
    return {upApp, upSystem};
  }, [enableMonitor]);

  return (
    <Section icon={Clock} title="Uptime">
      {upSystem && <MetricItem icon={Clock} label="System" value={formatUptime(data.uptimeSystemSeconds)} />}
      {upApp && <MetricItem label="App" icon={Activity} value={formatUptime(data.uptimeSeconds)} />}
    </Section>
  );
}
