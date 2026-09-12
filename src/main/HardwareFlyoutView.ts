import path from 'node:path';

import {app, BrowserWindow, WebContentsView} from 'electron';

import {
  HMONITOR_IPC_FLYOUT_MOUSE_EVENT,
  HMONITOR_IPC_FLYOUT_RESIZE,
  HMONITOR_IPC_FLYOUT_SET_RANGE,
} from '../cross/constants';
import {HardwareFlyoutAnchor, HardwareFlyoutSection, HardwareFlyoutShowData, TimeRangeOption} from '../cross/types';

const SECTION_WIDTHS: Record<HardwareFlyoutSection, number> = {
  cpu: 400,
  gpu: 400,
  memory: 380,
  network: 400,
  ping: 380,
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
  private activeRange: TimeRangeOption = 'minutes';

  private constructor() {}

  public static getInstance(): HardwareFlyoutView {
    if (!HardwareFlyoutView.instance) {
      HardwareFlyoutView.instance = new HardwareFlyoutView();
    }
    return HardwareFlyoutView.instance;
  }

  public setActiveRange(range: TimeRangeOption): void {
    this.activeRange = range;
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

    this.flyoutView.webContents.on('console-message', (_, level, message, line, sourceId) => {
      if (level >= 2) {
        console.error(`[HardwareFlyout] ${message} (line ${line}, ${sourceId})`);
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
      --bg: rgba(18, 18, 23, 0.96);
      --border: rgba(255, 255, 255, 0.1);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --card-bg: rgba(255, 255, 255, 0.04);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent: #8b5cf6;
      --accent-soft: rgba(139, 92, 246, 0.15);
      --accent-glow: rgba(139, 92, 246, 0.35);
      --success: #10b981;
      --success-soft: rgba(16, 185, 129, 0.15);
      --warning: #f59e0b;
      --warning-soft: rgba(245, 158, 11, 0.15);
      --danger: #ef4444;
      --danger-soft: rgba(239, 68, 68, 0.15);
      --cyan: #06b6d4;
      --cyan-soft: rgba(6, 182, 212, 0.15);
    }
    body.light {
      --bg: rgba(255, 255, 255, 0.96);
      --border: rgba(0, 0, 0, 0.1);
      --text-main: #111827;
      --text-muted: #6b7280;
      --card-bg: rgba(0, 0, 0, 0.03);
      --card-border: rgba(0, 0, 0, 0.07);
      --accent: #7c3aed;
      --accent-soft: rgba(124, 58, 237, 0.12);
      --accent-glow: rgba(124, 58, 237, 0.25);
    }
    .flyout-box {
      width: 100%; height: auto;
      background: var(--bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--border);
      display: flex; flex-direction: column;
      padding: 13px 15px;
      overflow: hidden;
      color: var(--text-main);
    }
    .header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 10px; padding-bottom: 7px;
      border-bottom: 1px solid var(--border);
    }
    .header-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
    .title { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .header-badges { display: flex; align-items: center; gap: 6px; }
    .badge {
      font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 6px;
      background: var(--accent-soft); color: var(--accent);
    }
    .badge-subtle {
      font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 6px;
      background: var(--card-bg); border: 1px solid var(--card-border); color: var(--text-muted);
    }

    /* Range Selector Segmented Control */
    .range-selector {
      display: flex;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 999px;
      padding: 2px;
      gap: 2px;
      margin-bottom: 10px;
    }
    .range-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 10.5px;
      font-weight: 600;
      padding: 4px 6px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      outline: none;
      text-align: center;
    }
    .range-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.05);
    }
    .range-btn.active {
      background: var(--accent);
      color: #ffffff;
      box-shadow: 0 2px 8px var(--accent-glow);
    }

    /* Unified 4-Card Stat Matrix */
    .stat-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 10px;
    }
    .stat-card-micro {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 6px 4px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .stat-card-micro .stat-label {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .stat-card-micro .stat-val {
      font-size: 13px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1.2;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    /* Modern SVG Chart Container */
    .chart-box {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 8px 10px 6px;
      margin-bottom: 10px;
      position: relative;
    }
    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 10px;
      color: var(--text-muted);
      font-weight: 600;
    }
    .chart-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .chart-legend {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      color: var(--text-muted);
    }
    .legend-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .chart-svg-wrap {
      position: relative;
      width: 100%;
      height: 72px;
    }
    .chart-svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }
    .chart-tooltip {
      position: absolute;
      pointer-events: none;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 3px 6px;
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      color: var(--text-main);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.15s ease;
      transform: translate(-50%, -125%);
      z-index: 20;
    }
    .chart-cursor-line {
      position: absolute;
      top: 0; bottom: 0; width: 1px;
      background: var(--border);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s ease;
    }

    /* Subsections and Progress Bars */
    .section-subtitle {
      font-size: 10px; font-weight: 700; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;
    }
    .progress-bar-bg {
      width: 100%; height: 6px; background: var(--card-border); border-radius: 999px; overflow: hidden; margin-top: 4px;
    }
    .progress-bar-fill {
      height: 100%; border-radius: 999px; transition: width 0.3s ease, background-color 0.3s ease;
    }
    .scroll-container {
      max-height: 130px; overflow-y: auto; overflow-x: hidden; padding-right: 2px;
    }
    .scroll-container::-webkit-scrollbar { width: 4px; }
    .scroll-container::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 4px; }
    .core-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;
    }
    .core-row {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 7px; padding: 4px 7px; font-size: 11px;
    }
    .core-label { color: var(--text-muted); font-weight: 500; font-size: 10px; }
    .core-val { font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 11px; }

    .details-card {
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 9px; padding: 8px 10px; margin-bottom: 6px;
    }
    .details-table { width: 100%; border-collapse: collapse; font-size: 11px; }
    .details-table td { padding: 3px 5px; }
    .details-table tr:nth-child(even) { background: var(--card-bg); border-radius: 6px; }
    .td-key { color: var(--text-muted); font-weight: 500; width: 35%; }
    .td-val { font-family: 'JetBrains Mono', monospace; font-weight: 600; text-align: right; }
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

    // Active Range state
    window.activeRange = 'minutes';
    window.currentFlyoutData = null;

    window.setRange = function(range) {
      window.activeRange = range;
      if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.send('${HMONITOR_IPC_FLYOUT_SET_RANGE}', range);
      }
      if (window.currentFlyoutData) {
        window.currentFlyoutData.range = range;
        window.renderFlyout(window.currentFlyoutData, true);
      }
    };


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

    function filterHistoryByRange(history, range) {
      if (!history || !Array.isArray(history) || history.length === 0) return [];
      if (range === 'overall') return history;

      const now = Date.now();
      const cutoff = range === 'minutes' ? now - (5 * 60 * 1000) : now - (60 * 60 * 1000);
      return history.filter(s => s.timestamp >= cutoff);
    }

    function formatTimeOffset(timestamp) {
      const secAgo = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
      if (secAgo < 5) return 'just now';
      if (secAgo < 60) return secAgo + 's ago';
      const minAgo = Math.floor(secAgo / 60);
      const remSec = secAgo % 60;
      if (minAgo < 60) return minAgo + 'm ' + (remSec > 0 ? remSec + 's ' : '') + 'ago';
      const hrAgo = Math.floor(minAgo / 60);
      return hrAgo + 'h ago';
    }

    // Build smooth cubic Bezier path from points
    function getSplinePath(points) {
      if (!points || points.length === 0) return '';
      if (points.length === 1) return 'M 0 ' + points[0].y.toFixed(1) + ' L 368 ' + points[0].y.toFixed(1);

      let d = 'M ' + points[0].x.toFixed(1) + ' ' + points[0].y.toFixed(1);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' +
             cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' +
             p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
      }
      return d;
    }

    // Generate Masterpiece SVG Chart Markup
    function renderSvgChart(seriesList, rawSamples, options) {
      const W = 368;
      const H = 72;
      const padTop = 6;
      const padBottom = 6;
      const chartH = H - padTop - padBottom;
      const chartId = 'chart_' + Math.random().toString(36).substr(2, 8);

      let allVals = [];
      seriesList.forEach(s => {
        allVals = allVals.concat(s.values.filter(v => v != null && !isNaN(v)));
      });

      if (allVals.length === 0) allVals = [0];
      const autoMin = options.minVal != null ? options.minVal : Math.min(0, ...allVals);
      let autoMax = options.maxVal != null ? options.maxVal : Math.max(...allVals);
      if (autoMax <= autoMin) autoMax = autoMin + 1;

      let defs = '';
      let pathsHtml = '';
      let pulseDots = '';

      seriesList.forEach((s, sIdx) => {
        const gradId = chartId + '_grad_' + sIdx;
        defs +=
          '<linearGradient id="' + gradId + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="' + s.color + '" stop-opacity="0.38"/>' +
            '<stop offset="100%" stop-color="' + s.color + '" stop-opacity="0.0"/>' +
          '</linearGradient>';

        const vals = s.values;
        const count = vals.length;
        if (count === 0) return;

        const points = vals.map((v, i) => {
          const val = v != null ? v : autoMin;
          const x = count === 1 ? W / 2 : (i / (count - 1)) * W;
          const y = padTop + chartH - ((val - autoMin) / (autoMax - autoMin)) * chartH;
          return {x, y, val};
        });

        const linePath = getSplinePath(points);
        const lastP = points[points.length - 1];

        if (s.isArea !== false && points.length > 1) {
          const areaPath = linePath + ' L ' + W + ' ' + H + ' L 0 ' + H + ' Z';
          pathsHtml += '<path d="' + areaPath + '" fill="url(#' + gradId + ')" />';
        }

        pathsHtml +=
          '<path d="' + linePath + '" fill="none" stroke="' + s.color + '" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round" />';

        if (lastP) {
          pulseDots +=
            '<circle cx="' +
            lastP.x.toFixed(1) +
            '" cy="' +
            lastP.y.toFixed(1) +
            '" r="3" fill="' +
            s.color +
            '" />' +
            '<circle cx="' +
            lastP.x.toFixed(1) +
            '" cy="' +
            lastP.y.toFixed(1) +
            '" r="6" fill="' +
            s.color +
            '" opacity="0.35" />';
        }
      });

      // Subtle Reference Gridlines
      const midValY = padTop + chartH * 0.5;
      const gridHtml =
        '<line x1="0" y1="' +
        padTop +
        '" x2="' +
        W +
        '" y2="' +
        padTop +
        '" stroke="var(--card-border)" stroke-dasharray="2,3" />' +
        '<line x1="0" y1="' +
        midValY +
        '" x2="' +
        W +
        '" y2="' +
        midValY +
        '" stroke="var(--card-border)" stroke-dasharray="2,3" />' +
        '<line x1="0" y1="' +
        (H - padBottom) +
        '" x2="' +
        W +
        '" y2="' +
        (H - padBottom) +
        '" stroke="var(--card-border)" />';


      const legendHtml = seriesList.map(s => {
        return (
          '<div class="legend-item">' +
            '<span class="legend-dot" style="background:' + s.color + '"></span>' +
            '<span>' + s.name + '</span>' +
          '</div>'
        );
      }).join('');

      return {
        chartId,
        html:
          '<div class="chart-box" id="' + chartId + '_box">' +
            '<div class="chart-header">' +
              '<span class="chart-title">' + (options.title || 'HISTORY') + '</span>' +
              '<div class="chart-legend">' + legendHtml + '</div>' +
            '</div>' +
            '<div class="chart-svg-wrap" id="' + chartId + '_wrap">' +
              '<svg class="chart-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' +
                '<defs>' + defs + '</defs>' +
                gridHtml +
                pathsHtml +
                pulseDots +
              '</svg>' +
              '<div class="chart-cursor-line" id="' + chartId + '_cursor"></div>' +
              '<div class="chart-tooltip" id="' + chartId + '_tip"></div>' +
            '</div>' +
          '</div>',
        wireEvents: function() {
          const wrap = document.getElementById(chartId + '_wrap');
          const tip = document.getElementById(chartId + '_tip');
          const cursor = document.getElementById(chartId + '_cursor');
          if (!wrap || !tip || !cursor || !rawSamples || rawSamples.length === 0) return;

          wrap.onmousemove = function(e) {
            const rect = wrap.getBoundingClientRect();
            const relX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const ratio = relX / rect.width;
            const idx = Math.min(
              rawSamples.length - 1,
              Math.max(0, Math.round(ratio * (rawSamples.length - 1)))
            );
            const sample = rawSamples[idx];
            if (!sample) return;

            cursor.style.left = relX + 'px';
            cursor.style.opacity = '1';

            let tooltipText = '';
            seriesList.forEach(s => {
              const val = s.values[idx];
              if (val != null) {
                const formatted = s.formatter ? s.formatter(val) : val + (s.unit || '');
                tooltipText += '<span style="color:' + s.color + '">' + s.name + ': ' + formatted + '</span> ';
              }
            });
            tooltipText +=
              '<span style="color:var(--text-muted); font-size:9px;">(' +
              formatTimeOffset(sample.timestamp) +
              ')</span>';

            tip.innerHTML = tooltipText;
            tip.style.left = relX + 'px';
            tip.style.top = '10px';
            tip.style.opacity = '1';
          };

          wrap.onmouseleave = function() {
            cursor.style.opacity = '0';
            tip.style.opacity = '0';
          };
        }
      };
    }

    // Main Render Function
    window.renderFlyout = function(data, isRangeChange) {
      if (!data) return {width: 0, height: 0};
      window.currentFlyoutData = data;
      document.body.className = data.darkMode === false ? 'light' : '';

      const section = data.section;
      const payload = data.payload || {};
      const container = document.getElementById('flyout');
      if (!container) return {width: 0, height: 0};

      if (data.range && !isRangeChange) {
        window.activeRange = data.range;
      }
      const range = window.activeRange || 'minutes';
      const rawHistory = data.history || [];

      const history = filterHistoryByRange(rawHistory, range);

      const rangeButtonsHtml =
        '<div class="range-selector">' +
          '<button class="range-btn' +
          (range === 'minutes' ? ' active' : '') +
          '" onclick="setRange(&apos;minutes&apos;)">Minutes</button>' +
          '<button class="range-btn' +
          (range === 'hour' ? ' active' : '') +
          '" onclick="setRange(&apos;hour&apos;)">Hour</button>' +
          '<button class="range-btn' +
          (range === 'overall' ? ' active' : '') +
          '" onclick="setRange(&apos;overall&apos;)">Overall</button>' +
        '</div>';


      let headerHtml = '';
      let statMatrixHtml = '';
      let chartObj = null;
      let extraHtml = '';

      if (section === 'cpu') {
        const cpu = payload.cpu?.data || {};
        const raw = payload.cpu?.rawSensorValues || [];
        const metrics = payload.cpu?.metrics;
        const name = cpu.name || 'Processor';
        const currentUsage = cpu.usage != null ? cpu.usage : 0;
        const currentTemp = cpu.temp != null ? cpu.temp : 0;

        const powerSensor = raw.find(
          s => s.Identifier.includes('power/0') || s.Identifier.toLowerCase().includes('package')
        );
        const powerW =
          powerSensor && powerSensor.Value != null && powerSensor.Value > 0
            ? Math.round(powerSensor.Value)
            : null;

        // Extract CPU history points
        const usageVals = history.length > 0 ? history.map(h => h.usage ?? currentUsage) : [currentUsage];
        const tempVals =
          history.length > 0
            ? history.map(h => h.temp ?? currentTemp)
            : currentTemp > 0
              ? [currentTemp]
              : [];


        const minUsage = Math.min(...usageVals);
        const maxUsage = Math.max(...usageVals);
        const avgUsage = Math.round(usageVals.reduce((a, b) => a + b, 0) / usageVals.length);

        headerHtml =
          '<div class="header">' +
            '<div class="header-left"><span class="title">' + name + '</span></div>' +
            '<div class="header-badges">' +
              (powerW != null ? '<span class="badge">' + powerW + ' W</span>' : '') +
              (currentTemp > 0 ? '<span class="badge-subtle">' + currentTemp + '°C</span>' : '') +
              '<span class="badge">CPU</span>' +
            '</div>' +
          '</div>';

        statMatrixHtml =
          '<div class="stat-matrix">' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">CURRENT</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(currentUsage) + '">' + currentUsage + '%</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MIN</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(minUsage) + '">' + minUsage + '%</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">AVG</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(avgUsage) + '">' + avgUsage + '%</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MAX</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(maxUsage) + '">' + maxUsage + '%</span>' +
            '</div>' +
          '</div>';

        const chartSeries = [
          {name: 'Load', values: usageVals, color: 'var(--accent)', unit: '%', isArea: true}
        ];
        if (tempVals.length > 0 && currentTemp > 0) {
          chartSeries.push({name: 'Temp', values: tempVals, color: 'var(--warning)', unit: '°C', isArea: false});
        }

        chartObj = renderSvgChart(chartSeries, history.length > 0 ? history : [{timestamp: Date.now()}], {
          title: 'UTILIZATION & THERMAL HISTORY',
          minVal: 0,
          maxVal: Math.max(100, maxUsage)
        });

        const coreLoads = raw.filter(
          s => s.Identifier.includes('load') &&
            (s.Identifier.includes('cpu_core') || s.Identifier.includes('core/')) &&
            s.Value != null
        );
        if (coreLoads.length > 0) {
          const coreRowsHtml = coreLoads.slice(0, 16).map((c, i) => {
            const v = Math.round(c.Value || 0);
            return '<div class="core-row">' +
              '<span class="core-label">Core ' + i + '</span>' +
              '<span class="core-val" style="color:' + getColorForVal(v) + '">' + v + '%</span>' +
            '</div>';
          }).join('');
          extraHtml =
            '<div class="section-subtitle">PER-CORE UTILIZATION</div>' +
            '<div class="scroll-container"><div class="core-grid">' + coreRowsHtml + '</div></div>';
        }
      } else if (section === 'gpu') {
        const gpu = payload.gpu?.data || {};
        const raw = payload.gpu?.rawSensorValues || [];
        const metrics = payload.gpu?.metrics;
        const name = gpu.name || 'Graphics Card';
        const currentLoad = gpu.usage != null ? gpu.usage : 0;
        const currentTemp = gpu.temp != null ? gpu.temp : 0;
        const usedVram = gpu.usedVram != null ? gpu.usedVram : 0;
        const totalVram = gpu.totalVram != null ? gpu.totalVram : 0;
        const vramPct = totalVram > 0 ? Math.round((usedVram / totalVram) * 100) : 0;

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


        const loadVals = history.length > 0 ? history.map(h => h.usage ?? currentLoad) : [currentLoad];
        const minLoad = Math.min(...loadVals);
        const maxLoad = Math.max(...loadVals);
        const avgLoad = Math.round(loadVals.reduce((a, b) => a + b, 0) / loadVals.length);

        headerHtml =
          '<div class="header">' +
            '<div class="header-left"><span class="title">' + name + '</span></div>' +
            '<div class="header-badges">' +
              (powerW != null ? '<span class="badge">' + powerW + ' W</span>' : '') +
              (currentTemp > 0 ? '<span class="badge-subtle">' + currentTemp + '°C</span>' : '') +
              '<span class="badge">GPU</span>' +
            '</div>' +
          '</div>';

        statMatrixHtml =
          '<div class="stat-matrix">' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">CURRENT</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(currentLoad) + '">' + currentLoad + '%</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MIN</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(minLoad) + '">' + minLoad + '%</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">AVG</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(avgLoad) + '">' + avgLoad + '%</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MAX</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(maxLoad) + '">' + maxLoad + '%</span>' +
            '</div>' +
          '</div>';

        const chartSeries = [
          {name: 'Load', values: loadVals, color: 'var(--cyan)', unit: '%', isArea: true}
        ];
        const tempVals = history.length > 0 ? history.map(h => h.temp ?? currentTemp).filter(t => t > 0) : [];
        if (tempVals.length > 0 && currentTemp > 0) {
          chartSeries.push({name: 'Temp', values: tempVals, color: 'var(--warning)', unit: '°C', isArea: false});
        }

        chartObj = renderSvgChart(chartSeries, history.length > 0 ? history : [{timestamp: Date.now()}], {
          title: 'GPU LOAD & TEMPERATURE',
          minVal: 0,
          maxVal: Math.max(100, maxLoad)
        });

        let vramHtml = '';
        if (totalVram > 0) {
          vramHtml =
            '<div class="details-card">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
                '<span style="font-size:10px; font-weight:600; color:var(--text-muted);">DEDICATED VRAM</span>' +
                '<span class="font-mono" style="font-size:11px; font-weight:700;">' +
                  usedVram.toFixed(1) + ' / ' + totalVram.toFixed(1) + ' GB (' + vramPct + '%)' +
                '</span>' +

              '</div>' +
              '<div class="progress-bar-bg" style="height:6px;">' +
                '<div class="progress-bar-fill" style="width:' + vramPct + '%; background:var(--accent)"></div>' +
              '</div>' +
            '</div>';
        }

        extraHtml = vramHtml;
      } else if (section === 'memory') {
        const mem = payload.memory?.data || {};
        const raw = payload.memory?.rawSensorValues || [];
        const used = mem.used != null ? mem.used : 0;
        const total = mem.total != null ? mem.total : 0;
        const avail = mem.available != null ? mem.available : Math.max(0, total - used);
        const ramPct = total > 0 ? Math.round((used / total) * 100) : 0;

        const usedVals = history.length > 0 ? history.map(h => h.used ?? used) : [used];
        const minUsed = Math.min(...usedVals);
        const maxUsed = Math.max(...usedVals);
        const avgUsed = Number((usedVals.reduce((a, b) => a + b, 0) / usedVals.length).toFixed(1));

        headerHtml =
          '<div class="header">' +
            '<div class="header-left"><span class="title">System Memory</span></div>' +
            '<div class="header-badges">' +
              '<span class="badge-subtle">' + total.toFixed(1) + ' GB Total</span>' +
              '<span class="badge">RAM</span>' +
            '</div>' +
          '</div>';

        statMatrixHtml =
          '<div class="stat-matrix">' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">CURRENT</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(ramPct) + '">' + used.toFixed(1) + ' GB</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MIN</span>' +
              '<span class="stat-val">' + minUsed.toFixed(1) + ' GB</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">AVG</span>' +
              '<span class="stat-val">' + avgUsed.toFixed(1) + ' GB</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MAX</span>' +
              '<span class="stat-val">' + maxUsed.toFixed(1) + ' GB</span>' +
            '</div>' +
          '</div>';

        const chartSeries = [
          {
            name: 'Used RAM',
            values: usedVals,
            color: 'var(--accent)',
            unit: ' GB',
            formatter: (v) => v.toFixed(1) + ' GB',
            isArea: true
          }
        ];

        chartObj = renderSvgChart(chartSeries, history.length > 0 ? history : [{timestamp: Date.now()}], {
          title: 'RAM UTILIZATION PROFILE',
          minVal: 0,
          maxVal: Math.max(total, maxUsed)
        });

        const virtUsedSensor = raw.find(s => s.Identifier.includes('virtual') && s.Identifier.includes('data/0'));
        const virtAvailSensor = raw.find(s => s.Identifier.includes('virtual') && s.Identifier.includes('data/1'));
        const virtUsed = virtUsedSensor && virtUsedSensor.Value != null ? virtUsedSensor.Value : 0;
        const virtAvail = virtAvailSensor && virtAvailSensor.Value != null ? virtAvailSensor.Value : 0;
        const virtTotal = virtUsed + virtAvail;
        const virtPct = virtTotal > 0 ? Math.round((virtUsed / virtTotal) * 100) : 0;

        let virtualRamHtml = '';
        if (virtTotal > 0) {
          virtualRamHtml =
            '<div class="details-card">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
                '<span style="font-size:10px; font-weight:600; color:var(--text-muted);">VIRTUAL / PAGE FILE</span>' +
                '<span class="font-mono" style="font-size:11px; font-weight:700;">' +
                  virtUsed.toFixed(1) + ' / ' + virtTotal.toFixed(1) + ' GB (' + virtPct + '%)' +
                '</span>' +
              '</div>' +
              '<div class="progress-bar-bg" style="height:6px;">' +
                '<div class="progress-bar-fill" style="width:' + virtPct + '%; background:var(--accent)"></div>' +
              '</div>' +
            '</div>';
        }

        extraHtml =
          '<div class="details-card">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
              '<span style="font-size:10px; font-weight:600; color:var(--text-muted);">PHYSICAL ALLOCATION</span>' +
              '<span class="font-mono" style="font-size:11px; font-weight:700;">' +
              ramPct +
              '% In Use</span>' +
            '</div>' +
            '<div class="progress-bar-bg" style="height:6px;">' +
              '<div class="progress-bar-fill" style="width:' +
              ramPct +
              '%; background:' +
              getColorForVal(ramPct) +
              '"></div>' +
            '</div>' +
            '<div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Free & Cache Available: ' +
            avail.toFixed(1) +
            ' GB</div>' +
          '</div>' +
          virtualRamHtml;


      } else if (section === 'network') {
        const net = payload.network?.data || {};
        const details = (payload.network?.networkDetails || [])[0] || {};
        const downSpeed = net.downloadSpeed != null ? net.downloadSpeed : 0;
        const upSpeed = net.uploadSpeed != null ? net.uploadSpeed : 0;
        const downTotal = net.downloadData != null ? net.downloadData : 0;
        const upTotal = net.uploadData != null ? net.uploadData : 0;

        const downVals = history.length > 0 ? history.map(h => h.downloadSpeed ?? downSpeed) : [downSpeed];
        const upVals = history.length > 0 ? history.map(h => h.uploadSpeed ?? upSpeed) : [upSpeed];

        const minDown = Math.min(...downVals);
        const maxDown = Math.max(...downVals);
        const avgDown = Math.round(downVals.reduce((a, b) => a + b, 0) / downVals.length);

        const maxUp = Math.max(...upVals);
        const avgUp = Math.round(upVals.reduce((a, b) => a + b, 0) / upVals.length);

        headerHtml =
          '<div class="header">' +
            '<div class="header-left"><span class="title">' +
            (details.name || net.name || 'Network Interface') +
            '</span></div>' +
            '<div class="header-badges">' +
              '<span class="badge">NETWORK</span>' +
            '</div>' +
          '</div>';

        statMatrixHtml =
          '<div class="stat-matrix">' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">CURRENT</span>' +
              '<span class="stat-val" style="color:var(--success); font-size:11px;">' +
              formatSpeed(downSpeed) +
              '</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MIN</span>' +
              '<span class="stat-val" style="font-size:11px;">' +
              formatSpeed(minDown) +
              '</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">AVG</span>' +
              '<span class="stat-val" style="color:var(--success); font-size:11px;">' +
              formatSpeed(avgDown) +
              '</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MAX</span>' +
              '<span class="stat-val" style="color:var(--cyan); font-size:11px;">' +
              formatSpeed(maxDown) +
              '</span>' +
            '</div>' +
          '</div>';

        const chartSeries = [
          {
            name: 'Down',
            values: downVals,
            color: 'var(--success)',
            formatter: (v) => formatSpeed(v),
            isArea: true
          },
          {
            name: 'Up',
            values: upVals,
            color: 'var(--accent)',
            formatter: (v) => formatSpeed(v),
            isArea: false
          }
        ];

        chartObj = renderSvgChart(chartSeries, history.length > 0 ? history : [{timestamp: Date.now()}], {
          title: 'BANDWIDTH THROUGHPUT',
          minVal: 0,
          maxVal: Math.max(1024, maxDown, maxUp)
        });

        const detailRows = [];
        if (downTotal > 0 || upTotal > 0) {
          detailRows.push(
            '<tr><td class="td-key">Data Used</td><td class="td-val">↓ ' +
              formatBytes(downTotal) +
              ' · ↑ ' +
              formatBytes(upTotal) +
              '</td></tr>'
          );
        }
        if (details.ipv4) {
          detailRows.push('<tr><td class="td-key">IPv4</td><td class="td-val">' + details.ipv4 + '</td></tr>');
        }
        if (details.gateway) {
          detailRows.push('<tr><td class="td-key">Gateway</td><td class="td-val">' + details.gateway + '</td></tr>');
        }
        if (details.dns && details.dns.length > 0) {
          detailRows.push(
            '<tr><td class="td-key">DNS</td><td class="td-val">' +
              details.dns.slice(0, 2).join(', ') +
              '</td></tr>'
          );
        }
        if (details.mac) {
          detailRows.push('<tr><td class="td-key">MAC</td><td class="td-val">' + details.mac + '</td></tr>');
        }

        if (detailRows.length > 0) {
          extraHtml = '<table class="details-table">' + detailRows.join('') + '</table>';
        }
      } else if (section === 'ping') {
        const p = payload.ping || {};
        const host = p.host || 'Target Host';
        const pingData = p.data || {};
        const lat = pingData.latency != null && pingData.latency >= 0 ? pingData.latency : null;

        const pingSamples = history.length > 0 ? history : (payload.ping?.history || []);
        const validLatencies = pingSamples.map(h => h.latency).filter(l => l != null && l >= 0);
        const minPing = validLatencies.length > 0 ? Math.min(...validLatencies) : (lat || 0);
        const maxPing = validLatencies.length > 0 ? Math.max(...validLatencies) : (lat || 0);
        const avgPing = validLatencies.length > 0 ?
          Math.round(validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length) : (lat || 0);

        const totalPackets = pingSamples.length;
        const droppedPackets = pingSamples.filter(s => s.latency == null).length;
        const lossPct = totalPackets > 0 ? Math.round((droppedPackets / totalPackets) * 100) : 0;

        const lossBadge =
          lossPct > 0
            ? '<span class="badge" style="background:var(--danger-soft); color:var(--danger);">' +
              lossPct +
              '% Loss</span>'
            : '';
        const pingBadgeColor = lat != null ? getColorForVal(lat, 50, 100) : 'var(--danger)';

        headerHtml =
          '<div class="header">' +
            '<div class="header-left"><span class="title">Ping: ' + host + '</span></div>' +
            '<div class="header-badges">' +
              lossBadge +
              '<span class="badge" style="color:' + pingBadgeColor + '">' +
                (lat != null ? lat + ' ms' : 'Offline') +
              '</span>' +
            '</div>' +
          '</div>';

        statMatrixHtml =
          '<div class="stat-matrix">' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">CURRENT</span>' +
              '<span class="stat-val" style="color:' + pingBadgeColor + '">' +
                (lat != null ? lat + ' ms' : 'Offline') +
              '</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MIN</span>' +
              '<span class="stat-val">' + minPing + ' ms</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">AVG</span>' +
              '<span class="stat-val" style="color:' + getColorForVal(avgPing, 50, 100) + '">' +
                avgPing + ' ms' +
              '</span>' +
            '</div>' +
            '<div class="stat-card-micro">' +
              '<span class="stat-label">MAX</span>' +
              '<span class="stat-val">' + maxPing + ' ms</span>' +
            '</div>' +
          '</div>';

        const chartSeries = [
          {
            name: 'Latency',
            values: validLatencies.length > 0 ? validLatencies : [lat || 0],
            color: lat != null ? getColorForVal(avgPing, 50, 100) : 'var(--danger)',
            unit: ' ms',
            isArea: true
          }
        ];

        chartObj = renderSvgChart(chartSeries, pingSamples.length > 0 ? pingSamples : [{timestamp: Date.now()}], {
          title: 'NETWORK ROUND-TRIP TIME',
          minVal: 0,
          maxVal: Math.max(60, maxPing + 10)
        });

        const reliabilityColor = lossPct > 0 ? 'var(--danger)' : 'var(--success)';
        extraHtml =
          '<div class="details-card" style="display:flex; justify-content:space-between; ' +
          'align-items:center; font-size:11px;">' +
            '<span style="color:var(--text-muted)">Reliability (Loss Rate):</span>' +
            '<span class="font-mono" style="font-weight:700; color:' +
            reliabilityColor +
            '">' +
              lossPct +
              '% loss (' +
              (totalPackets - droppedPackets) +
              '/' +
              totalPackets +
              ' ok)</span>' +
          '</div>';

      }


      container.innerHTML =
        headerHtml +
        rangeButtonsHtml +
        statMatrixHtml +
        (chartObj ? chartObj.html : '') +
        extraHtml;

      if (chartObj && typeof chartObj.wireEvents === 'function') {
        chartObj.wireEvents();
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
    const width = data.width || (this.activeSection ? SECTION_WIDTHS[this.activeSection] : 400);
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
    showData.range = this.activeRange;

    const width = SECTION_WIDTHS[showData.section] || 400;
    this.flyoutView.setBounds({x: -5000, y: -5000, width, height: 320});

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
        this.updateBounds(width, 280);
      }
    }
  }

  public update(updateData: {
    section: HardwareFlyoutSection;
    payload: any;
    darkMode?: boolean;
    history?: any[];
    range?: TimeRangeOption;
  }): void {
    if (!this.isShowing || !this.flyoutView || this.flyoutView.webContents.isDestroyed()) return;
    if (this.activeSection !== updateData.section) return;

    updateData.range = this.activeRange;
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
    }, 220);
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
