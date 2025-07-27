import {Activity, Clock} from 'lucide-react';
import {useMemo} from 'react';

import {UptimeData} from '../../../cross/CrossTypes';
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

type Props = {
  data: UptimeData;
  metrics: {system: boolean; app: boolean};
};

export default function UpTimeSection({data, metrics}: Props) {
  const {hasApp, hasSystem} = useMemo(() => ({hasApp: metrics.app, hasSystem: metrics.system}), [metrics]);

  const {app, system} = useMemo(
    () => ({
      app: data?.app || 0,
      system: data?.system || 0,
    }),
    [data],
  );

  return (
    <Section icon={Clock} title="Uptime">
      {hasSystem && <MetricItem icon={Clock} label="System" value={formatUptime(system)} />}
      {hasApp && <MetricItem label="App" icon={Activity} value={formatUptime(app)} />}
    </Section>
  );
}
