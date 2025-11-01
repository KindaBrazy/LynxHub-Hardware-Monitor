import {Link} from '@heroui/react';
import {Divider} from 'antd';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {memo, ReactNode, useMemo} from 'react';

import ShinyText from '../../../../../src/renderer/src/App/Components/Reusable/ShinyText';
import useHardwareData from '../../hooks/useHardwareData';
import useScrollManager from '../../hooks/useScrollManager';
import {useHMonitorState} from '../../state/hmonitorSlice';
import CpuSection from './sections/CpuSection';
import GpuSection from './sections/GpuSection';
import MemorySection from './sections/MemorySection';
import UptimeSection from './sections/UptimeSection';

type Props = {ref: (node: HTMLDivElement) => void};

function HardwareStatusBar({ref: forwardRef}: Props) {
  const enabled = useHMonitorState('enabled');
  const compactMode = useHMonitorState('compactMode');
  const enabledMetrics = useHMonitorState('enabledMetrics');

  const {hardwareData, isConnected, error} = useHardwareData();
  const {containerRef, canScrollLeft, canScrollRight, scroll} = useScrollManager<HTMLDivElement>();

  // Combine the forwarded ref from the host app with our internal ref.
  const initRef = (node: HTMLDivElement) => {
    if (node) {
      forwardRef(node);
      containerRef(node);
    }
  };

  const hasMetricsEnabled = useMemo(() => {
    if (!enabledMetrics) return {cpu: false, gpu: false, memory: false, uptime: false};
    return {
      gpu: enabledMetrics.gpu.some(item => item.active && item.enabled.length > 0),
      cpu: enabledMetrics.cpu.some(item => item.active && item.enabled.length > 0),
      memory: enabledMetrics.memory.some(item => item.active && item.enabled.length > 0),
      uptime: enabledMetrics.uptime.system || enabledMetrics.uptime.app,
    };
  }, [enabledMetrics]);

  const errorElement = useMemo((): ReactNode => {
    if (!error) {
      return <ShinyText speed={2} className="font-semibold" text="Waiting for hardware information..." />;
    }
    if (error.message.includes('dotnet')) {
      return (
        <div>
          <span>.NET 8 runtime not found. Please install it </span>
          <Link
            className="cursor-pointer"
            onPress={() => window.open('https://dotnet.microsoft.com/download/dotnet/8.0')}>
            Here
          </Link>
        </div>
      );
    }
    return <span className="text-warning">{"Couldn't load metrics. Please try restarting LynxHub."}</span>;
  }, [error]);

  if (!enabled) return null;

  return (
    <div
      className={
        `relative ${compactMode ? 'h-7' : 'h-12'} w-full bg-linear-to-r from-slate-900/95` +
        ` to-slate-800/95 border-t border-slate-700/50 backdrop-blur-sm`
      }>
      {canScrollLeft && (
        <button
          className={
            `absolute left-2 top-1/2 -translate-y-1/2 z-10 ${compactMode ? 'size-5' : 'size-8'}` +
            ` rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center` +
            ` justify-center hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm`
          }
          onClick={() => scroll('left')}>
          <ChevronLeft className="size-4 text-slate-300" />
        </button>
      )}

      {canScrollRight && (
        <button
          className={
            `absolute right-2 top-1/2 -translate-y-1/2 z-10 ${compactMode ? 'size-5' : 'size-8'}` +
            ` rounded-full bg-slate-800/80 border border-slate-600/50 flex items-center` +
            ` justify-center hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm`
          }
          onClick={() => scroll('right')}>
          <ChevronRight className="size-4 text-slate-300" />
        </button>
      )}

      <div
        ref={initRef}
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        className={`h-full flex items-center ${compactMode ? 'px-2' : 'px-3'} gap-x-4 overflow-x-auto`}>
        {isConnected ? (
          <>
            {hasMetricsEnabled.cpu &&
              enabledMetrics.cpu.map(
                (cpu, index) =>
                  cpu.active && (
                    <CpuSection
                      metrics={cpu}
                      key={`cpu_${cpu.name}_${index}`}
                      data={hardwareData.cpu.find(item => item.name === cpu.name)}
                    />
                  ),
              )}
            {(hasMetricsEnabled.gpu || hasMetricsEnabled.memory || hasMetricsEnabled.uptime) &&
              hasMetricsEnabled.cpu && <Divider type="vertical" className="mx-0" />}

            {hasMetricsEnabled.gpu &&
              enabledMetrics.gpu.map(
                (gpu, index) =>
                  gpu.active && (
                    <GpuSection
                      metrics={gpu}
                      key={`gpu_${gpu.name}_${index}`}
                      data={hardwareData.gpu.find(item => item.name === gpu.name)}
                    />
                  ),
              )}
            {(hasMetricsEnabled.gpu || hasMetricsEnabled.uptime) && hasMetricsEnabled.memory && (
              <Divider type="vertical" className="mx-0" />
            )}

            {hasMetricsEnabled.memory &&
              enabledMetrics.memory.map(
                (memory, index) =>
                  memory.active && (
                    <MemorySection
                      key={`memory_${memory.name}_${index}`}
                      data={hardwareData.memory.find(item => item.name === memory.name)}
                    />
                  ),
              )}
            {(hasMetricsEnabled.gpu || hasMetricsEnabled.memory) && hasMetricsEnabled.uptime && (
              <Divider type="vertical" className="mx-0" />
            )}

            {hasMetricsEnabled.uptime && <UptimeSection data={hardwareData.uptime} metrics={enabledMetrics.uptime} />}
          </>
        ) : (
          <div className="w-full text-center">{errorElement}</div>
        )}
      </div>
    </div>
  );
}

export default memo(HardwareStatusBar);
