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
import {ForbiddenCircle, Unread} from '@solar-icons/react-perf/Linear';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';

export default function PingSettings() {
  const [active, setActive] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<boolean>(false);
  const [hostLabel, setHostLabel] = useState<boolean>(true);

  const [hostInput, setHostInput] = useState<string>('');

  const [hosts, setHosts] = useState<string[]>([]);

  const onToggle = () => setActive(prevState => !prevState);

  const onHostChange = (forceProcess?: boolean) => {
    const value = hostInput.replaceAll(',', '').trim();

    if (forceProcess || hostInput.endsWith(' ') || hostInput.endsWith(',')) {
      setHosts(prevState => (prevState.includes(value) ? prevState : [value, ...prevState]));
      setHostInput('');
    }
  };

  useEffect(() => onHostChange(), [hostInput]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') onHostChange(true);
  };

  const removeHost = (host: string) => {
    setHosts(prevState => prevState.filter(h => h !== host));
  };

  return (
    <div className="flex flex-col gap-y-2 p-2 bg-surface-secondary rounded-3xl">
      <Card>
        <Card.Header onClick={onToggle} className="flex flex-row justify-between cursor-pointer">
          <p className="font-medium">Ping</p>
          <Switch isSelected={active} onChange={onToggle}>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
        </Card.Header>
        <Card.Content className="flex-col items-start gap-y-1">
          {/* Overlay to indicate that the controls are disabled */}
          {!active && <div className="absolute inset-1.5 top-10.5 bg-surface-secondary/50 z-20 rounded-3xl" />}

          <div className="flex flex-row gap-x-4 mb-4">
            <Switch isSelected={timestamp} onChange={setTimestamp}>
              <Label>Show TimeStamp</Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
            <Switch isSelected={hostLabel} onChange={setHostLabel}>
              <Label>Show Host Label</Label>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
          </div>

          <div className="flex flex-row flex-wrap gap-2 mb-4">
            <AnimatePresence>
              {hosts.map(host => (
                <motion.div key={host} layout>
                  <ToggleButton size="sm">
                    {({isSelected: selected}) => (
                      <>
                        {selected ? <Unread className="size-5" /> : <ForbiddenCircle className="size-3" />}
                        {host}
                        <CloseButton onPress={() => removeHost(host)} />
                      </>
                    )}
                  </ToggleButton>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <TextField
            type="text"
            value={hostInput}
            variant="secondary"
            onChange={setHostInput}
            onKeyDown={handleKeyDown}
            fullWidth>
            <Label>Host</Label>
            <Input placeholder="google.com,8.8.8.8,1.1.1.1" />
            <Description className="flex flex-row items-center gap-x-1">
              Enter hosts. Press
              <Kbd className="h-5">Enter</Kbd>
              <Kbd className="h-5">,</Kbd>
              <Kbd className="h-5">Space</Kbd>
              to add.
            </Description>
          </TextField>

          <NumberField minValue={100} variant="secondary" defaultValue={1000} fullWidth>
            <Label>Interval (Milliseconds)</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>Enter interval</Description>
          </NumberField>

          <NumberField minValue={100} variant="secondary" defaultValue={2000} fullWidth>
            <Label>Timeout (Milliseconds)</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
            <Description>Enter timeout</Description>
          </NumberField>
        </Card.Content>
      </Card>
    </div>
  );
}
