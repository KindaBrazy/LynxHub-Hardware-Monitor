import {HardDrive, MemoryStick} from 'lucide-react';
import {useMemo} from 'react';

import {MemoryData} from '../../../cross/CrossTypes';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getUsageColor} from '../Utils';

type Props = {
  data: MemoryData | undefined;
};

export default function MemorySection({data}: Props) {
  const {name, used, total} = useMemo(
    () => ({
      total: data?.total || 0,
      used: data?.used || 0,
      name: data?.name || '',
    }),
    [data],
  );

  const memPercentage = useMemo(() => {
    return total > 0 ? (used / total) * 100 : 0;
  }, [total, used]);

  return (
    <Section title={name} icon={MemoryStick}>
      <MetricItem
        label="RAM"
        icon={HardDrive}
        progress={{value: memPercentage}}
        value={`${used.toFixed(1)}/${total}GB`}
        colorClass={getUsageColor(memPercentage)}
      />
    </Section>
  );
}
