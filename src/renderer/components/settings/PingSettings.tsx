import {
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
  ToggleButton,
} from '@heroui/react';
import {Unread} from '@solar-icons/react-perf/Linear';
import {AnimatePresence, motion} from 'framer-motion';
import {isEqual} from 'lodash-es';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

import {PingState} from '../../../cross/types';
import {hmonitorActions, useHMonitorState} from '../../state/hmonitorSlice';

export default function PingSettings() {
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
  }, [isActive, interval, timeoutMs, hosts, enabledHosts]);

  const onToggleActivate = () => setIsActive(prevState => !prevState);
  const onToggleHost = (host: string) =>
    setEnabledHosts(preConfig => (preConfig.includes(host) ? preConfig.filter(p => p !== host) : [...preConfig, host]));

  const onHostChange = (e?: KeyboardEvent) => {
    const force = e?.key === 'Enter';
    const value = hostInput.replaceAll(',', '').trim();

    if (!value) return;

    if (force || hostInput.endsWith(' ') || hostInput.endsWith(',')) {
      setHosts(prevState => (prevState.includes(value) ? prevState : [value, ...prevState]));
      setHostInput('');
    }
  };

  const removeHost = (host: string) => {
    setHosts(prevState => prevState.filter(h => h !== host));
  };

  return (
    <div className="flex flex-col gap-y-2 p-2 bg-surface-secondary rounded-3xl">
      <Card>
        <Card.Header onClick={onToggleActivate} className="flex flex-row justify-between cursor-pointer">
          <p className="font-medium">Ping</p>
          <Switch isSelected={isActive} onChange={onToggleActivate}>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
        </Card.Header>
        <Card.Content className="flex-col items-start gap-y-1">
          {/* Overlay to indicate that the controls are disabled */}
          {!isActive && <div className="absolute inset-1.5 top-10.5 bg-surface-secondary/50 z-20 rounded-3xl" />}

          {hosts.length > 0 && (
            <>
              <Label>Select hosts to display in the status bar</Label>
              <div className="flex flex-row flex-wrap gap-2 mb-4">
                <AnimatePresence>
                  {hosts.map(host => (
                    <motion.div key={host} layout>
                      <ToggleButton
                        size="sm"
                        onChange={() => onToggleHost(host)}
                        isSelected={enabledHosts.includes(host)}>
                        {({isSelected: selected}) => (
                          <>
                            {selected && <Unread className="size-5" />}
                            {host}
                            {!selected && <CloseButton onPress={() => removeHost(host)} />}
                          </>
                        )}
                      </ToggleButton>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          <TextField
            type="text"
            value={hostInput}
            variant="secondary"
            onKeyUp={onHostChange}
            onChange={setHostInput}
            fullWidth>
            <Label>Host</Label>
            <Input placeholder="8.8.8.8" />
            <Description className="flex flex-row items-center gap-x-1">
              Type a host and press
              <Kbd className="h-5">Enter</Kbd>
              <Kbd className="h-5">Space</Kbd>
              or
              <Kbd className="h-5">,</Kbd>
              to add
            </Description>
          </TextField>

          <NumberField minValue={100} value={interval} variant="secondary" onChange={setInterval} fullWidth>
            <Label>Interval</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>Interval in milliseconds</Description>
          </NumberField>

          <NumberField minValue={100} value={timeoutMs} variant="secondary" onChange={setTimeoutMs} fullWidth>
            <Label>Timeout</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>Timeout in milliseconds</Description>
          </NumberField>
        </Card.Content>
      </Card>
    </div>
  );
}
