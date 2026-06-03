import {Activity, Clock} from 'lucide-react';
import {memo, useMemo} from 'react';

import {UptimeData} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import {formatUptime} from '../../../utils/formatUtils';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type Props = {
  data: UptimeData;
  metrics: {system: boolean; app: boolean};
};

function UpTimeSection({data, metrics}: Props) {
  const uptimeOrder = useHMonitorState('uptimeOrder') || ['uptimeSystem', 'uptimeApp'];
  const {hasApp, hasSystem} = useMemo(() => ({hasApp: metrics.app, hasSystem: metrics.system}), [metrics]);

  const items = useMemo(() => {
    return uptimeOrder.map(item => {
      if (item === 'uptimeSystem' && hasSystem) {
        return <MetricItem key="system" icon={Clock} label="System" value={formatUptime(data.system || 0)} />;
      }
      if (item === 'uptimeApp' && hasApp) {
        return <MetricItem key="app" label="App" icon={Activity} value={formatUptime(data.app || 0)} />;
      }
      return null;
    });
  }, [uptimeOrder, hasSystem, hasApp, data]);

  return (
    <Section icon={Clock} title="Uptime">
      {items}
    </Section>
  );
}

export default memo(UpTimeSection);
