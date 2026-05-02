import {Link, Separator} from '@heroui-v3/react';
import ShinyText from '@lynx/components/ShinyText';
import {useAppState} from '@lynx/redux/reducers/app';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {memo, ReactNode, useMemo} from 'react';

import useHardwareData from '../../hooks/useHardwareData';
import useScrollManager from '../../hooks/useScrollManager';
import {useHMonitorState} from '../../state/hmonitorSlice';
import CpuSection from './sections/CpuSection';
import GpuSection from './sections/GpuSection';
import MemorySection from './sections/MemorySection';
import NetworkSection from './sections/NetworkSection';
import UptimeSection from './sections/UptimeSection';

function HardwareStatusBar() {
  const enabled = useHMonitorState('enabled');
  const displayStyle = useHMonitorState('displayStyle');
  const enabledMetrics = useHMonitorState('enabledMetrics');
  const availableHardware = useHMonitorState('availableHardware');

  const darkMode = useAppState('darkMode');

  const {hardwareData, isConnected, error} = useHardwareData();
  const {containerRef, canScrollLeft, canScrollRight, scroll} = useScrollManager<HTMLDivElement>();

  // Combine the forwarded ref from the host app with our internal ref.
  const initRef = (node: HTMLDivElement) => {
    if (node) containerRef(node);
  };

  const hasMetricsEnabled = useMemo(() => {
    if (!enabledMetrics) return {cpu: false, gpu: false, memory: false, network: false, uptime: false};
    return {
      gpu: enabledMetrics.gpu.some(item => item.active && (item.enabled.length > 0 || item.custom?.length > 0)),
      cpu: enabledMetrics.cpu.some(item => item.active && (item.enabled.length > 0 || item.custom?.length > 0)),
      memory: enabledMetrics.memory.some(item => item.active && (item.enabled.length > 0 || item.custom?.length > 0)),
      network: enabledMetrics.network.some(item => item.active && (item.enabled.length > 0 || item.custom?.length > 0)),
      uptime: enabledMetrics.uptime.system || enabledMetrics.uptime.app,
    };
  }, [enabledMetrics]);

  const errorElement = useMemo((): ReactNode => {
    if (!error) {
      return (
        <ShinyText
          speed={2}
          darkMode={darkMode}
          text="Waiting for hardware information..."
          className="font-semibold text-semi-muted text-sm"
        />
      );
    }
    if (error.message.includes('dotnet')) {
      return (
        <div className="text-sm">
          <span className="text-semi-muted">.NET 9.0 runtime not found. Please install it </span>
          <Link onPress={() => window.open('https://dotnet.microsoft.com/en-us/download/dotnet/9.0')}>Here</Link>
        </div>
      );
    }
    return <span className="text-warning">{"Couldn't load metrics. Please try restarting LynxHub."}</span>;
  }, [error]);

  if (!enabled) return null;

  const isSmallStyle = ['compact', 'raw'].includes(displayStyle);
  const isTwoColumn = ['two-column', 'raw-two-column'].includes(displayStyle);
  const heightClass = isSmallStyle ? 'h-7' : isTwoColumn ? 'h-13' : 'h-12';
  const buttonSizeClass = isSmallStyle ? 'size-5' : 'size-8';

  return (
    <div className={`relative ${heightClass} w-full bg-surface`}>
      {canScrollLeft && (
        <button
          className={
            `absolute left-2 top-1/2 -translate-y-1/2 z-10 ${buttonSizeClass}` +
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
            `absolute right-2 top-1/2 -translate-y-1/2 z-10 ${buttonSizeClass}` +
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
        className={`h-full flex items-center ${isSmallStyle ? 'px-2' : 'px-3'} gap-x-4 overflow-x-auto`}>
        {isConnected ? (
          <>
            {hasMetricsEnabled.cpu &&
              enabledMetrics.cpu.map(
                (cpu, index) =>
                  cpu.active && (
                    <CpuSection
                      metrics={cpu}
                      key={`cpu_${cpu.name}_${index}`}
                      rawSensorValues={hardwareData.rawSensors}
                      data={hardwareData.cpu.find(item => item.name === cpu.name)}
                      hardwareInfo={availableHardware.cpu.find(h => h.name === cpu.name)}
                    />
                  ),
              )}
            {(hasMetricsEnabled.gpu ||
              hasMetricsEnabled.memory ||
              hasMetricsEnabled.network ||
              hasMetricsEnabled.uptime) &&
              hasMetricsEnabled.cpu && <Separator className="my-2" orientation="vertical" />}

            {hasMetricsEnabled.gpu &&
              enabledMetrics.gpu.map(
                (gpu, index) =>
                  gpu.active && (
                    <GpuSection
                      metrics={gpu}
                      key={`gpu_${gpu.name}_${index}`}
                      rawSensorValues={hardwareData.rawSensors}
                      data={hardwareData.gpu.find(item => item.name === gpu.name)}
                      hardwareInfo={availableHardware.gpu.find(h => h.name === gpu.name)}
                    />
                  ),
              )}
            {(hasMetricsEnabled.memory || hasMetricsEnabled.network || hasMetricsEnabled.uptime) &&
              hasMetricsEnabled.gpu && <Separator className="my-2" orientation="vertical" />}

            {hasMetricsEnabled.memory &&
              enabledMetrics.memory.map(
                (memory, index) =>
                  memory.active && (
                    <MemorySection
                      metrics={memory}
                      key={`memory_${memory.name}_${index}`}
                      rawSensorValues={hardwareData.rawSensors}
                      data={hardwareData.memory.find(item => item.name === memory.name)}
                      hardwareInfo={availableHardware.memory.find(h => h.name === memory.name)}
                    />
                  ),
              )}
            {(hasMetricsEnabled.network || hasMetricsEnabled.uptime) && hasMetricsEnabled.memory && (
              <Separator className="my-2" orientation="vertical" />
            )}

            {hasMetricsEnabled.network &&
              enabledMetrics.network.map(
                (network, index) =>
                  network.active && (
                    <NetworkSection
                      metrics={network}
                      key={`network_${network.name}_${index}`}
                      rawSensorValues={hardwareData.rawSensors}
                      data={hardwareData.network.find(item => item.name === network.name)}
                      hardwareInfo={availableHardware.network.find(h => h.name === network.name)}
                    />
                  ),
              )}
            {hasMetricsEnabled.uptime && hasMetricsEnabled.network && (
              <Separator className="my-2" orientation="vertical" />
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
