export type SensorLike = {
  Name?: string;
  Type?: string;
  Value?: number | null;
  Unit?: string;
  Identifier?: string;
};

export const CPU_TEMP_CANDIDATES = [
  'CPU Package',
  'Core (Tctl/Tdie)',
  'CPU Tctl',
  'CPU Tdie',
  'CPU CCD1 Temperature',
  'Core Max',
  'Core Average',
  'CPU Total',
  'CPU Core',
];

export const CPU_LOAD_CANDIDATES = ['CPU Total', 'Total Load', 'CPU Core #1'];

export const GPU_TEMP_CANDIDATES = ['GPU Core', 'GPU Temperature', 'GPU Hot Spot', 'GPU Edge'];

export const GPU_LOAD_CANDIDATES = ['GPU Core', 'GPU Total', 'D3D 3D', 'Compute_0'];

export const GPU_VRAM_TOTAL_CANDIDATES = ['GPU Memory Total', 'Dedicated Memory Total', 'D3D Dedicated Memory Total'];

export const GPU_VRAM_USED_CANDIDATES = ['GPU Memory Used', 'D3D Dedicated Memory Used', 'Dedicated Memory Used'];

export const MEMORY_USED_CANDIDATES = ['Memory Used', 'Used Memory'];

export const MEMORY_AVAILABLE_CANDIDATES = ['Memory Available', 'Available Memory', 'Memory Free', 'Free Memory'];

export const NETWORK_UPLOAD_SPEED_CANDIDATES = ['Upload Speed', 'Network Upload Speed', 'Upload'];

export const NETWORK_DOWNLOAD_SPEED_CANDIDATES = ['Download Speed', 'Network Download Speed', 'Download'];

export const NETWORK_UPLOAD_DATA_CANDIDATES = ['Data Uploaded', 'Bytes Uploaded', 'Total Upload'];

export const NETWORK_DOWNLOAD_DATA_CANDIDATES = ['Data Downloaded', 'Bytes Downloaded', 'Total Download'];

/**
 * Finds a sensor value based on prioritized candidate names, with substring fallback.
 * Validates that reading is numerical and optionally strictly positive.
 */
export const findSensorValue = (
  sensors: SensorLike[] = [],
  candidateNames: string[],
  type?: string,
  options?: {requirePositive?: boolean},
): number | null => {
  const requirePositive = options?.requirePositive ?? false;

  const isValidValue = (val: unknown): val is number =>
    typeof val === 'number' && !Number.isNaN(val) && (!requirePositive || val > 0);

  // 1. Exact Name match in candidate priority order
  for (const name of candidateNames) {
    const sensor = sensors.find(s => s.Name === name && (!type || s.Type === type));
    if (sensor && isValidValue(sensor.Value)) {
      return sensor.Value;
    }
  }

  // 2. Case-insensitive substring match in candidate priority order
  for (const candidate of candidateNames) {
    const lowerCandidate = candidate.toLowerCase();
    const sensor = sensors.find(
      s => (!type || s.Type === type) && s.Name && s.Name.toLowerCase().includes(lowerCandidate),
    );
    if (sensor && isValidValue(sensor.Value)) {
      return sensor.Value;
    }
  }

  // 3. Fallback: Any sensor of the matching type if specified
  if (type) {
    const sensor = sensors.find(s => s.Type === type && isValidValue(s.Value));
    if (sensor && isValidValue(sensor.Value)) {
      return sensor.Value;
    }
  }

  return null;
};

/**
 * Resolves GPU load accurately across gaming (3D rasterization), AI/ML compute (CUDA/Tensor/DirectCompute),
 * and video processing workloads.
 */
export const findGpuLoad = (sensors: SensorLike[] = []): number => {
  const loadSensors = sensors.filter(s => s.Type === 'Load' && typeof s.Value === 'number' && !Number.isNaN(s.Value));
  if (loadSensors.length === 0) return 0;

  // 1. Overall GPU core/total sensor if present
  const coreSensor = loadSensors.find(s => s.Name === 'GPU Core' || s.Name === 'GPU Total');

  // 2. Active 3D or Compute/AI engine sensors (D3D 3D, D3D Compute, Compute_0, CUDA, Tensor, etc.)
  const engineSensors = loadSensors.filter(s => {
    if (!s.Name) return false;
    const nameLower = s.Name.toLowerCase();
    return (
      nameLower.includes('d3d 3d') ||
      nameLower.includes('compute') ||
      nameLower.includes('cuda') ||
      nameLower.includes('tensor')
    );
  });

  const candidates = [...(coreSensor ? [coreSensor.Value!] : []), ...engineSensors.map(s => s.Value!)];

  if (candidates.length > 0) {
    return Math.min(100, Math.round(Math.max(...candidates, 0)));
  }

  // Fallback to general sensor lookup
  const fallback = findSensorValue(sensors, GPU_LOAD_CANDIDATES, 'Load') ?? 0;
  return Math.min(100, Math.round(fallback));
};
