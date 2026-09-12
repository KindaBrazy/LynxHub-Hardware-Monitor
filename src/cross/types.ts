// Represents detailed sensor information discovered on the system
export type SensorInfo = {
  Name: string;
  Type: string;
  Unit: string;
  Identifier: string;
  Value?: number | null;
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
  sensors?: SensorInfo[];
};

export type CpuData = {
  name: string;
  temp: number;
  usage: number;
  sensors?: SensorInfo[];
};

export type MemoryData = {
  name: string;
  used: number;
  available: number;
  total: number;
  sensors?: SensorInfo[];
};

export type NetworkData = {
  name: string;
  uploadSpeed: number;
  downloadSpeed: number;
  uploadData: number;
  downloadData: number;
  sensors?: SensorInfo[];
};

export type NetworkInterfaceDetails = {
  name: string;
  ipv4?: string;
  ipv6?: string;
  gateway?: string;
  dns?: string[];
  mac?: string;
};

export type PingHistorySample = {
  timestamp: number;
  latency: number | null;
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
  networkDetails?: NetworkInterfaceDetails[];
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
  pingState: PingState;
  showAliasCpu: boolean;
  showAliasGpu: boolean;
  showAliasMemory: boolean;
  showAliasNetwork: boolean;
  sectionOrder?: string[];
  uptimeOrder?: string[];
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

export type PingConfig = {
  host: string;
  intervalMs: number;
  timeoutMs?: number;
};

export type PingResult = {
  host: string;
  alive: boolean;
  latency?: number; // in milliseconds
  timestamp: Date;
  rawOutput?: string;
  error?: string;
};

export type PingState = {
  isActive: boolean;
  hosts: string[];
  enabledHosts: string[];
  interval: number;
  timeout: number;
};

export type PingData = {
  host: string;
  timeString: string;
  latency: number | undefined;
};

export type TimeRangeOption = 'minutes' | 'hour' | 'overall';

export type MetricStats = {
  current: number;
  min: number;
  avg: number;
  max: number;
};

export type CpuTelemetrySample = {
  timestamp: number;
  usage: number;
  temp: number;
};

export type GpuTelemetrySample = {
  timestamp: number;
  usage: number;
  temp: number;
  usedVram: number;
};

export type MemoryTelemetrySample = {
  timestamp: number;
  used: number; // GB
  total: number; // GB
  pct: number;
};

export type NetworkTelemetrySample = {
  timestamp: number;
  downloadSpeed: number; // bytes/sec
  uploadSpeed: number; // bytes/sec
};

export type PingTelemetrySample = {
  timestamp: number;
  latency: number | null;
};

export type TelemetryHistoryMap = {
  cpu?: CpuTelemetrySample[];
  gpu?: GpuTelemetrySample[];
  memory?: MemoryTelemetrySample[];
  network?: NetworkTelemetrySample[];
  ping?: PingTelemetrySample[];
};

export type HardwareFlyoutSection = 'cpu' | 'gpu' | 'memory' | 'network' | 'ping';

export type CpuFlyoutPayload = {
  data: CpuData | undefined;
  rawSensorValues: RawSensorValue[];
  metrics?: HardwareMetricsConfig;
  history?: CpuTelemetrySample[];
};

export type GpuFlyoutPayload = {
  data: GpuData | undefined;
  rawSensorValues: RawSensorValue[];
  metrics?: HardwareMetricsConfig;
  history?: GpuTelemetrySample[];
};

export type MemoryFlyoutPayload = {
  data: MemoryData | undefined;
  rawSensorValues: RawSensorValue[];
  metrics?: HardwareMetricsConfig;
  history?: MemoryTelemetrySample[];
};

export type NetworkFlyoutPayload = {
  data: NetworkData | undefined;
  networkDetails?: NetworkInterfaceDetails[];
  rawSensorValues: RawSensorValue[];
  metrics?: HardwareMetricsConfig;
  history?: NetworkTelemetrySample[];
};

export type PingFlyoutPayload = {
  host: string;
  data: PingData | null;
  history: (PingHistorySample | PingTelemetrySample)[];
};

export type HardwareFlyoutPayload = {
  section: HardwareFlyoutSection;
  cpu?: CpuFlyoutPayload;
  gpu?: GpuFlyoutPayload;
  memory?: MemoryFlyoutPayload;
  network?: NetworkFlyoutPayload;
  ping?: PingFlyoutPayload;
};

export type HardwareFlyoutAnchor = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HardwareFlyoutShowData = {
  section: HardwareFlyoutSection;
  anchor: HardwareFlyoutAnchor;
  payload: HardwareFlyoutPayload;
  darkMode?: boolean;
  history?: any[];
  range?: TimeRangeOption;
};
