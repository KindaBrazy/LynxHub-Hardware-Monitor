import {HardwareReport} from '@lynxhub/hwmonitor';
import {useEffect, useState} from 'react';

import {HMONITOR_IPC_DATA_UPDATE, HMONITOR_IPC_MONITORING_ERROR} from '../../cross/constants';
import {HardwareDataReport} from '../../cross/types';
import {
  CPU_LOAD_CANDIDATES,
  CPU_TEMP_CANDIDATES,
  findGpuLoad,
  findSensorValue,
  GPU_TEMP_CANDIDATES,
  GPU_VRAM_TOTAL_CANDIDATES,
  GPU_VRAM_USED_CANDIDATES,
  MEMORY_AVAILABLE_CANDIDATES,
  MEMORY_USED_CANDIDATES,
  NETWORK_DOWNLOAD_DATA_CANDIDATES,
  NETWORK_DOWNLOAD_SPEED_CANDIDATES,
  NETWORK_UPLOAD_DATA_CANDIDATES,
  NETWORK_UPLOAD_SPEED_CANDIDATES,
} from '../utils/sensorUtils';

const convertMBtoGB = (mb: number): number => Number((mb / 1024).toFixed(2));

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
        cpu: data.CPU.map(item => {
          const rawTemp = findSensorValue(item.Sensors, CPU_TEMP_CANDIDATES, 'Temperature', {requirePositive: true});
          const rawUsage = findSensorValue(item.Sensors, CPU_LOAD_CANDIDATES, 'Load');
          return {
            name: item.Name,
            temp: rawTemp != null ? Math.round(rawTemp) : 0,
            usage: rawUsage != null ? Math.round(rawUsage) : 0,
            sensors: item.Sensors,
          };
        }),
        gpu: data.GPU.map(item => {
          const rawTemp = findSensorValue(item.Sensors, GPU_TEMP_CANDIDATES, 'Temperature', {requirePositive: true});
          const rawTotalVram = findSensorValue(item.Sensors, GPU_VRAM_TOTAL_CANDIDATES);
          const rawUsedVram = findSensorValue(item.Sensors, GPU_VRAM_USED_CANDIDATES);
          return {
            name: item.Name,
            temp: rawTemp != null ? Math.round(rawTemp) : 0,
            usage: findGpuLoad(item.Sensors),
            totalVram: convertMBtoGB(rawTotalVram ?? 0),
            usedVram: convertMBtoGB(rawUsedVram ?? 0),
            sensors: item.Sensors,
          };
        }),
        memory: data.Memory.map(item => {
          const used = findSensorValue(item.Sensors, MEMORY_USED_CANDIDATES, 'Data') ?? 0;
          const available = findSensorValue(item.Sensors, MEMORY_AVAILABLE_CANDIDATES, 'Data') ?? 0;
          return {name: item.Name, used, available, total: used + available, sensors: item.Sensors};
        }),
        network: (data.Network ?? []).map(item => ({
          name: item.Name,
          uploadSpeed: findSensorValue(item.Sensors, NETWORK_UPLOAD_SPEED_CANDIDATES) ?? 0,
          downloadSpeed: findSensorValue(item.Sensors, NETWORK_DOWNLOAD_SPEED_CANDIDATES) ?? 0,
          uploadData: findSensorValue(item.Sensors, NETWORK_UPLOAD_DATA_CANDIDATES) ?? 0,
          downloadData: findSensorValue(item.Sensors, NETWORK_DOWNLOAD_DATA_CANDIDATES) ?? 0,
          sensors: item.Sensors,
        })),
        uptime: {
          system: data.Uptime?.rawSeconds || 0,
          app: data.ElapsedTime?.rawSeconds || 0,
        },
        rawSensors: data.rawSensors || [],
        networkDetails: data.networkDetails,
      };

      setHardwareData(transformedData);
      setIsConnected(true);
      setError(null);
    };

    const handleError = (_: unknown, err: Error) => {
      console.error('Received monitoring error:', err);
      setError(err);
      setIsConnected(false);
    };

    const clearDataListener = window.electron.ipcRenderer.on(HMONITOR_IPC_DATA_UPDATE, handleHardwareUpdate);
    const clearMonitorError = window.electron.ipcRenderer.on(HMONITOR_IPC_MONITORING_ERROR, handleError);

    return () => {
      clearDataListener();
      clearMonitorError();
    };
  }, []);

  return {hardwareData, isConnected, error};
}
