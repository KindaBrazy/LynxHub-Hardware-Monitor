export type HardwareData = {
  cpuTemp: number;
  cpuUsage: number;
  gpuTemp: number;
  gpuUsage: number;
  memUsed: number;
  memTotal: number;
  uptimeSystemSeconds: number;
  uptimeSeconds: number;
};

export type MonitoringSettings = {
  enabled: boolean;
  compactMode: boolean;
  showSectionLabel: boolean;
  enableMonitor: SystemMetrics[];
};

export type SystemMetrics =
  | 'cpuTemp'
  | 'cpuUsage'
  | 'gpuTemp'
  | 'gpuUsage'
  | 'memory'
  | 'uptimeSystemSeconds'
  | 'uptimeSeconds';
