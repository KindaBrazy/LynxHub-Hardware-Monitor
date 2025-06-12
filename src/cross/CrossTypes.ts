export type HardwareData = {
  cpuTemp: number;
  cpuUsage: number;
  gpuTemp: number;
  gpuUsage: number;
  vramTotal: number;
  vramUsed: number;
  memUsed: number;
  memTotal: number;
  uptimeSystemSeconds: number;
  uptimeSeconds: number;
};

export type MonitoringSettings = {
  enabled: boolean;
  compactMode: boolean;
  showSectionLabel: boolean;
  refreshInterval: number;
  enabledMetrics: SystemMetrics[];
};

export type SystemMetrics =
  | 'cpuTemp'
  | 'cpuUsage'
  | 'gpuTemp'
  | 'gpuUsage'
  | 'vram'
  | 'memory'
  | 'uptimeSystemSeconds'
  | 'uptimeSeconds';
