import {useAppState} from '@lynx/redux/reducers/app';
import {memo, ReactNode, useCallback, useEffect, useRef} from 'react';

import {HMONITOR_IPC_HIDE_FLYOUT, HMONITOR_IPC_SHOW_FLYOUT, HMONITOR_IPC_UPDATE_FLYOUT} from '../../../cross/constants';
import {HardwareFlyoutPayload, HardwareFlyoutSection} from '../../../cross/types';

type HardwareFlyoutTriggerProps = {
  children: ReactNode;
  section: HardwareFlyoutSection;
  payload: HardwareFlyoutPayload;
  className?: string;
};

const HardwareFlyoutTrigger = memo(({children, section, payload, className = ''}: HardwareFlyoutTriggerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const darkMode = useAppState('darkMode');

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    window.electron.ipcRenderer.send(HMONITOR_IPC_SHOW_FLYOUT, {
      section,
      anchor: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
      payload,
      darkMode,
    });
  }, [section, payload, darkMode]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    window.electron.ipcRenderer.send(HMONITOR_IPC_HIDE_FLYOUT);
  }, []);

  // When live telemetry updates while currently hovered, stream updates to the open flyout
  useEffect(() => {
    if (isHoveredRef.current) {
      window.electron.ipcRenderer.send(HMONITOR_IPC_UPDATE_FLYOUT, {
        section,
        payload,
        darkMode,
      });
    }
  }, [payload, section, darkMode]);

  useEffect(() => {
    return () => {
      if (isHoveredRef.current) {
        window.electron.ipcRenderer.send(HMONITOR_IPC_HIDE_FLYOUT);
      }
    };
  }, []);

  return (
    <div
      className={
        'inline-flex items-center cursor-pointer focus:outline-none ' +
        `focus-visible:ring-1 focus-visible:ring-accent ${className}`
      }
      tabIndex={0}
      role="button"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
});

HardwareFlyoutTrigger.displayName = 'HardwareFlyoutTrigger';

export default HardwareFlyoutTrigger;
