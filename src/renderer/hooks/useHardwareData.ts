import {HardwareReport} from '@lynxhub/hwmonitor';
import {useEffect, useState} from 'react';

import {HMONITOR_IPC_DATA_UPDATE, HMONITOR_IPC_MONITORING_ERROR} from '../../cross/constants';
import {HardwareDataReport} from '../../cross/types';

const convertMBtoGB = (mb: number): number => Number((mb / 1024).toFixed(2));
const BpsToMbps = (bytes: number): number => Number(((bytes * 8) / 1e6).toFixed(2));

const initialData: HardwareDataReport = {
  gpu: [],
  cpu: [],
  memory: [],
  network: [],
  uptime: {system: 0, app: 0},
  rawSensors: [],
};

/**
 * Custom hook to manage hardware data fetching and state.
 * It listens for IPC events from the main process and transforms the raw data.
 */
export default function useHardwareData() {
  const [hardwareData, setHardwareData] = useState<HardwareDataReport>(initialData);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleHardwareUpdate = (_: unknown, data: HardwareReport & Partial<HardwareDataReport>) => {
      if (!data) return;

      const transformedData: HardwareDataReport = {
        cpu: data.CPU.map(item => ({
          name: item.Name,
          temp: item.Sensors.find(s => s.Name === 'CPU Package' && s.Type === 'Temperature')?.Value || 0,
          usage: Math.round(item.Sensors.find(s => s.Name === 'CPU Total' && s.Type === 'Load')?.Value || 0),
        })),
        gpu: data.GPU.map(item => ({
          name: item.Name,
          temp: item.Sensors.find(s => s.Name === 'GPU Core' && s.Type === 'Temperature')?.Value || 0,
          usage: Math.round(item.Sensors.find(s => s.Name === 'D3D 3D' && s.Type === 'Load')?.Value || 0),
          totalVram: convertMBtoGB(item.Sensors.find(s => s.Name === 'GPU Memory Total')?.Value || 0),
          usedVram: convertMBtoGB(item.Sensors.find(s => s.Name === 'GPU Memory Used')?.Value || 0),
        })),
        memory: data.Memory.map(item => {
          const used = item.Sensors.find(s => s.Name === 'Memory Used' && s.Type === 'Data')?.Value || 0;
          const available = item.Sensors.find(s => s.Name === 'Memory Available' && s.Type === 'Data')?.Value || 0;
          return {name: item.Name, used, available, total: used + available};
        }),
        network: (data.Network ?? []).map(item => ({
          name: item.Name,
          uploadSpeed: BpsToMbps(item.Sensors.find(s => s.Name === 'Upload Speed')?.Value || 0),
          downloadSpeed: BpsToMbps(item.Sensors.find(s => s.Name === 'Download Speed')?.Value || 0),
          uploadData: item.Sensors.find(s => s.Name === 'Data Uploaded')?.Value || 0,
          downloadData: item.Sensors.find(s => s.Name === 'Data Downloaded')?.Value || 0,
        })),
        uptime: {
          system: data.Uptime?.rawSeconds || 0,
          app: data.ElapsedTime?.rawSeconds || 0,
        },
        rawSensors: data.rawSensors || [],
      };

      setHardwareData(transformedData);
      if (!isConnected) setIsConnected(true);
      if (error) setError(null);
    };

    const handleError = (_: unknown, err: Error) => {
      console.error('Received monitoring error:', err);
      setError(err);
      setIsConnected(false);
    };

    window.electron.ipcRenderer.on(HMONITOR_IPC_DATA_UPDATE, handleHardwareUpdate);
    window.electron.ipcRenderer.on(HMONITOR_IPC_MONITORING_ERROR, handleError);

    return () => {
      window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_DATA_UPDATE);
      window.electron.ipcRenderer.removeAllListeners(HMONITOR_IPC_MONITORING_ERROR);
    };
  }, [isConnected, error]);

  return {hardwareData, isConnected, error};
}
