import {Button, Card, Image} from '@heroui/react';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {useTabsState} from '../../../../src/renderer/src/App/Redux/Reducer/TabsReducer';
import {useCachedImageUrl} from '../../../../src/renderer/src/App/Utils/LocalStorage';
import {systemMonitorActions} from '../reducer';
import {Settings_Icon} from '../SvgIcons';

const iconUrl: string =
  'https://raw.githubusercontent.com/KindaBrazy/LynxHub-Hardware-Monitor/refs/heads/source_ea/resources/icon.png';

export default function ToolsPage() {
  const iconSrc = useCachedImageUrl(`hwmonitor_card_icon`, iconUrl);

  const activeTab = useTabsState('activeTab');
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    dispatch(systemMonitorActions.openModal({tabID: activeTab}));
  }, [activeTab]);

  return (
    <>
      <Card
        className={
          'w-[276px] h-[367px] relative group transform cursor-default border-1 border-foreground/10 ' +
          'transition-all duration-300 hover:-translate-y-1 shadow-small hover:shadow-medium'
        }
        as={'div'}
        isPressable>
        {/* Background with gradient overlay */}
        <div className={'absolute inset-0 rounded-2xl bg-white dark:bg-stone-900'} />

        {/* Content container */}
        <div className="relative h-full flex flex-col justify-between p-6">
          {/* Icon section */}
          <div className="mt-2 flex justify-center">
            {iconSrc && <Image src={iconSrc} radius="none" className="size-20" />}
          </div>

          {/* Title and Description */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold tracking-tight">Hardware Monitor</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              A configurable and real-time monitoring of CPU, GPU, and Memory usage, displayed conveniently in the
              status bar.
            </p>
          </div>

          {/* Play button */}
          <div className="flex justify-center">
            <Button
              radius="full"
              color="primary"
              onPress={openModal}
              startContent={<Settings_Icon className="size-4" />}
              fullWidth>
              Settings
            </Button>
          </div>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />

        {/* Hover glow effect */}
        <div
          className={
            'absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-transparent opacity-0' +
            ' group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
          }
        />
      </Card>
    </>
  );
}
