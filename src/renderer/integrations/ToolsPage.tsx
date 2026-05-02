import {useOverlayState} from '@heroui-v3/react';
import {ToolsCard} from '@lynx/components/ToolsCard';

import SettingsModal from '../components/settings/SettingsModal';

const CARD_PROPS = {
  title: 'Hardware Monitor',
  description: 'Configure real-time monitoring of CPU, GPU, and Memory usage in the status bar.',
  icon: 'https://raw.githubusercontent.com/KindaBrazy/LynxHub-Hardware-Monitor/refs/heads/metadata/icon.png',
};

/**
 * Renders a card on the LynxHub "Tools" page that allows users
 * to open the hardware monitor settings.
 */
export default function ToolsPage() {
  const state = useOverlayState();

  return (
    <>
      <SettingsModal state={state} />
      <ToolsCard {...CARD_PROPS} onPress={state.open} />
    </>
  );
}
