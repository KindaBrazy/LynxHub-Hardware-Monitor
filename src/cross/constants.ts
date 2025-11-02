import {AvailableHardware, EnabledMetrics, MetricVisibility, MonitoringSettings} from './types';

// Unique identifier for storing settings
export const HMONITOR_STORAGE_ID: string = 'hmonitor_storage';

// IPC channel identifiers for communication between main and renderer processes
export const HMONITOR_IPC_DATA_UPDATE: string = 'hmonitor-data-update';
export const HMONITOR_IPC_CONFIG_UPDATE: string = 'hmonitor-config-update';
export const HMONITOR_IPC_MONITORING_ERROR: string = 'hmonitor-monitoring-error';
export const HMONITOR_IPC_SET_CONFIG: string = 'hmonitor-set-config';

// Initial state for available hardware (populated at runtime)
export const initialAvailableHardware: AvailableHardware = {
  gpu: [],
  cpu: [],
  memory: [],
  network: [],
};

// Default visibility settings for each metric item in the status bar
export const initialMetricVisibility: MetricVisibility = {
  icon: true,
  label: true,
  value: true,
  progressBar: true,
};

// Default enabled metrics (populated at runtime based on available hardware)
export const initialEnabledMetrics: EnabledMetrics = {
  cpu: [],
  gpu: [],
  memory: [],
  network: [],
  uptime: {system: true, app: true},
};

// Default settings for the hardware monitor
export const initialSettings: MonitoringSettings = {
  configVersion: 0.5, // Version to handle future settings migrations
  refreshInterval: 1, // in seconds
  enabled: true,
  displayStyle: 'default',
  showSectionLabel: true,
  metricVisibility: initialMetricVisibility,
  enabledMetrics: initialEnabledMetrics,
  availableHardware: initialAvailableHardware,
};
