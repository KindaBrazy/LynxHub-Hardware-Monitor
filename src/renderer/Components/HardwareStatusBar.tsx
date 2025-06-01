import {Divider} from 'antd';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {RefObject, useEffect, useMemo, useState} from 'react';

import {HMONITOR_IPC_DATA_ID} from '../../cross/CrossConst';
import {HardwareData} from '../../cross/CrossTypes';
import {useHMonitorState} from '../reducer';
import CpuSection from './Sections/CpuSection';
import GpuSection from './Sections/GpuSection';
import MemorySection from './Sections/MemorySection';
import UpTimeSection from './Sections/UpTimeSection';

type Props = {ref: RefObject<HTMLDivElement | null>};

const HardwareStatusBar = ({ref}: Props) => {
  const compactMode = useHMonitorState('compactMode');
  const enableMonitor = useHMonitorState('enableMonitor');
  const [hardwareData, setHardwareData] = useState<HardwareData>({
    cpuTemp: 0,
    cpuUsage: 0,
    gpuTemp: 0,
    gpuUsage: 0,
    memUsed: 0,
    memTotal: 16,
    uptimeSystemSeconds: 0,
    uptimeSeconds: 0,
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [dataConnected, setDataConnected] = useState(true);

  const updateScrollArrows = () => {
    if (!ref.current) return;
    const container = ref.current;
    const {scrollLeft, scrollWidth, clientWidth} = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleHardwareUpdate = (_event: any, data: typeof hardwareData) => {
      setHardwareData(data);
      setDataConnected(true);
    };

    window.electron.ipcRenderer.on(HMONITOR_IPC_DATA_ID, handleHardwareUpdate);

    return () => {
      window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_DATA_ID);
    };
  }, []);

  useEffect(() => {
    updateScrollArrows();
    const handleResize = () => updateScrollArrows();

    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hardwareData]);

  const {hasCpuSection, hasMemory, hasUptime, hasGpuSection} = useMemo(() => {
    const hasCpuSection = enableMonitor.includes('cpuTemp') || enableMonitor.includes('cpuUsage');
    const hasGpuSection = enableMonitor.includes('gpuTemp') || enableMonitor.includes('gpuUsage');

    const hasMemory = enableMonitor.includes('memory');

    const hasUptime = enableMonitor.includes('uptimeSeconds') || enableMonitor.includes('uptimeSystemSeconds');

    return {hasCpuSection, hasGpuSection, hasMemory, hasUptime};
  }, [enableMonitor]);

  return (
    <div
      className={
        `relative ${compactMode ? 'h-7' : 'h-12'} w-full bg-gradient-to-r from-slate-900/95 ` +
        'to-slate-800/95 border-t border-slate-700/50 backdrop-blur-sm'
      }>
      {/* Connection Status */}
      {!dataConnected && (
        <div
          className={
            'absolute top-2 right-4 z-20 flex items-center gap-x-1 px-2 py-1' +
            ' rounded-md bg-amber-900/30 border border-amber-600/30'
          }>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-xs text-amber-400 font-medium">No Data</span>
        </div>
      )}

      {/* Scroll Arrows */}
      {canScrollLeft && (
        <button
          className={
            `absolute left-2 top-1/2 -translate-y-1/2 z-10 ${compactMode ? 'size-5' : 'size-8'} rounded-full` +
            ' bg-slate-800/80 border border-slate-600/50 flex items-center' +
            ' justify-center hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm'
          }
          onClick={() => scroll('left')}>
          <ChevronLeft className="size-4 text-slate-300" />
        </button>
      )}

      {canScrollRight && (
        <button
          className={
            `absolute right-2 top-1/2 -translate-y-1/2 z-10 ${compactMode ? 'size-5' : 'size-8'} rounded-full` +
            ' bg-slate-800/80 border border-slate-600/50 flex items-center' +
            ' justify-center hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm'
          }
          onClick={() => scroll('right')}>
          <ChevronRight className="size-4 text-slate-300" />
        </button>
      )}

      <div
        ref={ref}
        onScroll={updateScrollArrows}
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        className={`h-full flex items-center ${compactMode ? 'px-2' : 'px-3'} gap-x-4 overflow-x-auto scrollbar-hide`}>
        {hasCpuSection && <CpuSection data={hardwareData} />}
        {(hasGpuSection || hasMemory || hasUptime) && <Divider type="vertical" className="mx-0" />}

        {hasGpuSection && <GpuSection data={hardwareData} />}
        {(hasMemory || hasUptime) && <Divider type="vertical" className="mx-0" />}

        {hasMemory && <MemorySection data={hardwareData} />}
        {hasUptime && <Divider type="vertical" className="mx-0" />}

        {hasUptime && <UpTimeSection data={hardwareData} />}
      </div>
    </div>
  );
};

export default HardwareStatusBar;
