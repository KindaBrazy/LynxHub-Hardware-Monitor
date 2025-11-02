import {Spinner} from '@heroui/react';
import {isEmpty} from 'lodash';
import {Children, ElementType, Fragment, memo, ReactNode} from 'react';

import {useHMonitorState} from '../../state/hmonitorSlice';

type SectionProps = {
  title: string;
  icon: ElementType;
  children: ReactNode;
};

const Section = memo(({title, icon: Icon, children}: SectionProps) => {
  const displayStyle = useHMonitorState('displayStyle');
  const showSectionLabel = useHMonitorState('showSectionLabel');

  const isRaw = ['raw', 'raw-two-column'].includes(displayStyle);
  const isTwoColumn = ['two-column', 'raw-two-column'].includes(displayStyle);
  const isCompact = ['compact', 'two-column'].includes(displayStyle);

  if (isRaw) {
    return (
      <div
        className={
          `flex items-center shrink-0 ${isTwoColumn ? 'gap-x-2' : 'gap-x-1'}` +
          ` text-xs font-mono whitespace-nowrap text-slate-300`
        }>
        <span className="font-semibold opacity-80">{title}:&nbsp;</span>
        <div
          className={
            `flex items-center h-8 ${isTwoColumn ? 'gap-x-2' : 'gap-x-1'} shrink-0 ` +
            `${
              isTwoColumn &&
              `flex-col flex-wrap items-start ${Children.count(children) > 1 ? 'justify-start' : 'justify-center'}`
            }`
          }>
          {Children.map(children, (child, i) => (
            <Fragment key={i}>
              {child}
              {!isTwoColumn && i < Children.count(children) - 1 && <span>-</span>}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${isCompact ? 'gap-x-2' : 'gap-x-3'}`}>
      {showSectionLabel && (
        <div
          className={
            `flex items-center ${isCompact ? 'gap-x-1.5 px-1.5 py-0.5' : 'gap-x-2 px-2 py-1'}` +
            ` rounded-md bg-slate-700/50 border border-slate-600/30`
          }>
          <Icon className={`${isCompact ? 'size-3' : 'size-3.5'} text-slate-400`} />
          {isEmpty(title) ? (
            <Spinner size="sm" variant="dots" />
          ) : (
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide text-nowrap">{title}</span>
          )}
        </div>
      )}
      <div className={isTwoColumn ? 'grid grid-cols-1 gap-y-0.5' : 'flex items-center gap-x-2'}>{children}</div>
    </div>
  );
});

export default Section;
