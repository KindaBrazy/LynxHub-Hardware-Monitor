export type AvailableHardware = {cpu: string[]; gpu: string[]; memory: string[]};

export type GpuData = {
  name: string;
  temp: number;
  usage: number;
  totalVram: number;
  usedVram: number;
};
export type CpuData = {
  name: string;
  temp: number;
  usage: number;
};
export type MemoryData = {
  name: string;
  used: number;
  available: number;
  total: number;
};
export type UptimeData = {
  system: number;
  app: number;
};
export type HardwareData = {
  gpu: GpuData[];
  cpu: CpuData[];
  memory: MemoryData[];
  uptime: UptimeData;
};

export type MonitoringSettings = {
  enabled: boolean;
  compactMode: boolean;
  showSectionLabel: boolean;
  showMetricLabel: boolean;
  refreshInterval: number;
  enabledMetrics: NewSystemMetrics;
};

export type SystemMetrics = 'temp' | 'usage' | 'vram' | 'memory' | 'uptimeSystemSeconds' | 'uptimeSeconds';

export type MetricItem = {name: string; active: boolean; enabled: string[]}[];

export type NewSystemMetrics = {
  cpu: MetricItem;
  gpu: MetricItem;
  memory: MetricItem;
  uptime: {system: boolean; app: boolean};
};

export type MetricType = keyof NewSystemMetrics;
