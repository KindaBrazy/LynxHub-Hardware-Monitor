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

export type HMonitorStorageType = {
  enabled: boolean;
  compactMode: boolean;
  showSectionLabel: boolean;
  enableMonitor: InfoType[];
};

export type InfoType =
  | 'cpuTemp'
  | 'cpuUsage'
  | 'gpuTemp'
  | 'gpuUsage'
  | 'memory'
  | 'uptimeSystemSeconds'
  | 'uptimeSeconds';
