import {AvailableHardware, EnabledMetrics, MetricVisibility, MonitoringSettings} from './types';

// Unique identifier for storing settings
export const HMONITOR_STORAGE_ID: string = 'hmonitor_storage';

// IPC channel identifiers for communication between main and renderer processes
export const HMONITOR_IPC_DATA_UPDATE: string = 'hmonitor-data-update';
export const HMONITOR_IPC_CONFIG_UPDATE: string = 'hmonitor-config-update';
export const HMONITOR_IPC_MONITORING_ERROR: string = 'hmonitor-monitoring-error';
export const HMONITOR_IPC_SET_CONFIG: string = 'hmonitor-set-config';
export const HMONITOR_IPC_RESET_CONFIG: string = 'hmonitor-reset-config';

export const HMONITOR_IPC_UPDATE_PING: string = 'hmonitor-update-ping';
export const HMONITOR_IPC_STOP_PING: string = 'hmonitor-stop-ping';

export const HMONITOR_IPC_SHOW_FLYOUT: string = 'hmonitor-show-flyout';
export const HMONITOR_IPC_UPDATE_FLYOUT: string = 'hmonitor-update-flyout';
export const HMONITOR_IPC_HIDE_FLYOUT: string = 'hmonitor-hide-flyout';
export const HMONITOR_IPC_FLYOUT_MOUSE_EVENT: string = 'hmonitor-flyout-mouse-event';
export const HMONITOR_IPC_FLYOUT_RESIZE: string = 'hmonitor-flyout-resize';

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
  configVersion: 0.6, // Version to handle future settings migrations
  refreshInterval: 1, // in seconds
  enabled: true,
  displayStyle: 'default',
  showSectionLabel: true,
  metricVisibility: initialMetricVisibility,
  enabledMetrics: initialEnabledMetrics,
  availableHardware: initialAvailableHardware,
  pingState: {
    isActive: false,
    hosts: [],
    enabledHosts: [],
    interval: 1000,
    timeout: 2000,
  },
  showAliasCpu: true,
  showAliasGpu: true,
  showAliasMemory: true,
  showAliasNetwork: true,
  sectionOrder: ['cpu', 'gpu', 'memory', 'network', 'uptime', 'ping'],
  uptimeOrder: ['uptimeSystem', 'uptimeApp'],
};

export const SENTRY_DSN =
  'https://13d766c04f102d67c984dcbef9544512@o4509344104316928.ingest.us.sentry.io/4511891776405504';
