import {
  Button,
  Card,
  CloseButton,
  Description,
  Input,
  Kbd,
  KeyboardEvent,
  Label,
  NumberField,
  Switch,
  TextField,
} from '@heroui/react';
import {UnreadIcon} from '@solar-icons/react/linear';
import {AnimatePresence, motion} from 'framer-motion';
import {isEqual} from 'lodash-es';
import {Globe, Plus, Radio, Timer} from 'lucide-react';
import {memo, ReactNode, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import {PingState} from '../../../cross/types';
import {hmonitorActions, useHMonitorState} from '../../state/hmonitorSlice';

const POPULAR_HOST_PRESETS = [
  {host: '1.1.1.1', label: 'Cloudflare (1.1.1.1)'},
  {host: '8.8.8.8', label: 'Google (8.8.8.8)'},
  {host: '9.9.9.9', label: 'Quad9 (9.9.9.9)'},
];

type PingSettingsProps = {
  dragHandle?: ReactNode;
};

export const PingSettings = memo(({dragHandle}: PingSettingsProps) => {
  const dispatch = useDispatch();
  const preConfig = useHMonitorState('pingState');

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isActive, setIsActive] = useState<boolean>(preConfig.isActive);
  const [hostInput, setHostInput] = useState<string>('');
  const [interval, setInterval] = useState<number>(preConfig.interval);
  const [timeoutMs, setTimeoutMs] = useState<number>(preConfig.timeout);

  const [hosts, setHosts] = useState<string[]>(preConfig.hosts);
  const [enabledHosts, setEnabledHosts] = useState<string[]>(preConfig.enabledHosts);

  useEffect(() => {
    debounceTimerRef.current = setTimeout(() => {
      const uniqueHosts = Array.from(new Set(hosts));
      const uniqueEnabledHosts = Array.from(new Set(enabledHosts)).filter(host => uniqueHosts.includes(host));
      const newState: PingState = {
        hosts: uniqueHosts,
        enabledHosts: uniqueEnabledHosts,
        timeout: timeoutMs,
        interval,
        isActive,
      };

      if (!isEqual(newState, preConfig)) dispatch(hmonitorActions.setPingState(newState));
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [isActive, interval, timeoutMs, hosts, enabledHosts, preConfig, dispatch]);

  const onToggleActivate = () => setIsActive(prevState => !prevState);

  const onToggleHost = (host: string) => {
    setEnabledHosts(prev => (prev.includes(host) ? prev.filter(p => p !== host) : [...prev, host]));
  };

  const onHostAdd = (hostToAdd?: string) => {
    const rawVal = hostToAdd ?? hostInput;
    const value = rawVal.replaceAll(',', '').trim();
    if (!value) return;

    setHosts(prev => (prev.includes(value) ? prev : [value, ...prev]));
    setEnabledHosts(prev => (prev.includes(value) ? prev : [value, ...prev]));
    if (!hostToAdd) setHostInput('');
  };

  const onHostKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || hostInput.endsWith(' ') || hostInput.endsWith(',')) {
      onHostAdd();
    }
  };

  const removeHost = (host: string) => {
    setHosts(prev => prev.filter(h => h !== host));
    setEnabledHosts(prev => prev.filter(h => h !== host));
  };

  return (
    <Card className="bg-surface-secondary rounded-3xl overflow-hidden">
      <Card.Header
        className={
          'flex flex-row justify-between items-center bg-surface ' +
          'rounded-3xl py-3.5 px-4 border-b border-surface-tertiary/50'
        }>
        <div className="flex flex-row items-center gap-x-2.5">
          {dragHandle}
          <div className="size-8 rounded-full bg-accent/15 text-accent flex items-center justify-center">
            <Radio className="size-4" />
          </div>
          <div>
            <span className="font-semibold text-LynxOrange hover:text-LynxOrange/80 transition duration-200 text-sm">
              Network Latency & Ping
            </span>
            <p className="text-xs text-muted">Monitor real-time network response latency to designated servers</p>
          </div>
        </div>

        <Switch isSelected={isActive} onChange={onToggleActivate} aria-label="Activate Ping Monitoring">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Content>
        </Switch>
      </Card.Header>

      <Card.Content className="flex flex-col gap-y-4 p-4 relative bg-surface rounded-3xl">
        {/* Overlay when disabled */}
        {!isActive && (
          <div
            className={
              'absolute inset-0 bg-surface/75 backdrop-blur-[1px] z-20' +
              ' flex items-center justify-center rounded-2xl'
            }>
            <p
              className={
                'text-xs text-muted font-medium bg-surface-secondary px-3' +
                ' py-1.5 rounded-xl border border-surface-tertiary shadow-xs'
              }>
              Ping monitoring is inactive. Toggle the switch above to enable.
            </p>
          </div>
        )}

        {/* Quick Presets for Beginners */}
        <div className="flex flex-col gap-y-1.5">
          <Label className="text-xs font-semibold text-foreground/90">Quick Preset Servers</Label>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_HOST_PRESETS.map(preset => {
              const alreadyAdded = hosts.includes(preset.host);
              return (
                <Button
                  size="sm"
                  key={preset.host}
                  isDisabled={alreadyAdded}
                  onPress={() => onHostAdd(preset.host)}
                  variant={alreadyAdded ? 'secondary' : 'tertiary'}
                  className={'text-xs h-7 px-2.5 transition-transform active:scale-[0.97]'}>
                  <Globe className="size-3 mr-1 text-accent" />
                  {preset.label}
                  {!alreadyAdded && <Plus className="size-3 ml-1 text-muted" />}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Active Hosts Pills */}
        {hosts.length > 0 && (
          <div className="flex flex-col gap-y-1.5">
            <Label className="text-xs font-semibold text-foreground/90">
              Active Monitored Hosts ({enabledHosts.length}/{hosts.length} showing)
            </Label>
            <div className="flex flex-row flex-wrap gap-2 min-h-8 items-center">
              <AnimatePresence>
                {hosts.map(host => {
                  const isEnabled = enabledHosts.includes(host);
                  return (
                    <motion.div
                      className={
                        'flex items-center gap-1.5 px-2 py-1.5 rounded-full border' +
                        ' text-xs font-medium select-none transition-colors ' +
                        (isEnabled
                          ? 'bg-accent/10 border-accent/40 text-accent font-semibold'
                          : 'bg-surface border-surface-tertiary text-muted opacity-60')
                      }
                      key={host}
                      transition={{duration: 0.15}}
                      exit={{opacity: 0, scale: 0.9}}
                      animate={{opacity: 1, scale: 1}}
                      initial={{opacity: 0, scale: 0.9}}
                      layout>
                      <button
                        type="button"
                        onClick={() => onToggleHost(host)}
                        className="flex items-center gap-1 cursor-pointer focus:outline-hidden">
                        <UnreadIcon className={`size-4 ${isEnabled ? 'text-accent' : 'text-muted'}`} />
                        <span className="font-JetBrainsMono">{host}</span>
                      </button>
                      <CloseButton
                        onPress={() => removeHost(host)}
                        aria-label={`Remove host ${host}`}
                        className="size-3.5 hover:text-danger bg-transparent"
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Add Host Input */}
        <div className="flex items-center gap-2">
          <TextField
            type="text"
            value={hostInput}
            className="flex-1"
            variant="secondary"
            onKeyUp={onHostKeyUp}
            onChange={setHostInput}>
            <Label className="text-xs font-semibold text-foreground/90">Add Custom Host / IP</Label>
            <Input className="text-xs" placeholder="e.g. 1.1.1.1 or google.com" />
            <Description className="flex flex-row items-center gap-x-1 text-xs text-muted mt-1">
              Type host and press
              <Kbd className="h-4.5 text-[10px] px-1.5">Enter</Kbd>
              or click
            </Description>
          </TextField>
          <Button
            size="sm"
            variant="secondary"
            className="shrink-0 mb-1"
            onPress={() => onHostAdd()}
            isDisabled={!hostInput.trim()}>
            <Plus className="size-4" />
            Add
          </Button>
        </div>

        {/* Interval and Timeout Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <NumberField minValue={100} value={interval} variant="secondary" onChange={setInterval} fullWidth>
            <div className="flex items-center justify-between mb-1">
              <Label className="text-xs font-semibold text-foreground/90">Ping Interval</Label>
              <span className="text-[11px] text-muted">{interval} ms</span>
            </div>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-xs" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description className="text-[11px] text-muted flex items-center gap-1 mt-1">
              <Timer className="size-3" /> Time between each ping check
            </Description>
          </NumberField>

          <NumberField minValue={100} value={timeoutMs} variant="secondary" onChange={setTimeoutMs} fullWidth>
            <div className="flex items-center justify-between mb-1">
              <Label className="text-xs font-semibold text-foreground/90">Ping Timeout</Label>
              <span className="text-[11px] text-muted">{timeoutMs} ms</span>
            </div>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input className="text-xs" />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description className="text-[11px] text-muted flex items-center gap-1 mt-1">
              <Timer className="size-3" /> Max wait time before packet drops
            </Description>
          </NumberField>
        </div>
      </Card.Content>
    </Card>
  );
});

PingSettings.displayName = 'PingSettings';
export default PingSettings;
