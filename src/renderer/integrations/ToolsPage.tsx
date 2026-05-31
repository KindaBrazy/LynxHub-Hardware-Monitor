import {useOverlayState} from '@heroui/react';
import {ToolsCard} from '@lynx/components/ToolsCard';
import {CpuBolt} from '@solar-icons/react-perf/BoldDuotone';

import SettingsModal from '../components/settings/SettingsModal';

/**
 * Renders a card on the LynxHub "Tools" page that allows users
 * to open the hardware monitor settings.
 */
export default function ToolsPage() {
  const state = useOverlayState();

  return (
    <>
      <SettingsModal state={state} />
      <ToolsCard
        onPress={state.open}
        title="Hardware Monitor"
        icon={<CpuBolt className="size-full m-1 text-indigo-500" />}
        description="Configure real-time monitoring of CPU, GPU, and Memory usage in the status bar."
      />
    </>
  );
}
