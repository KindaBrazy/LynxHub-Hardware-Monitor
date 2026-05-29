import {ElementType, memo, ReactNode, useMemo} from 'react';

import {useHMonitorState} from '../../state/hmonitorSlice';
import {getProgressColor} from '../../utils/colorUtils';

type ProgressBarProps = {
  value: number;
  max?: number;
  isTemp?: boolean;
};

const ProgressBar = memo(({value, max = 100, isTemp = false}: ProgressBarProps) => {
  const displayStyle = useHMonitorState('displayStyle');
  const isTwoColumn = displayStyle === 'two-column';
  const isCompact = ['compact', 'two-column'].includes(displayStyle);
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={`${isTwoColumn ? 'w-7' : isCompact ? 'w-8' : 'w-12'} ${
        isCompact ? 'h-1' : 'h-1.5'
      } bg-white/10 rounded-full overflow-hidden shrink-0`}>
      <div
        className={
          `h-full bg-linear-to-r ${getProgressColor(isTemp ? value : percentage, isTemp)}` +
          ` rounded-full transition-all duration-700 ease-out`
        }
        style={{width: `${percentage}%`}}
      />
    </div>
  );
});
ProgressBar.displayName = 'ProgressBar';

type MetricItemProps = {
  icon: ElementType;
  label: string;
  value: string | number;
  unit?: string;
  progress?: {value: number; max?: number; isTemp?: boolean};
  colorClass?: string;
  children?: ReactNode;
};

const MetricItem = memo(({icon: Icon, label, value, unit = '', progress, colorClass, children}: MetricItemProps) => {
  const displayStyle = useHMonitorState('displayStyle');
  const metricVisibility = useHMonitorState('metricVisibility');

  const isRaw = ['raw', 'raw-two-column'].includes(displayStyle);
  const isTwoColumn = displayStyle === 'two-column';
  const isCompact = ['compact', 'two-column'].includes(displayStyle);

  const renderProgress = useMemo(() => {
    if (!progress || !metricVisibility.progressBar) return null;

    const max = progress.max || 100;
    const progressValue = Math.min(progress.value, max);

    return <ProgressBar {...progress} value={progressValue} />;
  }, [progress, metricVisibility]);

  if (isRaw) {
    return (
      <span>
        {label}:{value}
        {unit}
      </span>
    );
  }

  if (children) {
    return (
      <div
        className={
          `flex items-center ${isCompact ? 'px-2 py-0.5 gap-x-1.5' : 'px-3 py-2 gap-x-2'} ${
            isTwoColumn ? 'h-5 min-w-0' : ''
          } rounded-lg border` +
          ` backdrop-blur-sm transition-colors duration-200 text-foreground ` +
          `bg-surface border-surface-secondary`
        }>
        {children}
      </div>
    );
  }

  return (
    <div
      className={
        `flex items-center ${isCompact ? 'px-2 py-0.5 gap-x-1.5' : 'px-3 py-2 gap-x-2'} ${
          isTwoColumn ? 'h-5 min-w-0' : ''
        } rounded-lg` +
        ` border backdrop-blur-sm transition-colors duration-200` +
        ` ${colorClass || 'text-semi-muted bg-surface border-surface-secondary'}`
      }>
      {metricVisibility.icon && <Icon className={`${isCompact ? 'size-3' : 'size-4'} shrink-0`} />}
      <div className={`flex items-center ${isTwoColumn ? 'gap-1.5 min-w-0' : 'gap-2'} text-xs font-medium`}>
        {metricVisibility.label && <span className="opacity-80 shrink-0">{label}:</span>}
        {metricVisibility.value && (
          <span className="shrink-0">
            {value}
            {unit}
          </span>
        )}
        {renderProgress}
      </div>
    </div>
  );
});

export default MetricItem;
