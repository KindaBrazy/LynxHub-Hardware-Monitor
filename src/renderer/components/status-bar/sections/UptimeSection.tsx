import {Activity, Clock} from 'lucide-react';
import {memo, useMemo} from 'react';

import {UptimeData} from '../../../../cross/types';
import {formatUptime} from '../../../utils/formatUtils';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type Props = {
  data: UptimeData;
  metrics: {system: boolean; app: boolean};
};

function UpTimeSection({data, metrics}: Props) {
  const {hasApp, hasSystem} = useMemo(() => ({hasApp: metrics.app, hasSystem: metrics.system}), [metrics]);

  return (
    <Section icon={Clock} title="Uptime">
      {hasSystem && <MetricItem icon={Clock} label="System" value={formatUptime(data.system || 0)} />}
      {hasApp && <MetricItem label="App" icon={Activity} value={formatUptime(data.app || 0)} />}
    </Section>
  );
}

export default memo(UpTimeSection);
