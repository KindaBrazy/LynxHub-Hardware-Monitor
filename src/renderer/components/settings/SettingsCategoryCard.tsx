import {Card, Switch} from '@heroui/react';
import {CpuBoltIcon} from '@solar-icons/react/bold-duotone';
import {Activity, Clock, Database, Network, Radio} from 'lucide-react';
import {ComponentType, memo, ReactNode} from 'react';

export type CategoryMeta = {
  badge: string;
  badgeClass: string;
  iconBgClass: string;
  Icon: ComponentType<{className?: string}>;
};

export const CATEGORY_META: Record<string, CategoryMeta> = {
  cpu: {
    badge: 'CPU',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    iconBgClass: 'bg-cyan-500/15 text-cyan-400',
    Icon: CpuBoltIcon,
  },
  gpu: {
    badge: 'GPU',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    iconBgClass: 'bg-purple-500/15 text-purple-400',
    Icon: Activity,
  },
  memory: {
    badge: 'RAM',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    iconBgClass: 'bg-emerald-500/15 text-emerald-400',
    Icon: Database,
  },
  network: {
    badge: 'NET',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    iconBgClass: 'bg-amber-500/15 text-amber-400',
    Icon: Network,
  },
  uptime: {
    badge: 'UPTIME',
    badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    iconBgClass: 'bg-sky-500/15 text-sky-400',
    Icon: Clock,
  },
  ping: {
    badge: 'PING',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    iconBgClass: 'bg-rose-500/15 text-rose-400',
    Icon: Radio,
  },
};

export type SettingsCategoryCardProps = {
  category?: string;
  title: ReactNode;
  icon?: ReactNode;
  iconClassName?: string;
  badge?: ReactNode;
  badgeClassName?: string;
  dragHandle?: ReactNode;
  headerExtra?: ReactNode;
  headerActions?: ReactNode;
  isActive?: boolean;
  onToggle?: () => void;
  toggleAriaLabel?: string;
  isDisabled?: boolean;
  disabledMessage?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

export const SettingsCategoryCard = memo(
  ({
    category,
    title,
    icon,
    iconClassName,
    badge,
    badgeClassName,
    dragHandle,
    headerExtra,
    headerActions,
    isActive,
    onToggle,
    toggleAriaLabel,
    isDisabled,
    disabledMessage,
    className,
    headerClassName,
    contentClassName,
    children,
  }: SettingsCategoryCardProps) => {
    const meta = category ? CATEGORY_META[category] : undefined;
    const resolvedIconBg = iconClassName ?? meta?.iconBgClass ?? 'bg-accent/15 text-accent';
    const resolvedBadgeClass = badgeClassName ?? meta?.badgeClass ?? 'bg-accent/15 text-accent border-accent/30';
    const resolvedBadge = badge ?? meta?.badge ?? category?.toUpperCase();
    const IconComp = meta?.Icon;

    return (
      <Card
        className={
          'rounded-3xl bg-surface-secondary/70 border border-border overflow-hidden shadow-xs ' + (className ?? '')
        }>
        <Card.Header
          className={
            'flex flex-row justify-between items-center bg-surface/80 rounded-3xl ' +
            'py-3 px-4 border-b border-surface-tertiary/60 ' +
            (headerClassName ?? '')
          }>
          <div className="flex flex-row items-center gap-x-3">
            {dragHandle}
            <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${resolvedIconBg}`}>
              {icon ? icon : IconComp ? <IconComp className="size-4.5" /> : null}
            </div>
            <div className="flex items-center gap-x-2">
              {resolvedBadge && (
                <span
                  className={
                    'px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase border ' +
                    resolvedBadgeClass
                  }>
                  {resolvedBadge}
                </span>
              )}
              <span className="font-semibold text-foreground text-sm hover:text-foreground/90 transition-colors">
                {title}
              </span>
            </div>
          </div>

          {(headerExtra || headerActions || onToggle !== undefined) && (
            <div className="flex flex-row items-center gap-x-3">
              {headerExtra}
              {headerActions}
              {onToggle !== undefined && (
                <Switch
                  aria-label={
                    toggleAriaLabel ?? `Toggle active state for ${typeof title === 'string' ? title : 'section'}`
                  }
                  onChange={onToggle}
                  isSelected={isActive}>
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Content>
                </Switch>
              )}
            </div>
          )}
        </Card.Header>

        <Card.Content
          className={'flex flex-col gap-y-3 p-3.5 relative bg-surface/80 rounded-3xl ' + (contentClassName ?? '')}>
          {isDisabled && (
            <div
              className={
                'absolute inset-0 bg-surface/75 backdrop-blur-[1px] z-20 ' +
                'flex items-center justify-center rounded-2xl'
              }>
              <p
                className={
                  'text-xs text-muted font-medium bg-surface-secondary px-3 ' +
                  'py-1.5 rounded-xl border border-surface-tertiary shadow-xs'
                }>
                {disabledMessage ?? 'This section is currently disabled. Toggle the switch above to activate.'}
              </p>
            </div>
          )}

          {children}
        </Card.Content>
      </Card>
    );
  },
);

SettingsCategoryCard.displayName = 'SettingsCategoryCard';
export default SettingsCategoryCard;
