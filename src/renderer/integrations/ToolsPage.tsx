import {useOverlayState} from '@heroui/react';
import {ToolsCard} from '@lynx/components/ToolsCard';
import {CpuBoltIcon} from '@solar-icons/react/bold-duotone';

import SettingsModal from '../components/settings/SettingsModal';

/**
 * Renders a card on the LynxHub "Tools" page that allows users
 * to open the hardware monitor settings.
 */
export function HardwareMonitorCard() {
  const state = useOverlayState();

  return (
    <>
      <SettingsModal state={state} />
      <ToolsCard
        onPress={state.open}
        id="hardware-monitor"
        title="Hardware Monitor"
        icon={<CpuBoltIcon className="size-full m-1 text-indigo-500" />}
        description="Configure real-time monitoring of CPU, GPU, and Memory usage in the status bar."
      />
    </>
  );
}

export default HardwareMonitorCard;
