import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {omit} from 'lodash-es';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {HMONITOR_IPC_SET_CONFIG, initialSettings} from '../../cross/constants';
import {
  CustomMetricConfig,
  EnabledMetrics,
  HardwareMetricsConfig,
  MetricType,
  MetricVisibility,
  MonitoringSettings,
  PingState,
} from '../../cross/types';

type MonitoringSettingsTypes = {
  [K in keyof MonitoringSettings]: MonitoringSettings[K];
};

const initialState: MonitoringSettings = {
  ...initialSettings,
};

const hmonitorSlice = createSlice({
  initialState,
  name: 'hmonitor',
  reducers: {
    // A generic action to update any top-level state property
    updateState: <K extends keyof MonitoringSettings>(
      state: MonitoringSettings,
      action: PayloadAction<{key: K; value: MonitoringSettings[K]}>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    // Replaces the entire configuration, used for syncing with the main process
    setConfig: (state: MonitoringSettings, action: PayloadAction<MonitoringSettings>) => {
      return {...state, ...action.payload};
    },
    setPingState: (state: MonitoringSettings, action: PayloadAction<PingState>) => {
      state.pingState = action.payload;
    },
    // Persists the current settings by sending them to the main process
    saveSettings: state => {
      window.electron.ipcRenderer.send(HMONITOR_IPC_SET_CONFIG, JSON.stringify(omit(state, 'modals')));
    },
    updateHardwareMetrics: (
      state,
      action: PayloadAction<Pick<HardwareMetricsConfig, 'name' | 'enabled'> & {type: MetricType}>,
    ) => {
      const {type, name, enabled} = action.payload;
      const hardwareList = state.enabledMetrics[type] as HardwareMetricsConfig[];
      const index = hardwareList.findIndex(item => item.name === name);
      if (index !== -1) {
        hardwareList[index].enabled = enabled;
      }
    },
    updateHardwareActive: (state, action: PayloadAction<{type: MetricType; name: string; active: boolean}>) => {
      const {type, name, active} = action.payload;
      const hardwareList = state.enabledMetrics[type] as HardwareMetricsConfig[];
      const index = hardwareList.findIndex(item => item.name === name);
      if (index !== -1) {
        hardwareList[index].active = active;
      }
    },
    updateMetricVisibility: (state, action: PayloadAction<MetricVisibility>) => {
      state.metricVisibility = action.payload;
    },
    updateUptime: (state, action: PayloadAction<Partial<EnabledMetrics['uptime']>>) => {
      state.enabledMetrics.uptime = {...state.enabledMetrics.uptime, ...action.payload};
    },
    addCustomMetric: (state, action: PayloadAction<{type: MetricType; name: string; metric: CustomMetricConfig}>) => {
      const {type, name, metric} = action.payload;
      const hardwareList = state.enabledMetrics[type] as HardwareMetricsConfig[];
      const hardware = hardwareList.find(item => item.name === name);
      if (hardware) {
        hardware.custom.push(metric);
        if (!hardware.enabled.includes(metric.id)) {
          hardware.enabled.push(metric.id);
        }
      }
    },
    removeCustomMetric: (state, action: PayloadAction<{type: MetricType; name: string; metricId: string}>) => {
      const {type, name, metricId} = action.payload;
      const hardwareList = state.enabledMetrics[type] as HardwareMetricsConfig[];
      const hardware = hardwareList.find(item => item.name === name);
      if (hardware) {
        hardware.custom = hardware.custom.filter(m => m.id !== metricId);
        hardware.enabled = hardware.enabled.filter(m => m !== metricId);
      }
    },
    updateSectionOrder: (state, action: PayloadAction<string[]>) => {
      state.sectionOrder = action.payload;
    },
    updateUptimeOrder: (state, action: PayloadAction<string[]>) => {
      state.uptimeOrder = action.payload;
    },
  },
});

// A typed selector hook for accessing the extension's state
export const useHMonitorSelector: TypedUseSelectorHook<{hmonitor: MonitoringSettings}> = useSelector;

export const useHMonitorState = <T extends keyof MonitoringSettings>(propertyName: T): MonitoringSettingsTypes[T] =>
  useSelector((state: any) => state.hmonitor[propertyName]);

export const hmonitorActions = hmonitorSlice.actions;
export default hmonitorSlice.reducer;
