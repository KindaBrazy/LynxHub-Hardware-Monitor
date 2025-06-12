import {SystemMetrics} from './CrossTypes';

export const HMONITOR_STORAGE_ID: string = 'hmonitor_storage';
export const HMONITOR_IPC_DATA_ID: string = 'hardware-data-update';
export const HMONITOR_IPC_STOP_ID: string = 'hmonitor-stop';
export const HMONITOR_IPC_UPDATE_CONFIG: string = 'hmonitor-update-config';
export const HMONITOR_IPC_ERROR_MONITORING: string = 'hmonitor-error-monitoring';

export const initialSystemMetrics: SystemMetrics[] = [
  'cpuTemp',
  'cpuUsage',
  'gpuTemp',
  'gpuUsage',
  'memory',
  'vram',
  'uptimeSystemSeconds',
  'uptimeSeconds',
];
