import {AvailableHardware, MetricsVisibility, MonitoringSettings, NewSystemMetrics} from './CrossTypes';

export const HMONITOR_STORAGE_ID: string = 'hmonitor_storage';
export const HMONITOR_IPC_DATA_ID: string = 'hardware-data-update';
export const HMONITOR_IPC_STOP_ID: string = 'hmonitor-stop';
export const HMONITOR_IPC_UPDATE_CONFIG: string = 'hmonitor-update-config';
export const HMONITOR_IPC_ERROR_MONITORING: string = 'hmonitor-error-monitoring';
export const HMONITOR_IPC_ON_CONFIG: string = 'hmonitor-on-config';

export const initialSystemMetrics: NewSystemMetrics = {
  cpu: [],
  gpu: [],
  memory: [],
  uptime: {system: true, app: true},
};

export const initAvailableHardware: AvailableHardware = {
  gpu: [],
  cpu: [],
  memory: [],
};

export const initMetricVisibility: MetricsVisibility = {
  icon: true,
  label: true,
  value: true,
  progressBar: true,
};

export const initialSettings: MonitoringSettings = {
  configVersion: 0.1,

  refreshInterval: 1,
  enabled: true,
  compactMode: false,
  showSectionLabel: true,
  metricVisibility: initMetricVisibility,
  enabledMetrics: initialSystemMetrics,
  availableHardware: initAvailableHardware,
};
