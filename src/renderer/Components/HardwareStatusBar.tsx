import {HardwareReport} from '@lynxhub/hwmonitor';
import {Divider} from 'antd';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ReactNode, useEffect, useMemo, useState} from 'react';

import ShinyText from '../../../../src/renderer/src/App/Components/Reusable/ShinyText';
import {HMONITOR_IPC_DATA_ID} from '../../cross/CrossConst';
import {HardwareData} from '../../cross/CrossTypes';
import {useSystemMonitorState} from '../reducer';
import CpuSection from './Sections/CpuSection';
import GpuSection from './Sections/GpuSection';
import MemorySection from './Sections/MemorySection';
import UpTimeSection from './Sections/UpTimeSection';

type Props = {ref: (node: HTMLDivElement) => void};

const convertMBtoGB = (mb: number): number => {
  return Number((mb / 1024).toFixed(2));
};

const initialData: HardwareData = {
  gpu: [],
  cpu: [],
  memory: [],
  uptime: {
    system: 0,
    app: 0,
  },
};

const HardwareStatusBar = ({ref}: Props) => {
  const enabled = useSystemMonitorState('enabled');
  const compactMode = useSystemMonitorState('compactMode');
  const enabledMetrics = useSystemMonitorState('enabledMetrics');
  const [hardwareData, setHardwareData] = useState<HardwareData>(initialData);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const initRef = (node: HTMLDivElement) => {
    if (node) {
      ref(node);
      setContainerRef(node);
    }
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [dataConnected, setDataConnected] = useState(false);
  const [errorElement, setErrorElement] = useState<ReactNode>(
    <ShinyText speed={2} className="font-semibold" text="Waiting for hardware information..." />,
  );

  const updateScrollArrows = () => {
    if (!containerRef) return;
    const {scrollLeft, scrollWidth, clientWidth} = containerRef;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef) {
      containerRef.scrollBy({
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleHardwareUpdate = (_event: any, data: HardwareReport) => {
      if (data) {
        const cpu = data.CPU.map(item => {
          return {
            name: item.Name,
            temp:
              item.Sensors.find(sensor => sensor.Name === 'CPU Package' && sensor.Type === 'Temperature')?.Value || 0,
            usage: Math.round(
              item.Sensors.find(sensor => sensor.Name === 'CPU Total' && sensor.Type === 'Load')?.Value || 0,
            ),
          };
        });

        const gpu = data.GPU.map(item => {
          return {
            name: item.Name,
            temp: item.Sensors.find(sensor => sensor.Name === 'GPU Core' && sensor.Type === 'Temperature')?.Value || 0,
            usage: Math.round(
              item.Sensors.find(sensor => sensor.Name === 'D3D 3D' && sensor.Type === 'Load')?.Value || 0,
            ),
            totalVram: convertMBtoGB(
              item.Sensors.find(sensor => sensor.Name === 'GPU Memory Total' && sensor.Type === 'SmallData')?.Value ||
                0,
            ),
            usedVram: convertMBtoGB(
              item.Sensors.find(sensor => sensor.Name === 'GPU Memory Used' && sensor.Type === 'SmallData')?.Value || 0,
            ),
          };
        });

        const memory = data.Memory.map(item => {
          const used = Math.round(
            item.Sensors.find(sensor => sensor.Name === 'Memory Used' && sensor.Type === 'Data')?.Value || 0,
          );
          const available = Math.round(
            item.Sensors.find(sensor => sensor.Name === 'Memory Available' && sensor.Type === 'Data')?.Value || 0,
          );
          return {
            name: item.Name,
            used,
            available,
            total: Math.round(used + available),
          };
        });

        const uptimeSeconds = data.ElapsedTime?.rawSeconds || 0;
        const uptimeSystemSeconds = data.Uptime?.rawSeconds || 0;
        const uptime = {system: uptimeSystemSeconds, app: uptimeSeconds};

        const result: HardwareData = {
          gpu,
          cpu,
          memory,
          uptime,
        };

        setHardwareData(result);
        setDataConnected(true);
      }
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
    if (!enabledMetrics) {
      setErrorElement(<span className="">{"Couldn't load metrics settings. Please restart LynxHub."}</span>);
      return {hasCpuSection: false, hasGpuSection: false, hasMemory: false, hasUptime: false};
    }

    const hasGpuSection = enabledMetrics.gpu.some(
      item =>
        item.active &&
        (item.enabled.includes('temp') || item.enabled.includes('usage') || item.enabled.includes('vram')),
    );
    const hasCpuSection = enabledMetrics.cpu.some(
      item => item.active && (item.enabled.includes('temp') || item.enabled.includes('usage')),
    );
    const hasMemory = enabledMetrics.memory.some(item => item.active && item.enabled.includes('memory'));

    const hasUptime = enabledMetrics.uptime.system || enabledMetrics.uptime.app;

    return {hasCpuSection, hasGpuSection, hasMemory, hasUptime};
  }, [enabledMetrics]);

  useEffect(() => {
    if (containerRef) {
      const handleWheel = event => {
        if (!event.ctrlKey) {
          event.preventDefault();
          // noinspection JSSuspiciousNameCombination
          containerRef.scrollLeft += event.deltaY;
        }
      };

      containerRef.addEventListener('wheel', handleWheel);

      return () => {
        containerRef.removeEventListener('wheel', handleWheel);
      };
    }

    return () => {};
  }, [containerRef]);

  if (!enabled) return null;

  return (
    <div
      className={
        `relative ${compactMode ? 'h-7' : 'h-12'} w-full bg-gradient-to-r from-slate-900/95 ` +
        'to-slate-800/95 border-t border-slate-700/50 backdrop-blur-sm'
      }>
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
        ref={initRef}
        onScroll={updateScrollArrows}
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        className={`h-full flex items-center ${compactMode ? 'px-2' : 'px-3'} gap-x-4 overflow-x-auto scrollbar-hide`}>
        {dataConnected ? (
          <>
            {hasCpuSection &&
              enabledMetrics.cpu.map((cpu, index) => (
                <CpuSection
                  metrics={cpu}
                  key={`hardware_${cpu.name}_${index}`}
                  data={hardwareData.cpu.find(item => item.name === cpu.name)}
                />
              ))}
            {(hasGpuSection || hasMemory || hasUptime) && hasCpuSection && <Divider type="vertical" className="mx-0" />}

            {hasGpuSection &&
              enabledMetrics.gpu.map((gpu, index) => (
                <GpuSection
                  metrics={gpu}
                  key={`hardware_${gpu.name}_${index}`}
                  data={hardwareData.gpu.find(item => item.name === gpu.name)}
                />
              ))}
            {(hasGpuSection || hasUptime) && hasMemory && <Divider type="vertical" className="mx-0" />}

            {hasMemory &&
              enabledMetrics.memory.map((memory, index) => (
                <MemorySection
                  key={`hardware_${memory.name}_${index}`}
                  data={hardwareData.memory.find(item => item.name === memory.name)}
                />
              ))}
            {(hasGpuSection || hasMemory) && hasUptime && <Divider type="vertical" className="mx-0" />}

            {hasUptime && <UpTimeSection data={hardwareData.uptime} metrics={enabledMetrics.uptime} />}
          </>
        ) : (
          <div className="w-full text-center">{errorElement}</div>
        )}
      </div>
    </div>
  );
};

export default HardwareStatusBar;
