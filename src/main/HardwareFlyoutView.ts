import path from 'node:path';

import {app, BrowserWindow, WebContentsView} from 'electron';

import {HMONITOR_IPC_FLYOUT_MOUSE_EVENT, HMONITOR_IPC_FLYOUT_RESIZE} from '../cross/constants';
import {HardwareFlyoutAnchor, HardwareFlyoutSection, HardwareFlyoutShowData} from '../cross/types';

const SECTION_WIDTHS: Record<HardwareFlyoutSection, number> = {
  cpu: 380,
  gpu: 380,
  memory: 360,
  network: 380,
  ping: 360,
};

/**
 * Manages an independent WebContentsView attached to mainWindow.contentView
 * to display telemetry popovers above all views (including browser WebContentsViews).
 */
export class HardwareFlyoutView {
  private static instance: HardwareFlyoutView;
  private mainWindow?: BrowserWindow;
  private flyoutView?: WebContentsView;
  private isShowing = false;
  private activeSection?: HardwareFlyoutSection;
  private currentAnchor?: HardwareFlyoutAnchor;
  private hideTimer?: NodeJS.Timeout;
  private isMouseInsideFlyout = false;
  private isMouseInsideTrigger = false;
  private isViewLoaded = false;
  private pendingShowData?: HardwareFlyoutShowData;

  private constructor() {}

  public static getInstance(): HardwareFlyoutView {
    if (!HardwareFlyoutView.instance) {
      HardwareFlyoutView.instance = new HardwareFlyoutView();
    }
    return HardwareFlyoutView.instance;
  }

  public attach(mainWindow: BrowserWindow): void {
    this.mainWindow = mainWindow;

    if (!this.flyoutView || this.flyoutView.webContents.isDestroyed()) {
      const preloadPath = path.join(app.getAppPath(), 'out/preload/index.cjs');
      this.flyoutView = new WebContentsView({
        webPreferences: {
          preload: preloadPath,
          sandbox: false,
        },
      });

      this.flyoutView.webContents.setBackgroundThrottling(false);
      this.flyoutView.setBorderRadius(16);
      this.flyoutView.setBackgroundColor('#00000000');
      this.flyoutView.setBounds({x: -5000, y: -5000, width: 0, height: 0});
      this.setupViewListeners();
      this.loadFlyoutHtml();
    }

    try {
      mainWindow.contentView.removeChildView(this.flyoutView);
    } catch {
      // Ignored
    }
    mainWindow.contentView.addChildView(this.flyoutView);

    this.setupWindowListeners(mainWindow);
  }

  private setupViewListeners(): void {
    if (!this.flyoutView) return;

    this.flyoutView.webContents.on('did-finish-load', () => {
      this.isViewLoaded = true;
      if (this.pendingShowData) {
        const data = this.pendingShowData;
        this.pendingShowData = undefined;
        void this.show(data);
      }
    });

    this.flyoutView.webContents.on('before-input-event', (_, input) => {
      if (input.key === 'Escape') {
        this.hide();
      }
    });
  }

  private setupWindowListeners(window: BrowserWindow): void {
    window.on('blur', () => this.hide());
    window.on('hide', () => this.hide());
    window.on('minimize', () => this.hide());
  }

  private loadFlyoutHtml(): void {
    if (!this.flyoutView || this.flyoutView.webContents.isDestroyed()) return;

    const html = `<!DOCTYPE html>
<html lang="en" style="background: transparent !important; background-color: transparent !important;">
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
      background: transparent !important; background-color: transparent !important;
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      user-select: none;
    }
    :root {
      --bg: #121217;
      --border: rgba(255, 255, 255, 0.1);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --card-bg: rgba(255, 255, 255, 0.04);
      --card-border: rgba(255, 255, 255, 0.07);
      --accent: #8b5cf6;
      --accent-soft: rgba(139, 92, 246, 0.15);
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
    }
    body.light {
      --bg: #ffffff;
      --border: rgba(0, 0, 0, 0.09);
      --text-main: #111827;
      --text-muted: #6b7280;
      --card-bg: rgba(0, 0, 0, 0.03);
      --card-border: rgba(0, 0, 0, 0.06);
      --accent: #7c3aed;
      --accent-soft: rgba(124, 58, 237, 0.12);
    }
    .flyout-box {
      width: 100%; height: auto;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      display: flex; flex-direction: column;
      padding: 14px 16px;
      overflow: hidden;
      color: var(--text-main);
    }
    .header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 12px; padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .header-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
    .header-icon { color: var(--accent); flex-shrink: 0; }
    .title { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .badge {
      font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 6px;
      background: var(--accent-soft); color: var(--accent);
    }
    .grid-summary {
      display: grid; gap: 8px; margin-bottom: 12px;
    }
    .stat-card {
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 10px; padding: 8px; text-align: center;
    }
    .stat-label { font-size: 10px; color: var(--text-muted); font-weight: 500; margin-bottom: 3px; }
    .stat-val { font-size: 14px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
    .progress-bar-bg {
      width: 100%; height: 6px; background: var(--card-border); border-radius: 999px; overflow: hidden; margin-top: 4px;
    }
    .progress-bar-fill {
      height: 100%; border-radius: 999px; transition: width 0.3s ease, background-color 0.3s ease;
    }
    .section-subtitle {
      font-size: 11px; font-weight: 700; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;
    }
    .scroll-container {
      max-height: 140px; overflow-y: auto; overflow-x: hidden; padding-right: 2px;
    }
    .scroll-container::-webkit-scrollbar { width: 4px; }
    .scroll-container::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 4px; }
    .core-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;
    }
    .core-row {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 8px; padding: 5px 8px; font-size: 11px;
    }
    .core-label { color: var(--text-muted); font-weight: 500; font-size: 10px; }
    .core-val { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; }
    .details-table { width: 100%; border-collapse: collapse; font-size: 11px; }
    .details-table td { padding: 4px 6px; }
    .details-table tr:nth-child(even) { background: var(--card-bg); border-radius: 6px; }
    .td-key { color: var(--text-muted); font-weight: 500; width: 38%; }
    .td-val { font-family: 'JetBrains Mono', monospace; font-weight: 600; text-align: right; }
    .sparkline-row {
      display: flex; align-items: flex-end; gap: 2px; height: 36px;
      padding: 4px 6px; background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 8px; margin-top: 6px;
    }
    .sparkline-bar {
      flex: 1; min-width: 3px; background: var(--accent); border-radius: 2px;
      transition: height 0.2s ease;
    }
  </style>
</head>
<body style="background: transparent !important; background-color: transparent !important;">
  <div id="flyout" class="flyout-box"></div>
  <script>
    document.addEventListener('mouseenter', () => {
      if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.send('${HMONITOR_IPC_FLYOUT_MOUSE_EVENT}', 'enter');
      }
    });
    document.addEventListener('mouseleave', () => {
      if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.send('${HMONITOR_IPC_FLYOUT_MOUSE_EVENT}', 'leave');
      }
    });

    const reportResize = () => {
      const el = document.getElementById('flyout');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const height = Math.ceil(rect.height || el.offsetHeight || el.scrollHeight);
      const width = Math.ceil(rect.width || el.offsetWidth);
      if (height > 0 && window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.send('${HMONITOR_IPC_FLYOUT_RESIZE}', {width, height});
      }
    };

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        reportResize();
      });
      const el = document.getElementById('flyout');
      if (el) ro.observe(el);
    }

    function getColorForVal(val, low=60, med=80) {
      if (val >= med) return 'var(--danger)';
      if (val >= low) return 'var(--warning)';
      return 'var(--success)';
    }

    function formatSpeed(bytesPerSec) {
      if (!bytesPerSec || bytesPerSec <= 0) return '0.0 B/s';
      const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
      let idx = 0;
      let val = bytesPerSec;
      while (val >= 1024 && idx < units.length - 1) {
        val /= 1024;
        idx++;
      }
      return val.toFixed(1) + ' ' + units[idx];
    }

    function formatBytes(bytes) {
      if (!bytes || bytes <= 0) return '0.0 MB';
      const mb = bytes / (1024 * 1024);
      if (mb >= 1024) return (mb / 1024).toFixed(2) + ' GB';
      return mb.toFixed(1) + ' MB';
    }

    function isMetricEnabled(metrics, metricId) {
      if (!metrics || !Array.isArray(metrics.enabled)) return true;
      return metrics.enabled.includes(metricId);
    }

    window.renderFlyout = function(data) {
      if (!data) return {width: 0, height: 0};
      document.body.className = data.darkMode === false ? 'light' : '';
      const section = data.section;
      const payload = data.payload || {};
      const container = document.getElementById('flyout');
      if (!container) return {width: 0, height: 0};

      if (section === 'cpu') {
        const cpu = payload.cpu?.data || {};
        const raw = payload.cpu?.rawSensorValues || [];
        const metrics = payload.cpu?.metrics;
        const temp = cpu.temp != null ? cpu.temp : 0;
        const usage = cpu.usage != null ? cpu.usage : 0;
        const name = cpu.name || 'Processor';

        const powerSensor = raw.find(
          s => s.Identifier.includes('power/0') || s.Identifier.toLowerCase().includes('package')
        );
        const powerW =
          powerSensor && powerSensor.Value != null && powerSensor.Value > 0 ? Math.round(powerSensor.Value) : null;

        const statCards = [];
        if (isMetricEnabled(metrics, 'usage') && cpu.usage != null) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">UTILIZATION</div>' +
              '<div class="stat-val" style="color:' + getColorForVal(usage) + '">' + usage + '%</div>' +
              '<div class="progress-bar-bg">' +
                '<div class="progress-bar-fill" style="width:' + usage + '%; background:' +
                  getColorForVal(usage) + '"></div>' +
              '</div>' +
            '</div>'
          );
        }

        if (isMetricEnabled(metrics, 'temp') && temp > 0) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">TEMPERATURE</div>' +
              '<div class="stat-val" style="color:' + getColorForVal(temp, 65, 85) + '">' +
                temp + '°C' +
              '</div>' +
              '<div class="progress-bar-bg">' +
                '<div class="progress-bar-fill" style="width:' + Math.min(100, temp) + '%; background:' +
                  getColorForVal(temp, 65, 85) + '"></div>' +
              '</div>' +
            '</div>'
          );
        }

        const coreLoads = raw.filter(
          s => s.Identifier.includes('load') &&
            (s.Identifier.includes('cpu_core') || s.Identifier.includes('core/')) &&
            s.Value != null
        );

        let coreRowsHtml = '';
        if (coreLoads.length > 0) {
          coreRowsHtml = coreLoads.slice(0, 16).map((c, i) => {
            const v = Math.round(c.Value || 0);
            return '<div class="core-row">' +
              '<span class="core-label">Core ' + i + '</span>' +
              '<span class="core-val" style="color:' + getColorForVal(v) + '">' + v + '%</span>' +
            '</div>';
          }).join('');
        }

        let summaryGridHtml = '';
        if (statCards.length > 0) {
          summaryGridHtml =
            '<div class="grid-summary" style="grid-template-columns: repeat(' +
            statCards.length +
            ', 1fr);">' +
            statCards.join('') +
            '</div>';
        }

        let coreSectionHtml = '';
        if (coreRowsHtml) {
          coreSectionHtml = '<div class="section-subtitle">PER-CORE BREAKDOWN</div>' +
            '<div class="scroll-container"><div class="core-grid">' + coreRowsHtml + '</div></div>';
        }

        container.innerHTML =
          '<div class="header">' +
            '<div class="header-left">' +
              '<span class="title">' + name + '</span>' +
            '</div>' +
            (powerW != null ? '<span class="badge">' + powerW + ' W</span>' : '<span class="badge">CPU</span>') +
          '</div>' +
          summaryGridHtml +
          coreSectionHtml;
      } else if (section === 'gpu') {
        const gpu = payload.gpu?.data || {};
        const raw = payload.gpu?.rawSensorValues || [];
        const metrics = payload.gpu?.metrics;
        const name = gpu.name || 'Graphics Card';
        const temp = gpu.temp != null ? gpu.temp : 0;
        const usage = gpu.usage != null ? gpu.usage : 0;
        const usedVram = gpu.usedVram != null ? gpu.usedVram : 0;
        const totalVram = gpu.totalVram != null ? gpu.totalVram : 0;
        const vramPct = totalVram > 0 ? Math.round((usedVram / totalVram) * 100) : 0;

        const statCards = [];

        if (isMetricEnabled(metrics, 'usage') && gpu.usage != null) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">LOAD</div>' +
              '<div class="stat-val" style="color:' + getColorForVal(usage) + '">' + usage + '%</div>' +
              '<div class="progress-bar-bg">' +
                '<div class="progress-bar-fill" style="width:' + usage + '%; background:' +
                  getColorForVal(usage) + '"></div>' +
              '</div>' +
            '</div>'
          );
        }

        if (isMetricEnabled(metrics, 'temp') && temp > 0) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">TEMP</div>' +
              '<div class="stat-val" style="color:' + getColorForVal(temp, 65, 85) + '">' +
                temp + '°C' +
              '</div>' +
              '<div class="progress-bar-bg">' +
                '<div class="progress-bar-fill" style="width:' + Math.min(100, temp) + '%; background:' +
                  getColorForVal(temp, 65, 85) + '"></div>' +
              '</div>' +
            '</div>'
          );
        }

        const fanSensor = raw.find(s => s.Identifier.includes('fan') || s.Identifier.includes('control'));
        const fanVal =
          fanSensor && fanSensor.Value != null && fanSensor.Value > 0 ? Math.round(fanSensor.Value) : null;

        const hotSpotSensor = raw.find(
          s => s.Identifier.toLowerCase().includes('hotspot') || s.Identifier.includes('temperature/1')
        );
        const hotSpot =
          hotSpotSensor && hotSpotSensor.Value != null && hotSpotSensor.Value > 0
            ? Math.round(hotSpotSensor.Value)
            : null;

        if (hotSpot != null) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">HOT SPOT</div>' +
              '<div class="stat-val" style="color:' + getColorForVal(hotSpot, 75, 95) + '">' + hotSpot + '°C</div>' +
            '</div>'
          );
        } else if (fanVal != null) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">FAN</div>' +
              '<div class="stat-val">' + fanVal + '%</div>' +
            '</div>'
          );
        }

        let summaryGridHtml = '';
        if (statCards.length > 0) {
          summaryGridHtml =
            '<div class="grid-summary" style="grid-template-columns: repeat(' +
            statCards.length +
            ', 1fr);">' +
            statCards.join('') +
            '</div>';
        }

        let vramHtml = '';
        if (isMetricEnabled(metrics, 'vram') && totalVram > 0) {
          vramHtml =
            '<div class="stat-card" style="text-align:left;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
                '<span class="stat-label">VRAM USAGE</span>' +
                '<span class="stat-val" style="font-size:12px;">' +
                  usedVram.toFixed(1) + ' / ' + totalVram.toFixed(1) + ' GB (' + vramPct + '%)' +
                '</span>' +
              '</div>' +
              '<div class="progress-bar-bg" style="height:8px;">' +
                '<div class="progress-bar-fill" style="width:' + vramPct + '%; background:var(--accent)"></div>' +
              '</div>' +
            '</div>';
        }

        const powerSensor = raw.find(
          s =>
            s.Identifier.includes('power/0') ||
            s.Identifier.toLowerCase().includes('gpu power') ||
            s.Identifier.toLowerCase().includes('board power')
        );
        const powerW =
          powerSensor && powerSensor.Value != null && powerSensor.Value > 0
            ? Math.round(powerSensor.Value)
            : null;

        container.innerHTML =
          '<div class="header">' +
            '<div class="header-left"><span class="title">' + name + '</span></div>' +
            (powerW != null ? '<span class="badge">' + powerW + ' W</span>' : '<span class="badge">GPU</span>') +
          '</div>' +
          summaryGridHtml +
          vramHtml;
      } else if (section === 'memory') {
        const mem = payload.memory?.data || {};
        const raw = payload.memory?.rawSensorValues || [];
        const metrics = payload.memory?.metrics;
        const used = mem.used != null ? mem.used : 0;
        const total = mem.total != null ? mem.total : 0;
        const avail = mem.available != null ? mem.available : Math.max(0, total - used);
        const ramPct = total > 0 ? Math.round((used / total) * 100) : 0;

        const virtUsedSensor = raw.find(s => s.Identifier.includes('virtual') && s.Identifier.includes('data/0'));
        const virtAvailSensor = raw.find(s => s.Identifier.includes('virtual') && s.Identifier.includes('data/1'));
        const virtUsed = virtUsedSensor && virtUsedSensor.Value != null ? virtUsedSensor.Value : 0;
        const virtAvail = virtAvailSensor && virtAvailSensor.Value != null ? virtAvailSensor.Value : 0;
        const virtTotal = virtUsed + virtAvail;
        const virtPct = virtTotal > 0 ? Math.round((virtUsed / virtTotal) * 100) : 0;

        let physicalRamHtml = '';
        if (isMetricEnabled(metrics, 'memory') && total > 0) {
          physicalRamHtml =
            '<div class="stat-card" style="text-align:left;' + (virtTotal > 0 ? ' margin-bottom:10px;' : '') + '">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
                '<span class="stat-label">PHYSICAL RAM</span>' +
                '<span class="stat-val" style="font-size:12px;">' +
                  used.toFixed(1) + ' / ' + total.toFixed(1) + ' GB (' + ramPct + '%)' +
                '</span>' +
              '</div>' +
              '<div class="progress-bar-bg" style="height:8px;">' +
                '<div class="progress-bar-fill" style="width:' + ramPct + '%; background:' +
                  getColorForVal(ramPct) + '"></div>' +
              '</div>' +
              '<div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Available: ' +
                avail.toFixed(1) + ' GB' +
              '</div>' +
            '</div>';
        }

        let virtualRamHtml = '';
        if (virtTotal > 0) {
          virtualRamHtml =
            '<div class="stat-card" style="text-align:left;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
                '<span class="stat-label">VIRTUAL / PAGE FILE</span>' +
                '<span class="stat-val" style="font-size:12px;">' +
                  virtUsed.toFixed(1) + ' / ' + virtTotal.toFixed(1) + ' GB (' + virtPct + '%)' +
                '</span>' +
              '</div>' +
              '<div class="progress-bar-bg" style="height:8px;">' +
                '<div class="progress-bar-fill" style="width:' + virtPct + '%; background:var(--accent)"></div>' +
              '</div>' +
            '</div>';
        }

        container.innerHTML =
          '<div class="header">' +
            '<div class="header-left"><span class="title">System Memory</span></div>' +
            '<span class="badge">RAM</span>' +
          '</div>' +
          physicalRamHtml +
          virtualRamHtml;
      } else if (section === 'network') {
        const net = payload.network?.data || {};
        const details = (payload.network?.networkDetails || [])[0] || {};
        const metrics = payload.network?.metrics;
        const downSpeed = net.downloadSpeed != null ? net.downloadSpeed : 0;
        const upSpeed = net.uploadSpeed != null ? net.uploadSpeed : 0;
        const downTotal = net.downloadData != null ? net.downloadData : 0;
        const upTotal = net.uploadData != null ? net.uploadData : 0;

        const statCards = [];
        const showDown = isMetricEnabled(metrics, 'downloadSpeed');
        const showDownData = isMetricEnabled(metrics, 'downloadData');
        if (showDown || (showDownData && downTotal > 0)) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">DOWNLOAD SPEED</div>' +
              '<div class="stat-val" style="color:var(--success)">' + formatSpeed(downSpeed) + '</div>' +
              (showDownData && downTotal > 0 ?
                '<div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Total: ' +
                  formatBytes(downTotal) +
                '</div>' : '') +
            '</div>'
          );
        }

        const showUp = isMetricEnabled(metrics, 'uploadSpeed');
        const showUpData = isMetricEnabled(metrics, 'uploadData');
        if (showUp || (showUpData && upTotal > 0)) {
          statCards.push(
            '<div class="stat-card">' +
              '<div class="stat-label">UPLOAD SPEED</div>' +
              '<div class="stat-val" style="color:var(--accent)">' + formatSpeed(upSpeed) + '</div>' +
              (showUpData && upTotal > 0 ?
                '<div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Total: ' +
                  formatBytes(upTotal) +
                '</div>' : '') +
            '</div>'
          );
        }

        let summaryGridHtml = '';
        if (statCards.length > 0) {
          summaryGridHtml =
            '<div class="grid-summary" style="grid-template-columns: repeat(' +
            statCards.length +
            ', 1fr);">' +
            statCards.join('') +
            '</div>';
        }

        const detailRows = [];
        if (details.ipv4) {
          detailRows.push('<tr><td class="td-key">IPv4</td><td class="td-val">' + details.ipv4 + '</td></tr>');
        }
        if (details.gateway) {
          detailRows.push('<tr><td class="td-key">Gateway</td><td class="td-val">' + details.gateway + '</td></tr>');
        }
        if (details.dns && details.dns.length > 0) {
          detailRows.push(
            '<tr><td class="td-key">DNS</td><td class="td-val">' + details.dns.slice(0, 2).join(', ') + '</td></tr>'
          );
        }
        if (details.mac) {
          detailRows.push('<tr><td class="td-key">MAC</td><td class="td-val">' + details.mac + '</td></tr>');
        }

        let detailsTableHtml = '';
        if (detailRows.length > 0) {
          detailsTableHtml = '<table class="details-table">' + detailRows.join('') + '</table>';
        }

        container.innerHTML =
          '<div class="header">' +
            '<div class="header-left"><span class="title">' +
              (details.name || net.name || 'Network Adapter') +
            '</span></div>' +
            '<span class="badge">NETWORK</span>' +
          '</div>' +
          summaryGridHtml +
          detailsTableHtml;
      } else if (section === 'ping') {
        const p = payload.ping || {};
        const host = p.host || 'Target Host';
        const data = p.data || {};
        const history = p.history || [];
        const lat = data.latency != null && data.latency > 0 ? data.latency : null;

        const validHistory = history.map(h => h.latency).filter(l => l != null && l > 0);
        const hasStats = validHistory.length > 0 || lat != null;
        const minPing = validHistory.length > 0 ? Math.min(...validHistory) : (lat || 0);
        const maxPing = validHistory.length > 0 ? Math.max(...validHistory) : (lat || 0);
        const avgPing = validHistory.length > 0 ?
          Math.round(validHistory.reduce((a, b) => a + b, 0) / validHistory.length) : (lat || 0);

        let summaryGridHtml = '';
        if (hasStats) {
          summaryGridHtml =
            '<div class="grid-summary" style="grid-template-columns: repeat(3, 1fr);">' +
              '<div class="stat-card">' +
                '<div class="stat-label">MIN</div><div class="stat-val" style="font-size:12px;">' +
                  minPing + ' ms' +
                '</div>' +
              '</div>' +
              '<div class="stat-card">' +
                '<div class="stat-label">AVG</div><div class="stat-val" style="font-size:12px; color:' +
                  getColorForVal(avgPing, 50, 120) + '">' + avgPing + ' ms' +
                '</div>' +
              '</div>' +
              '<div class="stat-card">' +
                '<div class="stat-label">MAX</div><div class="stat-val" style="font-size:12px;">' +
                  maxPing + ' ms' +
                '</div>' +
              '</div>' +
            '</div>';
        }

        const sparklineBars = history.slice(-24).map(h => {
          const l = h.latency;
          const hPct = l != null && l > 0 ? Math.max(10, Math.min(100, (l / (maxPing || 100)) * 100)) : 10;
          const bg = l == null || l <= 0 ? 'var(--danger)' : getColorForVal(l, 50, 120);
          return '<div class="sparkline-bar" style="height:' + hPct + '%; background:' + bg + '"></div>';
        }).join('');

        let sparklineHtml = '';
        if (sparklineBars) {
          sparklineHtml =
            '<div class="section-subtitle">LATENCY HISTORY</div>' +
            '<div class="sparkline-row">' + sparklineBars + '</div>';
        }

        container.innerHTML =
          '<div class="header">' +
            '<div class="header-left"><span class="title">Ping: ' + host + '</span></div>' +
            '<span class="badge">' + (lat != null ? lat + ' ms' : 'Offline') + '</span>' +
          '</div>' +
          summaryGridHtml +
          sparklineHtml;
      }

      const rect = container.getBoundingClientRect();
      const height = Math.ceil(rect.height || container.offsetHeight || container.scrollHeight);
      const width = Math.ceil(rect.width || container.offsetWidth);
      return {width, height};
    };
  </script>
</body>
</html>`;

    this.flyoutView.webContents.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
  }

  public updateBounds(width: number, height: number): void {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return;
    if (!this.flyoutView || this.flyoutView.webContents.isDestroyed()) return;
    if (!this.currentAnchor) return;

    const [winW, winH] = this.mainWindow.getContentSize();

    let x = Math.floor(this.currentAnchor.x + this.currentAnchor.width / 2 - width / 2);
    if (x < 10) x = 10;
    if (x + width > winW - 10) x = winW - width - 10;

    let y = Math.floor(this.currentAnchor.y - height - 8);
    if (y < 40) {
      y = Math.floor(this.currentAnchor.y + this.currentAnchor.height + 8);
    }
    if (y + height > winH - 10) {
      y = Math.max(10, winH - height - 10);
    }

    this.flyoutView.setBounds({x, y, width, height});
    this.flyoutView.setBorderRadius(16);
    this.flyoutView.setBackgroundColor('#00000000');
  }

  public onResize(data: {width?: number; height: number}): void {
    if (!this.isShowing || !this.currentAnchor) return;
    const width = data.width || (this.activeSection ? SECTION_WIDTHS[this.activeSection] : 380);
    if (data.height > 0) {
      this.updateBounds(width, data.height);
    }
  }

  public async show(showData: HardwareFlyoutShowData): Promise<void> {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) return;
    if (!this.flyoutView || this.flyoutView.webContents.isDestroyed()) return;

    if (!this.isViewLoaded) {
      this.pendingShowData = showData;
      return;
    }

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }

    this.isMouseInsideTrigger = true;
    this.activeSection = showData.section;
    this.currentAnchor = showData.anchor;

    const width = SECTION_WIDTHS[showData.section] || 380;
    this.flyoutView.setBounds({x: -5000, y: -5000, width, height: 260});

    // Re-add view to ensure it stays on top of any newly painted browser views
    try {
      this.mainWindow.contentView.removeChildView(this.flyoutView);
    } catch {
      // Ignored
    }
    this.mainWindow.contentView.addChildView(this.flyoutView);
    this.flyoutView.setBorderRadius(16);
    this.flyoutView.setBackgroundColor('#00000000');

    this.isShowing = true;

    try {
      const script = `window.renderFlyout(${JSON.stringify(showData)})`;
      const dims = (await this.flyoutView.webContents.executeJavaScript(script)) as
        {width: number; height: number} | undefined;
      if (this.isShowing && dims && typeof dims.height === 'number' && dims.height > 0) {
        this.updateBounds(width, dims.height);
      }
    } catch {
      if (this.isShowing) {
        this.updateBounds(width, 220);
      }
    }
  }

  public update(updateData: {section: HardwareFlyoutSection; payload: any; darkMode?: boolean}): void {
    if (!this.isShowing || !this.flyoutView || this.flyoutView.webContents.isDestroyed()) return;
    if (this.activeSection !== updateData.section) return;

    const script = `window.renderFlyout(${JSON.stringify(updateData)})`;
    this.flyoutView.webContents.executeJavaScript(script).catch(() => {});
  }

  public onTriggerLeave(): void {
    this.isMouseInsideTrigger = false;
    this.scheduleHideCheck();
  }

  public onFlyoutMouseEvent(eventType: 'enter' | 'leave'): void {
    if (eventType === 'enter') {
      this.isMouseInsideFlyout = true;
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = undefined;
      }
    } else {
      this.isMouseInsideFlyout = false;
      this.scheduleHideCheck();
    }
  }

  private scheduleHideCheck(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.hideTimer = setTimeout(() => {
      this.hideTimer = undefined;
      if (!this.isMouseInsideTrigger && !this.isMouseInsideFlyout) {
        this.hide();
      }
    }, 120);
  }

  public hide(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }

    this.isShowing = false;
    this.isMouseInsideFlyout = false;
    this.isMouseInsideTrigger = false;
    this.activeSection = undefined;
    this.currentAnchor = undefined;

    if (this.flyoutView && !this.flyoutView.webContents.isDestroyed()) {
      this.flyoutView.setBounds({x: -5000, y: -5000, width: 0, height: 0});
    }
  }
}

export const hardwareFlyoutView = HardwareFlyoutView.getInstance();
