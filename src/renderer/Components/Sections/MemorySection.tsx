import {HardDrive, MemoryStick} from 'lucide-react';
import {useMemo} from 'react';

import {HardwareData} from '../../../cross/CrossTypes';
import MetricItem from '../MetricItem';
import Section from '../Section';
import {getUsageColor} from '../Utils';

type Props = {data: HardwareData};

export default function MemorySection({data}: Props) {
  const memPercentage = useMemo(() => {
    return data.memTotal > 0 ? (data.memUsed / data.memTotal) * 100 : 0;
  }, [data]);

  return (
    <Section title="Memory" icon={MemoryStick}>
      <MetricItem
        label="RAM"
        icon={HardDrive}
        progress={{value: memPercentage}}
        colorClass={getUsageColor(memPercentage)}
        value={`${data.memUsed.toFixed(1)}/${data.memTotal}GB`}
      />
    </Section>
  );
}
