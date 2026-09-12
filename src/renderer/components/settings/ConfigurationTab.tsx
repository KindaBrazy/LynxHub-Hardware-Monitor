import {Button, Description, Label, NumberField, Switch} from '@heroui/react';
import LynxSwitch from '@lynx/components/LynxSwitch';
import {MonitorIcon, RefreshCircleIcon, Widget2Icon} from '@solar-icons/react/bold-duotone';
import {Check, Sparkles} from 'lucide-react';
import {memo} from 'react';

import {DisplayStyle, MonitoringSettings} from '../../../cross/types';
import MetricVisibilitySettings from './MetricVisibilitySettings';

const DISPLAY_STYLES: Array<{
  value: DisplayStyle;
  label: string;
  preview: {
    type: 'default' | 'compact' | 'two-column' | 'raw' | 'raw-two-column';
  };
}> = [
  {
    value: 'default',
    label: 'Standard',
    preview: {type: 'default'},
  },
  {
    value: 'compact',
    label: 'Compact',
    preview: {type: 'compact'},
  },
  {
    value: 'two-column',
    label: 'Two-Column Stack',
    preview: {type: 'two-column'},
  },
  {
    value: 'raw',
    label: 'Raw Text',
    preview: {type: 'raw'},
  },
  {
    value: 'raw-two-column',
    label: 'Raw (Two-Column)',
    preview: {type: 'raw-two-column'},
  },
];

const INTERVAL_PRESETS = [
  {label: '0.5s (Ultra Fast)', value: 0.5},
  {label: '1s (Standard)', value: 1},
  {label: '2s (Balanced)', value: 2},
  {label: '5s (Low CPU)', value: 5},
];

type ConfigurationTabProps = {
  settings: MonitoringSettings;
  updateState: <K extends keyof MonitoringSettings>(key: K, value: MonitoringSettings[K]) => void;
  handleDisplayStyleChange: (style: DisplayStyle) => void;
  isRawStyle: boolean;
};

export const ConfigurationTab = memo(
  ({settings, updateState, handleDisplayStyleChange, isRawStyle}: ConfigurationTabProps) => {
    const {enabled, refreshInterval, displayStyle, showSectionLabel} = settings;

    return (
      <div className="flex flex-col gap-y-5 pb-4">
        {/* Master Switch Card */}
        <div
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') updateState('enabled', !enabled);
          }}
          className={
            'relative overflow-hidden rounded-3xl p-5  transition-all duration-200' +
            ' cursor-pointer flex items-center justify-between gap-4 select-none ' +
            (enabled ? 'bg-accent/10 border border-accent/30' : 'bg-surface-secondary opacity-80')
          }
          tabIndex={0}
          role="button"
          onClick={() => updateState('enabled', !enabled)}>
          <div className="flex items-center gap-x-4">
            <div
              className={`size-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                enabled ? 'bg-accent text-accent-foreground shadow-md' : 'bg-surface-tertiary text-muted'
              }`}>
              <Widget2Icon className="size-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground">Hardware Monitor Service</span>
              <p className="text-sm text-muted mt-0.5">
                {enabled
                  ? 'Real-time telemetry and hardware sensor monitoring is actively streaming to the status bar.'
                  : 'Monitoring is currently paused. No background sensor readings or ping requests will run.'}
              </p>
            </div>
          </div>
          <Switch
            size="lg"
            isSelected={enabled}
            aria-label="Toggle system monitoring"
            onChange={value => updateState('enabled', value)}>
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        </div>

        {enabled && (
          <div className="flex flex-col gap-y-5">
            {/* Refresh Interval Section */}
            <div className={'p-5 bg-surface-secondary rounded-3xl flex flex-col gap-y-3'}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2.5">
                  <RefreshCircleIcon className="size-5 text-accent" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Update Frequency</h3>
                    <p className="text-xs text-muted">Control how often hardware telemetry is updated</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {INTERVAL_PRESETS.map(preset => {
                  const isSelected = refreshInterval === preset.value;
                  return (
                    <Button
                      className={`text-xs font-medium shadow-surface transition-transform active:scale-[0.97] ${
                        isSelected ? 'bg-accent text-accent-foreground' : 'bg-surface text-surface-foreground'
                      }`}
                      size="sm"
                      key={preset.value}
                      onPress={() => updateState('refreshInterval', preset.value)}>
                      {isSelected && <Check className="size-3.5" />}
                      {preset.label}
                    </Button>
                  );
                })}
              </div>

              <div className="pt-2">
                <NumberField
                  step={0.5}
                  maxValue={60}
                  minValue={0.5}
                  value={refreshInterval}
                  onChange={value => updateState('refreshInterval', value)}
                  fullWidth>
                  <Label className="text-xs font-medium text-foreground/80">Custom Interval (seconds)</Label>
                  <NumberField.Group>
                    <NumberField.DecrementButton />
                    <NumberField.Input className="font-mono text-sm" />
                    <NumberField.IncrementButton />
                  </NumberField.Group>
                  <Description className="text-xs text-muted">
                    Accepts values between 0.5s (responsive) up to 60s (battery-friendly).
                  </Description>
                </NumberField>
              </div>
            </div>

            {/* Display Style Section */}
            <div className={'p-5 bg-surface-secondary rounded-3xl flex flex-col gap-y-4'}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2.5">
                  <MonitorIcon className="size-5 text-accent" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Status Bar Layout Style</h3>
                    <p className="text-xs text-muted">Choose visual presentation for metrics</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {DISPLAY_STYLES.map(style => {
                  const isSelected = displayStyle === style.value;
                  return (
                    <div
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') handleDisplayStyleChange(style.value);
                      }}
                      className={
                        'relative flex flex-col justify-between p-3.5 rounded-3xl' +
                        ' cursor-pointer transition-all duration-200 select-none text-left ' +
                        (isSelected ? 'bg-accent/10 border border-accent shadow-sm ring-1 ring-accent' : 'bg-surface')
                      }
                      tabIndex={0}
                      role="button"
                      key={style.value}
                      onClick={() => handleDisplayStyleChange(style.value)}>
                      <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        {style.label}
                      </span>

                      {/* Mini visual mockup of style */}
                      <div
                        className={
                          'w-full h-11 rounded-2xl bg-surface-secondary/70 ' +
                          ' flex items-center justify-center' +
                          ' px-2 my-1 overflow-hidden pointer-events-none'
                        }>
                        {style.preview.type === 'default' && (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <span className="font-semibold text-accent">CPU</span>
                            <span className="text-foreground/70">42%</span>
                            <div className="w-8 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                              <div className="w-1/2 h-full bg-accent rounded-full" />
                            </div>
                          </div>
                        )}
                        {style.preview.type === 'compact' && (
                          <div className="flex items-center gap-1 text-[9px]">
                            <span className="font-semibold text-accent">CPU</span>
                            <span className="text-foreground/70">42%</span>
                            <div className="w-5 h-1 bg-foreground/10 rounded-full overflow-hidden">
                              <div className="w-1/2 h-full bg-accent rounded-full" />
                            </div>
                          </div>
                        )}
                        {style.preview.type === 'two-column' && (
                          <div className="flex flex-col gap-0.5 text-[8px] leading-tight">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-accent">CPU</span>
                              <span>42%</span>
                              <div className="w-4 h-1 bg-foreground/10 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-accent rounded-full" />
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-accent">GPU</span>
                              <span>58°C</span>
                              <div className="w-4 h-1 bg-foreground/10 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-accent rounded-full" />
                              </div>
                            </div>
                          </div>
                        )}
                        {style.preview.type === 'raw' && (
                          <div className="flex items-center gap-1 text-[10px] font-mono">
                            <span className="text-muted">CPU:</span>
                            <span className="font-semibold text-foreground">42%</span>
                            <span className="text-muted mx-0.5">/</span>
                            <span className="text-muted">GPU:</span>
                            <span className="font-semibold text-foreground">58°C</span>
                          </div>
                        )}
                        {style.preview.type === 'raw-two-column' && (
                          <div className="flex flex-col gap-0.5 text-[9px] font-mono leading-tight">
                            <div>
                              <span className="text-muted">CPU:</span>{' '}
                              <span className="font-semibold text-foreground">42%</span>
                            </div>
                            <div>
                              <span className="text-muted">GPU:</span>{' '}
                              <span className="font-semibold text-foreground">58°C</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Elements Visibility & Section Labels */}
            <div className={'p-5 bg-surface-secondary rounded-3xl flex flex-col gap-y-4'}>
              <div className="flex items-center gap-x-2.5">
                <Sparkles className="size-5 text-accent" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Visual Elements & Labels</h3>
                  <p className="text-xs text-muted">Customize individual elements displayed for each active metric</p>
                </div>
              </div>

              <div className="pt-1">
                <LynxSwitch
                  onEnabledChange={value => {
                    if (!isRawStyle) updateState('showSectionLabel', value);
                  }}
                  className="p-1"
                  isDisabled={isRawStyle}
                  enabled={showSectionLabel}
                  title="Display Section Headers"
                  description="Shows label badges (e.g. CPU, GPU) next to each group. Disabled in Raw modes."
                />
              </div>

              <div className={`mt-2 ${isRawStyle ? 'opacity-50 pointer-events-none' : ''}`}>
                <MetricVisibilitySettings />
                {isRawStyle && (
                  <p className="text-xs mt-2 italic text-warning">
                    Note: Icon, Label, and Progress Bar controls are disabled because a Raw text style is active.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

ConfigurationTab.displayName = 'ConfigurationTab';
export default ConfigurationTab;
