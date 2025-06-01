import React from 'react';

import {getProgressColor} from '../Utils';

const ProgressBar = ({value, max = 100, isTemp = false}: {value: number; max?: number; isTemp?: boolean}) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className={
          `h-full bg-gradient-to-r ${getProgressColor(isTemp ? value : percentage, isTemp)}` +
          ` rounded-full transition-all duration-700 ease-out`
        }
        style={{width: `${percentage}%`}}
      />
    </div>
  );
};
export default function MetricItem({
  icon: Icon,
  label,
  value,
  unit = '',
  progress,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  progress?: {value: number; max?: number; isTemp?: boolean};
  colorClass?: string;
}) {
  return (
    <div
      className={
        `flex items-center gap-x-2 px-3 py-2 rounded-lg border backdrop-blur-sm` +
        ` transition-all duration-300 hover:scale-105 hover:shadow-lg` +
        ` ${colorClass || 'text-slate-300 border-slate-600/30 bg-slate-800/40'}`
      }
      key={`${label}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
        <span className="opacity-80">{label}:</span>
        <span>
          {value}
          {unit}
        </span>
        {progress && <ProgressBar {...progress} />}
      </div>
    </div>
  );
}
