import {useAppState} from '@lynx/redux/reducers/app';
import {memo, ReactNode, useCallback, useEffect, useRef} from 'react';

import {HMONITOR_IPC_HIDE_FLYOUT, HMONITOR_IPC_SHOW_FLYOUT, HMONITOR_IPC_UPDATE_FLYOUT} from '../../../cross/constants';
import {HardwareFlyoutPayload, HardwareFlyoutSection} from '../../../cross/types';
import {useHMonitorState} from '../../state/hmonitorSlice';

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
  const enableHoverDetails = useHMonitorState('enableHoverDetails') ?? true;

  const handleMouseEnter = useCallback(() => {
    if (!enableHoverDetails) return;
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
  }, [section, payload, darkMode, enableHoverDetails]);

  const handleMouseLeave = useCallback(() => {
    if (!enableHoverDetails) return;
    isHoveredRef.current = false;
    window.electron.ipcRenderer.send(HMONITOR_IPC_HIDE_FLYOUT);
  }, [enableHoverDetails]);

  // When live telemetry updates while currently hovered, stream updates to the open flyout
  useEffect(() => {
    if (enableHoverDetails && isHoveredRef.current) {
      window.electron.ipcRenderer.send(HMONITOR_IPC_UPDATE_FLYOUT, {
        section,
        payload,
        darkMode,
      });
    }
  }, [payload, section, darkMode, enableHoverDetails]);

  useEffect(() => {
    if (!enableHoverDetails && isHoveredRef.current) {
      isHoveredRef.current = false;
      window.electron.ipcRenderer.send(HMONITOR_IPC_HIDE_FLYOUT);
    }
  }, [enableHoverDetails]);

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
        'inline-flex items-center ' +
        (enableHoverDetails
          ? `cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${className}`
          : `cursor-default ${className}`)
      }
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={enableHoverDetails ? 0 : -1}
      role={enableHoverDetails ? 'button' : undefined}>
      {children}
    </div>
  );
});

HardwareFlyoutTrigger.displayName = 'HardwareFlyoutTrigger';

export default HardwareFlyoutTrigger;
