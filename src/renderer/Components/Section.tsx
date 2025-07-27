import {Spinner} from '@heroui/react';
import {isEmpty} from 'lodash';
import React from 'react';

import {useSystemMonitorState} from '../reducer';

export default function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  const compactMode = useSystemMonitorState('compactMode');
  const showSectionLabel = useSystemMonitorState('showSectionLabel');

  // Show loading instead of N/A for title
  return (
    <div className={`flex items-center ${compactMode ? 'gap-x-2' : 'gap-x-3'}`}>
      {showSectionLabel && (
        <div
          className={
            `flex items-center ${compactMode ? 'gap-x-1.5 px-1.5 py-0.5' : 'gap-x-2 px-2 py-1'}` +
            ` rounded-md bg-slate-700/50 border border-slate-600/30`
          }>
          <Icon className={`${compactMode ? 'size-3' : 'size-3.5'} text-slate-400`} />
          {isEmpty(title) ? (
            <Spinner size="sm" variant={'dots'} />
          ) : (
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide text-nowrap">{title}</span>
          )}
        </div>
      )}
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
}
