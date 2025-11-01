import {ElementType, memo, ReactNode} from 'react';

import {useHMonitorState} from '../../state/hmonitorSlice';
import {getProgressColor} from '../../utils/colorUtils';

type ProgressBarProps = {
  value: number;
  max?: number;
  isTemp?: boolean;
};

const ProgressBar = memo(({value, max = 100, isTemp = false}: ProgressBarProps) => {
  const compactMode = useHMonitorState('compactMode');
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`${compactMode ? 'w-8 h-1' : 'w-12 h-1.5'} bg-white/10 rounded-full overflow-hidden`}>
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

function MetricItem({icon: Icon, label, value, unit = '', progress, colorClass, children}: MetricItemProps) {
  const compactMode = useHMonitorState('compactMode');
  const metricVisibility = useHMonitorState('metricVisibility');

  if (children) {
    return (
      <div
        className={
          `flex items-center ${compactMode ? 'px-2 py-0.5 gap-x-1.5' : 'px-3 py-2 gap-x-2'} rounded-lg border` +
          ` backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg text-slate-300 ` +
          `border-slate-600/30 bg-slate-800/40`
        }>
        {children}
      </div>
    );
  }

  return (
    <div
      className={
        `flex items-center ${compactMode ? 'px-2 py-0.5 gap-x-1.5' : 'px-3 py-2 gap-x-2'} rounded-lg` +
        ` border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg` +
        ` ${colorClass || 'text-slate-300 border-slate-600/30 bg-slate-800/40'}`
      }>
      {metricVisibility.icon && <Icon className={`${compactMode ? 'size-3' : 'size-4'} shrink-0`} />}
      <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
        {metricVisibility.label && <span className="opacity-80">{label}:</span>}
        {metricVisibility.value && (
          <span>
            {value}
            {unit}
          </span>
        )}
        {progress && metricVisibility.progressBar && <ProgressBar {...progress} />}
      </div>
    </div>
  );
}

export default memo(MetricItem);
