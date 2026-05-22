import {Link, Separator} from '@heroui/react';
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

// Static mapping configuration
const SECTIONS_CONFIG = [
  {type: 'cpu', Component: CpuSection},
  {type: 'gpu', Component: GpuSection},
  {type: 'memory', Component: MemorySection},
  {type: 'network', Component: NetworkSection},
] as const;

// Helper to determine active metrics inside a hardware type
const isSectionActive = (items?: any[]) => {
  if (!items) return false;
  return items.some(item => item.active && (item.enabled?.length > 0 || item.custom?.length > 0));
};

function HardwareStatusBar() {
  const enabled = useHMonitorState('enabled');
  const displayStyle = useHMonitorState('displayStyle');
  const enabledMetrics = useHMonitorState('enabledMetrics');
  const availableHardware = useHMonitorState('availableHardware');

  const darkMode = useAppState('darkMode');

  const {hardwareData, isConnected, error} = useHardwareData();
  const {containerRef, canScrollLeft, canScrollRight, scroll} = useScrollManager<HTMLDivElement>();

  const initRef = (node: HTMLDivElement) => {
    if (node) containerRef(node);
  };

  const hasMetricsEnabled = useMemo(() => {
    if (!enabledMetrics) {
      return {cpu: false, gpu: false, memory: false, network: false, uptime: false};
    }
    return {
      cpu: isSectionActive(enabledMetrics.cpu),
      gpu: isSectionActive(enabledMetrics.gpu),
      memory: isSectionActive(enabledMetrics.memory),
      network: isSectionActive(enabledMetrics.network),
      uptime: !!(enabledMetrics.uptime?.system || enabledMetrics.uptime?.app),
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
    if (error.message?.includes('dotnet')) {
      return (
        <div className="text-sm">
          <span className="text-semi-muted">.NET 10.0 runtime not found. Please install it </span>
          <Link onPress={() => window.open('https://dotnet.microsoft.com/en-us/download/dotnet/10.0')}>Here</Link>
        </div>
      );
    }
    return <span className="text-warning">{"Couldn't load metrics. Please try restarting LynxHub."}</span>;
  }, [error, darkMode]);

  // Build the list of active sections and inject separators
  const renderedElements = useMemo(() => {
    if (!isConnected || !hardwareData) return [];

    const elements: ReactNode[] = [];

    // 1. Process main modular hardware sections
    SECTIONS_CONFIG.forEach(({type, Component}) => {
      if (!hasMetricsEnabled[type]) return;

      const metricsList = enabledMetrics?.[type] || [];
      const hardwareDataList = hardwareData[type] || [];
      const availableList = availableHardware?.[type] || [];

      // Cast to generic ComponentType to avoid TS intersection mismatches
      const GenericComponent = Component as React.ComponentType<any>;

      metricsList.forEach((metric, index) => {
        if (!metric.active) return;

        const data = hardwareDataList.find((item: any) => item.name === metric.name);
        const hardwareInfo = availableList.find((h: any) => h.name === metric.name);

        if (!data && !hardwareInfo) return;

        elements.push(
          <GenericComponent
            data={data}
            metrics={metric}
            hardwareInfo={hardwareInfo}
            key={`${type}_${metric.name}_${index}`}
            rawSensorValues={hardwareData.rawSensors}
          />,
        );
      });
    });

    // 2. Process Uptime section (non-iterable)
    if (hasMetricsEnabled.uptime) {
      elements.push(<UptimeSection key="uptime" data={hardwareData.uptime} metrics={enabledMetrics.uptime} />);
    }

    // 3. Inject vertical separators dynamically between active elements
    return elements.reduce<ReactNode[]>((acc, element, index) => {
      if (index > 0) {
        acc.push(<Separator className="my-2" key={`sep_${index}`} orientation="vertical" />);
      }
      acc.push(element);
      return acc;
    }, []);
  }, [isConnected, hardwareData, enabledMetrics, availableHardware, hasMetricsEnabled]);

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
            ` rounded-full bg-surface-secondary border border-foreground/30 flex items-center` +
            ` justify-center hover:bg-surface-tertiary transition-all duration-200 backdrop-blur-sm`
          }
          onClick={() => scroll('left')}>
          <ChevronLeft className="size-4 text-foreground" />
        </button>
      )}

      {canScrollRight && (
        <button
          className={
            `absolute right-2 top-1/2 -translate-y-1/2 z-10 ${buttonSizeClass}` +
            ` rounded-full bg-surface-secondary border border-foreground/30 flex items-center` +
            ` justify-center hover:bg-surface-tertiary transition-all duration-200 backdrop-blur-sm`
          }
          onClick={() => scroll('right')}>
          <ChevronRight className="size-4 text-foreground" />
        </button>
      )}

      <div
        ref={initRef}
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
        className={`h-full flex items-center ${isSmallStyle ? 'px-2' : 'px-3'} gap-x-2 overflow-x-auto`}>
        {isConnected ? renderedElements : <div className="w-full text-center">{errorElement}</div>}
      </div>
    </div>
  );
}

export default memo(HardwareStatusBar);
