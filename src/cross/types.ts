// Represents the hardware detected on the system
export type AvailableHardware = {cpu: string[]; gpu: string[]; memory: string[]};

// Data structures for individual hardware components
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

// Combined hardware data report sent from main to renderer
export type HardwareDataReport = {
  gpu: GpuData[];
  cpu: CpuData[];
  memory: MemoryData[];
  uptime: UptimeData;
};

// Configuration for which parts of a metric are visible (e.g., icon, label)
export type MetricVisibility = {icon: boolean; label: boolean; value: boolean; progressBar: boolean};

// Defines which specific metrics are enabled for a piece of hardware
export type HardwareMetricsConfig = {
  name: string; // e.g., "NVIDIA GeForce RTX 3080"
  active: boolean; // Is this hardware component monitored?
  enabled: string[]; // e.g., ['temp', 'usage', 'vram']
};

// Configuration for all enabled metrics across the system
export type EnabledMetrics = {
  cpu: HardwareMetricsConfig[];
  gpu: HardwareMetricsConfig[];
  memory: HardwareMetricsConfig[];
  uptime: {system: boolean; app: boolean};
};

// The complete settings object for the extension
export type MonitoringSettings = {
  configVersion: number;
  enabled: boolean;
  refreshInterval: number;
  compactMode: boolean;
  showSectionLabel: boolean;
  metricVisibility: MetricVisibility;
  enabledMetrics: EnabledMetrics;
  availableHardware: AvailableHardware;
};

// Union type for all possible metric identifiers
export type SystemMetric = 'temp' | 'usage' | 'vram' | 'memory' | 'uptimeSystem' | 'uptimeApp';

// A key for each hardware type in the settings
export type MetricType = keyof Omit<EnabledMetrics, 'uptime'>;
