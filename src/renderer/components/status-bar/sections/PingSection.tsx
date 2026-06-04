import {RadarIcon, Zap} from 'lucide-react';
import {memo, useEffect, useMemo, useState} from 'react';

import {HMONITOR_IPC_STOP_PING, HMONITOR_IPC_UPDATE_PING} from '../../../../cross/constants';
import {PingData} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type PingDisplayState = Record<string, PingData | null>;

function PingSection() {
  const pingState = useHMonitorState('pingState');

  const [hostResults, setHostResults] = useState<PingDisplayState>({});

  const renderElements = useMemo(() => {
    return Array.from(new Set(pingState.enabledHosts)).map(host => {
      const item = hostResults[host];
      const value = !item || !item.latency ? '-1' : `${item.latency} ms`;

      return (
        <MetricItem
          icon={Zap}
          key={host}
          label={host}
          value={value}
          colorClass={value === '-1' ? 'text-warning' : undefined}
        />
      );
    });
  }, [hostResults, pingState]);

  useEffect(() => {
    const clearListener = window.electron.ipcRenderer.on(HMONITOR_IPC_UPDATE_PING, (_, result) => {
      if (typeof result === 'string') {
        setHostResults(prevResults => ({...prevResults, [result]: null}));
      } else {
        const data = result as PingData;
        setHostResults(prevResults => ({...prevResults, [data.host]: data}));
      }
    });

    const clearStopListener = window.electron.ipcRenderer.on(HMONITOR_IPC_STOP_PING, (_, host) => {
      setHostResults(prevState => {
        const {[host]: _, ...remainingHosts} = prevState;
        return remainingHosts;
      });
    });

    return () => {
      clearListener();
      clearStopListener();
    };
  }, []);

  return (
    <Section title="Ping" icon={RadarIcon}>
      {renderElements}
    </Section>
  );
}

export default memo(PingSection);
