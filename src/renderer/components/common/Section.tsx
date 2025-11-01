import {Spinner} from '@heroui/react';
import {isEmpty} from 'lodash';
import {ElementType, memo, ReactNode} from 'react';

import {useHMonitorState} from '../../state/hmonitorSlice';

type SectionProps = {
  title: string;
  icon: ElementType;
  children: ReactNode;
};

function Section({title, icon: Icon, children}: SectionProps) {
  const compactMode = useHMonitorState('compactMode');
  const showSectionLabel = useHMonitorState('showSectionLabel');

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
            <Spinner size="sm" variant="dots" />
          ) : (
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide text-nowrap">{title}</span>
          )}
        </div>
      )}
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
}

export default memo(Section);
