import {HardwareReport} from '@lynxhub/hwmonitor';

import {
  CPU_LOAD_CANDIDATES,
  CPU_TEMP_CANDIDATES,
  findGpuLoad,
  findSensorValue,
  GPU_TEMP_CANDIDATES,
  GPU_VRAM_TOTAL_CANDIDATES,
  GPU_VRAM_USED_CANDIDATES,
  MEMORY_AVAILABLE_CANDIDATES,
  MEMORY_USED_CANDIDATES,
  NETWORK_DOWNLOAD_SPEED_CANDIDATES,
  NETWORK_UPLOAD_SPEED_CANDIDATES,
} from '../cross/sensorUtils';
import {
  CpuTelemetrySample,
  GpuTelemetrySample,
  HardwareFlyoutSection,
  MemoryTelemetrySample,
  NetworkTelemetrySample,
  PingTelemetrySample,
  TimeRangeOption,
} from '../cross/types';

const MAX_HIGH_RES_SAMPLES = 3600; // 1 hour at 1s intervals
const FIVE_MINUTES_MS = 5 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;

const convertMBtoGB = (mb: number): number => Number((mb / 1024).toFixed(2));

/**
 * Manages time-series telemetry history for CPU, GPU, Memory, Network, and Ping.
 * Runs in the Electron main process so telemetry is continuous and ready immediately on hover.
 */
export class HardwareTelemetryHistory {
  private static instance: HardwareTelemetryHistory;

  private cpuHistory = new Map<string, CpuTelemetrySample[]>();
  private gpuHistory = new Map<string, GpuTelemetrySample[]>();
  private memoryHistory = new Map<string, MemoryTelemetrySample[]>();
  private networkHistory = new Map<string, NetworkTelemetrySample[]>();
  private pingHistory = new Map<string, PingTelemetrySample[]>();

  private constructor() {}

  public static getInstance(): HardwareTelemetryHistory {
    if (!HardwareTelemetryHistory.instance) {
      HardwareTelemetryHistory.instance = new HardwareTelemetryHistory();
    }
    return HardwareTelemetryHistory.instance;
  }

  public recordHardwareReport(data: HardwareReport): void {
    if (!data) return;
    const now = Date.now();

    // CPU telemetry
    if (data.CPU && data.CPU.length > 0) {
      data.CPU.forEach(cpu => {
        const key = cpu.Name || 'default';
        const rawTemp = findSensorValue(cpu.Sensors, CPU_TEMP_CANDIDATES, 'Temperature', {requirePositive: true});
        const rawUsage = findSensorValue(cpu.Sensors, CPU_LOAD_CANDIDATES, 'Load');
        const sample: CpuTelemetrySample = {
          timestamp: now,
          usage: rawUsage != null ? Math.round(rawUsage) : 0,
          temp: rawTemp != null ? Math.round(rawTemp) : 0,
        };

        const list = this.cpuHistory.get(key) || [];
        list.push(sample);
        if (list.length > MAX_HIGH_RES_SAMPLES) list.shift();
        this.cpuHistory.set(key, list);
      });
    }

    // GPU telemetry
    if (data.GPU && data.GPU.length > 0) {
      data.GPU.forEach(gpu => {
        const key = gpu.Name || 'default';
        const rawTemp = findSensorValue(gpu.Sensors, GPU_TEMP_CANDIDATES, 'Temperature', {requirePositive: true});
        const rawTotalVram = findSensorValue(gpu.Sensors, GPU_VRAM_TOTAL_CANDIDATES);
        const rawUsedVram = findSensorValue(gpu.Sensors, GPU_VRAM_USED_CANDIDATES);
        const totalVram = convertMBtoGB(rawTotalVram ?? 0);
        const usedVram = convertMBtoGB(rawUsedVram ?? 0);
        const load = findGpuLoad(gpu.Sensors);

        const sample: GpuTelemetrySample = {
          timestamp: now,
          usage: load,
          temp: rawTemp != null ? Math.round(rawTemp) : 0,
          usedVram: totalVram > 0 ? usedVram : 0,
        };

        const list = this.gpuHistory.get(key) || [];
        list.push(sample);
        if (list.length > MAX_HIGH_RES_SAMPLES) list.shift();
        this.gpuHistory.set(key, list);
      });
    }

    // Memory telemetry
    if (data.Memory && data.Memory.length > 0) {
      data.Memory.forEach(mem => {
        const key = mem.Name || 'default';
        const used = findSensorValue(mem.Sensors, MEMORY_USED_CANDIDATES, 'Data') ?? 0;
        const available = findSensorValue(mem.Sensors, MEMORY_AVAILABLE_CANDIDATES, 'Data') ?? 0;
        const total = used + available;
        const pct = total > 0 ? Math.round((used / total) * 100) : 0;

        const sample: MemoryTelemetrySample = {
          timestamp: now,
          used: Number(used.toFixed(1)),
          total: Number(total.toFixed(1)),
          pct,
        };

        const list = this.memoryHistory.get(key) || [];
        list.push(sample);
        if (list.length > MAX_HIGH_RES_SAMPLES) list.shift();
        this.memoryHistory.set(key, list);
      });
    }

    // Network telemetry
    if (data.Network && data.Network.length > 0) {
      data.Network.forEach(net => {
        const key = net.Name || 'default';
        const uploadSpeed = findSensorValue(net.Sensors, NETWORK_UPLOAD_SPEED_CANDIDATES) ?? 0;
        const downloadSpeed = findSensorValue(net.Sensors, NETWORK_DOWNLOAD_SPEED_CANDIDATES) ?? 0;

        const sample: NetworkTelemetrySample = {
          timestamp: now,
          downloadSpeed,
          uploadSpeed,
        };

        const list = this.networkHistory.get(key) || [];
        list.push(sample);
        if (list.length > MAX_HIGH_RES_SAMPLES) list.shift();
        this.networkHistory.set(key, list);
      });
    }
  }

  public recordPing(host: string, latency: number | undefined, alive: boolean): void {
    const now = Date.now();
    const sample: PingTelemetrySample = {
      timestamp: now,
      latency: alive && latency != null && latency >= 0 ? latency : null,
    };

    const list = this.pingHistory.get(host) || [];
    list.push(sample);
    if (list.length > MAX_HIGH_RES_SAMPLES) list.shift();
    this.pingHistory.set(host, list);
  }

  public getHistory(section: HardwareFlyoutSection, targetKey?: string): any[] {
    switch (section) {
      case 'cpu': {
        if (targetKey && this.cpuHistory.has(targetKey)) {
          return this.cpuHistory.get(targetKey) || [];
        }
        const first = this.cpuHistory.values().next().value;
        return first || [];
      }
      case 'gpu': {
        if (targetKey && this.gpuHistory.has(targetKey)) {
          return this.gpuHistory.get(targetKey) || [];
        }
        const first = this.gpuHistory.values().next().value;
        return first || [];
      }
      case 'memory': {
        if (targetKey && this.memoryHistory.has(targetKey)) {
          return this.memoryHistory.get(targetKey) || [];
        }
        for (const [name, samples] of this.memoryHistory.entries()) {
          if (!name.toLowerCase().includes('virtual')) {
            return samples;
          }
        }
        const first = this.memoryHistory.values().next().value;
        return first || [];
      }
      case 'network': {
        if (targetKey && this.networkHistory.has(targetKey)) {
          return this.networkHistory.get(targetKey) || [];
        }
        const first = this.networkHistory.values().next().value;
        return first || [];
      }
      case 'ping': {
        if (targetKey && this.pingHistory.has(targetKey)) {
          return this.pingHistory.get(targetKey) || [];
        }
        const first = this.pingHistory.values().next().value;
        return first || [];
      }
      default:
        return [];
    }
  }

  public filterSamples<T extends {timestamp: number}>(samples: T[], range: TimeRangeOption): T[] {
    if (!samples || samples.length === 0) return [];
    if (range === 'overall') return samples;

    const now = Date.now();
    const cutoff = range === 'minutes' ? now - FIVE_MINUTES_MS : now - ONE_HOUR_MS;
    return samples.filter(s => s.timestamp >= cutoff);
  }

  public clear(): void {
    this.cpuHistory.clear();
    this.gpuHistory.clear();
    this.memoryHistory.clear();
    this.networkHistory.clear();
    this.pingHistory.clear();
  }
}

export const hardwareTelemetryHistory = HardwareTelemetryHistory.getInstance();
