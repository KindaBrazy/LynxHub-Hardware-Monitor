import {join} from 'node:path';

import HardwareMonitor, {HardwareReport, MonitorError} from '@lynxhub/hwmonitor';
import {app, WebContents} from 'electron';

import {HMONITOR_IPC_DATA_ID} from '../cross/CrossConst';
import {SystemMetrics} from '../cross/CrossTypes';

let hwMonitor: HardwareMonitor | undefined = undefined;

export function startMonitoring(webContents: WebContents, _metrics: SystemMetrics[]) {
  hwMonitor = new HardwareMonitor();
  const targetDir = join(app.getPath('downloads'), 'LynxHub');
  hwMonitor
    .checkRequirements(targetDir)
    .then(() => {
      hwMonitor?.on('data', (data: HardwareReport) => {
        webContents.send(HMONITOR_IPC_DATA_ID, data);
      });
      hwMonitor?.on('error', (error: MonitorError) => {
        console.error('Timed Monitoring Error:', error.message);
        if (error.stderrData) console.error('Stderr:', error.stderrData);
        if (error.rawError) console.error('Raw Error:', error.rawError);
      });

      hwMonitor?.startTimed(1000, ['cpu', 'gpu', 'memory', 'uptime']);
    })
    .catch(console.error);
}

export function stopMonitoring() {
  hwMonitor?.stopTimed();
}
