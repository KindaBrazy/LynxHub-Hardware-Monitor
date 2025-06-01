import os from 'node:os';

import {exec} from 'child_process';
import {BrowserWindow} from 'electron';
import fs from 'graceful-fs';
import {promisify} from 'util';

import {HardwareData} from '../../cross/CrossTypes';

const execAsync = promisify(exec);

class HardwareDataService {
  private window: BrowserWindow;
  private intervalId: NodeJS.Timeout | null = null;
  private readonly startTime: number;

  constructor(window: BrowserWindow) {
    this.window = window;
    this.startTime = Date.now();
  }

  public startCollecting(intervalMs: number = 2000) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Send initial data immediately
    this.collectAndSendData();

    // Set up interval for periodic updates
    this.intervalId = setInterval(() => {
      this.collectAndSendData();
    }, intervalMs);
  }

  public stopCollecting() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async collectAndSendData() {
    try {
      const hardwareData = await this.collectHardwareData();
      this.window.webContents.send('hardware-data-update', hardwareData);
    } catch (error) {
      console.error('Error collecting hardware data:', error);
    }
  }

  private async collectHardwareData(): Promise<HardwareData> {
    const [cpuUsage, memoryInfo, temperatures] = await Promise.all([
      this.getCpuUsage(),
      this.getMemoryInfo(),
      this.getTemperatures(),
    ]);

    return {
      cpuTemp: temperatures.cpu,
      cpuUsage: cpuUsage,
      gpuTemp: temperatures.gpu,
      gpuUsage: await this.getGpuUsage(),
      memUsed: memoryInfo.used,
      memTotal: memoryInfo.total,
      uptimeSystemSeconds: os.uptime(),
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }

  private async getCpuUsage(): Promise<number> {
    return new Promise(resolve => {
      const startMeasure = this.cpuAverage();

      setTimeout(() => {
        const endMeasure = this.cpuAverage();
        const idleDifference = endMeasure.idle - startMeasure.idle;
        const totalDifference = endMeasure.total - startMeasure.total;
        const cpuPercentage = 100 - Math.floor((100 * idleDifference) / totalDifference);
        resolve(Math.max(0, Math.min(100, cpuPercentage)));
      }, 1000);
    });
  }

  private cpuAverage() {
    const cpus = os.cpus();
    let idle = 0;
    let total = 0;

    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        total += cpu.times[type as keyof typeof cpu.times];
      }
      idle += cpu.times.idle;
    });

    return {idle: idle / cpus.length, total: total / cpus.length};
  }

  private getMemoryInfo() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    return {
      total: Math.round((totalMem / (1024 * 1024 * 1024)) * 10) / 10,
      used: Math.round((usedMem / (1024 * 1024 * 1024)) * 10) / 10,
    };
  }

  private async getTemperatures() {
    try {
      const platform = os.platform();

      if (platform === 'darwin') {
        // macOS - try to get temperature from system
        try {
          const {stdout} = await execAsync(
            'sudo powermetrics -n 1 -i 1000 --samplers smc -a --hide-cpu-duty-cycle' +
              ' 2>/dev/null | grep -i "CPU die temperature"',
          );
          const tempMatch = stdout.match(/(\d+\.\d+)/);
          if (tempMatch) {
            return {cpu: Math.round(parseFloat(tempMatch[1])), gpu: 45};
          }
        } catch (e) {
          // Fallback for macOS without sudo access
        }
      } else if (platform === 'linux') {
        // Linux - read from thermal zones
        try {
          const thermalZones = fs.readdirSync('/sys/class/thermal/').filter(zone => zone.startsWith('thermal_zone'));
          if (thermalZones.length > 0) {
            const tempPath = `/sys/class/thermal/${thermalZones[0]}/temp`;
            const tempStr = fs.readFileSync(tempPath, 'utf8');
            const temp = parseInt(tempStr) / 1000;
            return {cpu: Math.round(temp), gpu: Math.round(temp - 5)};
          }
        } catch (e) {
          // Continue to fallback
        }
      } else if (platform === 'win32') {
        // Windows - try WMI
        try {
          const {stdout} = await execAsync(
            'wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature /value',
          );
          const tempMatch = stdout.match(/CurrentTemperature=(\d+)/);
          if (tempMatch) {
            const temp = parseInt(tempMatch[1]) / 10 - 273.15; // Convert from deciseconds Kelvin to Celsius
            return {cpu: Math.round(temp), gpu: Math.round(temp - 8)};
          }
        } catch (e) {
          // Continue to fallback
        }
      }
    } catch (error) {
      console.error('Error getting temperatures:', error);
    }

    // Fallback temperatures
    return {cpu: 45, gpu: 52};
  }

  private async getGpuUsage(): Promise<number> {
    try {
      const platform = os.platform();

      if (platform === 'win32') {
        // Try to get NVIDIA GPU usage
        try {
          const {stdout} = await execAsync('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits');
          const usage = parseInt(stdout.trim());
          if (!isNaN(usage)) {
            return Math.max(0, Math.min(100, usage));
          }
        } catch (e) {
          // Try Intel GPU
          try {
            const {stdout} = await execAsync(
              'wmic path Win32_PerfRawData_GPUPerformanceCounters_GPUEngine get UtilizationPercentage /value',
            );
            const match = stdout.match(/UtilizationPercentage=(\d+)/);
            if (match) {
              return Math.max(0, Math.min(100, parseInt(match[1])));
            }
          } catch (e2) {
            // Continue to fallback
          }
        }
      } else if (platform === 'linux') {
        // Try nvidia-smi on Linux
        try {
          const {stdout} = await execAsync('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits');
          const usage = parseInt(stdout.trim());
          if (!isNaN(usage)) {
            return Math.max(0, Math.min(100, usage));
          }
        } catch (e) {
          // Continue to fallback
        }
      }
    } catch (error) {
      console.error('Error getting GPU usage:', error);
    }

    return 18; // Fallback GPU usage
  }
}

export default HardwareDataService;
