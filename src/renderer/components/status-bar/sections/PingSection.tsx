import {RadarIcon, Zap} from 'lucide-react';
import {memo, useEffect, useMemo, useState} from 'react';

import {HMONITOR_IPC_STOP_PING, HMONITOR_IPC_UPDATE_PING} from '../../../../cross/constants';
import {HardwareFlyoutPayload, PingData, PingHistorySample} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import HardwareFlyoutTrigger from '../../common/HardwareFlyoutTrigger';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

type PingDisplayState = Record<string, PingData | null>;
type PingHistoryState = Record<string, PingHistorySample[]>;

const MAX_HISTORY_SAMPLES = 60;

function PingSection() {
  const pingState = useHMonitorState('pingState');

  const [hostResults, setHostResults] = useState<PingDisplayState>({});
  const [hostHistory, setHostHistory] = useState<PingHistoryState>({});

  const renderElements = useMemo(() => {
    return Array.from(new Set(pingState.enabledHosts)).map(host => {
      const item = hostResults[host];
      const value = !item || !item.latency ? '-1' : `${item.latency} ms`;
      const history = hostHistory[host] || [];

      const flyoutPayload: HardwareFlyoutPayload = {
        section: 'ping',
        ping: {
          host,
          data: item,
          history,
        },
      };

      return (
        <HardwareFlyoutTrigger key={host} section="ping" payload={flyoutPayload}>
          <MetricItem icon={Zap} label={host} value={value} colorClass={value === '-1' ? 'text-warning' : undefined} />
        </HardwareFlyoutTrigger>
      );
    });
  }, [hostResults, hostHistory, pingState]);

  useEffect(() => {
    const clearListener = window.electron.ipcRenderer.on(HMONITOR_IPC_UPDATE_PING, (_, result) => {
      const now = Date.now();
      if (typeof result === 'string') {
        const host = result;
        setHostResults(prevResults => ({...prevResults, [host]: null}));
        setHostHistory(prev => {
          const current = prev[host] || [];
          return {...prev, [host]: [...current, {timestamp: now, latency: null}].slice(-MAX_HISTORY_SAMPLES)};
        });
      } else {
        const data = result as PingData;
        setHostResults(prevResults => ({...prevResults, [data.host]: data}));
        setHostHistory(prev => {
          const current = prev[data.host] || [];
          return {
            ...prev,
            [data.host]: [...current, {timestamp: now, latency: data.latency ?? null}].slice(-MAX_HISTORY_SAMPLES),
          };
        });
      }
    });

    const clearStopListener = window.electron.ipcRenderer.on(HMONITOR_IPC_STOP_PING, (_, host) => {
      setHostResults(prevState => {
        const {[host]: _, ...remainingHosts} = prevState;
        return remainingHosts;
      });
      setHostHistory(prevHistory => {
        const {[host]: _, ...remainingHistory} = prevHistory;
        return remainingHistory;
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
