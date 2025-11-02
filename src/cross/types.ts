// Represents detailed sensor information discovered on the system
export type SensorInfo = {
  Name: string;
  Type: string;
  Unit: string;
  Identifier: string;
};

// Represents a piece of hardware and all its available sensors
export type HardwareInfo = {
  name: string;
  sensors: SensorInfo[];
};

// Represents all hardware detected on the system
export type AvailableHardware = {
  cpu: HardwareInfo[];
  gpu: HardwareInfo[];
  memory: HardwareInfo[];
  network: HardwareInfo[];
};

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

export type NetworkData = {
  name: string;
  uploadSpeed: number;
  downloadSpeed: number;
  uploadData: number;
  downloadData: number;
};

export type UptimeData = {
  system: number;
  app: number;
};

// Represents a single raw sensor value sent from main to renderer
export type RawSensorValue = {Identifier: string; Value: number | null};

// Combined hardware data report sent from main to renderer
export type HardwareDataReport = {
  gpu: GpuData[];
  cpu: CpuData[];
  memory: MemoryData[];
  network: NetworkData[];
  uptime: UptimeData;
  rawSensors: RawSensorValue[]; // A flat list of all sensor values for easy lookup
};

// Configuration for which parts of a metric are visible (e.g., icon, label)
export type MetricVisibility = {icon: boolean; label: boolean; value: boolean; progressBar: boolean};

// Configuration for a user-defined custom metric
export type CustomMetricConfig = {
  id: string; // Unique ID for React keys
  label: string; // User-defined label
  sensorIdentifier: string; // The unique ID from sensor data
};

// Defines which specific metrics are enabled for a piece of hardware
export type HardwareMetricsConfig = {
  name: string; // e.g., "NVIDIA GeForce RTX 3080"
  active: boolean; // Is this hardware component monitored?
  enabled: string[]; // e.g., ['temp', 'usage', 'vram']
  custom: CustomMetricConfig[]; // User-added custom metrics
};

// Configuration for all enabled metrics across the system
export type EnabledMetrics = {
  cpu: HardwareMetricsConfig[];
  gpu: HardwareMetricsConfig[];
  memory: HardwareMetricsConfig[];
  network: HardwareMetricsConfig[];
  uptime: {system: boolean; app: boolean};
};

// Defines the visual style of the status bar
export type DisplayStyle = 'default' | 'compact' | 'two-column' | 'raw' | 'raw-two-column';

// The complete settings object for the extension
export type MonitoringSettings = {
  configVersion: number;
  enabled: boolean;
  refreshInterval: number;
  displayStyle: DisplayStyle;
  showSectionLabel: boolean;
  metricVisibility: MetricVisibility;
  enabledMetrics: EnabledMetrics;
  availableHardware: AvailableHardware;
};

// Union type for all possible metric identifiers
export type SystemMetric =
  | 'temp'
  | 'usage'
  | 'vram'
  | 'memory'
  | 'uptimeSystem'
  | 'uptimeApp'
  | 'uploadSpeed'
  | 'downloadSpeed'
  | 'uploadData'
  | 'downloadData';

// A key for each hardware type in the settings
export type MetricType = keyof Omit<EnabledMetrics, 'uptime'>;
