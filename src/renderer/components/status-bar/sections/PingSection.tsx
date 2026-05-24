import {RadarIcon, Zap} from 'lucide-react';
import {memo, useEffect, useMemo, useState} from 'react';

import {HMONITOR_IPC_STOP_PING, HMONITOR_IPC_UPDATE_PING} from '../../../../cross/constants';
import {PingData} from '../../../../cross/types';
import {useHMonitorState} from '../../../state/hmonitorSlice';
import MetricItem from '../../common/MetricItem';
import Section from '../../common/Section';

function PingSection() {
  const pingState = useHMonitorState('pingState');

  const [fails, setFails] = useState<string[]>([]);
  const [hostResults, setHostResults] = useState<PingData[]>([]);

  const renderElements = useMemo(() => {
    const results = hostResults
      .filter(host => pingState.enabledHosts.includes(host.host))
      .map(item => (
        <MetricItem
          value={
            fails.includes(item.host) || !item.latency
              ? '-1'
              : pingState.showTimestamp
                ? `${item.timeString} | ${item.latency}`
                : item.latency
          }
          icon={Zap}
          key={item.host}
          label={item.host}
        />
      ));

    const failResults = fails
      .filter(host => pingState.enabledHosts.includes(host))
      .map(host => <MetricItem icon={Zap} key={host} value="-1" label={host} colorClass="text-warning" />);

    return [...results, ...failResults];
  }, [hostResults, fails, pingState]);

  useEffect(() => {
    const clearListener = window.electron.ipcRenderer.on(HMONITOR_IPC_UPDATE_PING, (_, result) => {
      if (typeof result === 'string') {
        // It's a fail - add to fails and remove from hostResults
        setFails(prevState => (prevState.includes(result) ? prevState : [...prevState, result]));
      } else {
        // It's data - add/update hostResults and remove from fails
        const data = result as PingData;
        setHostResults(prevResults => {
          const existingIndex = prevResults.findIndex(item => item.host === data.host);

          if (existingIndex !== -1) {
            const updatedResults = [...prevResults];
            updatedResults[existingIndex] = data;
            return updatedResults;
          } else {
            return [...prevResults, data];
          }
        });
        setFails(prevState => prevState.filter(host => host !== data.host));
      }
    });

    const clearStopListener = window.electron.ipcRenderer.on(HMONITOR_IPC_STOP_PING, (_, host) => {
      setHostResults(prevState => prevState.filter(p => p.host !== host));
      setFails(prevState => prevState.filter(p => p !== host));
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
