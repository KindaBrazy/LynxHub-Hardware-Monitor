import {HardDrive, MemoryStick} from 'lucide-react';
import {memo, useMemo} from 'react';

import {MemoryData} from '../../../../cross/types';
import {getUsageColor} from '../../../utils/colorUtils';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type Props = {
  data: MemoryData | undefined;
};

function MemorySection({data}: Props) {
  const {name, used, total} = data || {name: '', used: 0, total: 0};
  const memPercentage = useMemo(() => (total > 0 ? (used / total) * 100 : 0), [total, used]);

  return (
    <Section title={name} icon={MemoryStick}>
      <MetricItem
        label="RAM"
        icon={HardDrive}
        progress={{value: memPercentage}}
        colorClass={getUsageColor(memPercentage)}
        value={`${used.toFixed(1)}/${total.toFixed(1)}GB`}
      />
    </Section>
  );
}

export default memo(MemorySection);
