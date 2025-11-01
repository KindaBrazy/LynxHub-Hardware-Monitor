import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {omit} from 'lodash';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {HMONITOR_IPC_SET_CONFIG, initialSettings} from '../../cross/constants';
import {
  CustomMetricConfig,
  EnabledMetrics,
  HardwareMetricsConfig,
  MetricType,
  MetricVisibility,
  MonitoringSettings,
} from '../../cross/types';

export type SystemMonitorState = MonitoringSettings & {
  modals: {isOpen: boolean; tabID: string}[];
};

type SystemMonitorStateTypes = {
  [K in keyof SystemMonitorState]: SystemMonitorState[K];
};

const initialState: SystemMonitorState = {
  ...initialSettings,
  modals: [],
};

const hmonitorSlice = createSlice({
  initialState,
  name: 'hmonitor',
  reducers: {
    // A generic action to update any top-level state property
    updateState: <K extends keyof SystemMonitorState>(
      state: SystemMonitorState,
      action: PayloadAction<{key: K; value: SystemMonitorState[K]}>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    // Replaces the entire configuration, used for syncing with the main process
    setConfig: (state: SystemMonitorState, action: PayloadAction<MonitoringSettings>) => {
      return {...state, ...action.payload};
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
      }
    },
    removeCustomMetric: (state, action: PayloadAction<{type: MetricType; name: string; metricId: string}>) => {
      const {type, name, metricId} = action.payload;
      const hardwareList = state.enabledMetrics[type] as HardwareMetricsConfig[];
      const hardware = hardwareList.find(item => item.name === name);
      if (hardware) {
        hardware.custom = hardware.custom.filter(m => m.id !== metricId);
      }
    },
    openModal: (state, action: PayloadAction<{tabID: string}>) => {
      const {tabID} = action.payload;
      if (!state.modals.some(m => m.tabID === tabID)) {
        state.modals.push({isOpen: true, tabID});
      }
    },
    closeModal: (state, action: PayloadAction<{tabID: string}>) => {
      const modal = state.modals.find(m => m.tabID === action.payload.tabID);
      if (modal) modal.isOpen = false;
    },
    removeModal: (state, action: PayloadAction<{tabID: string}>) => {
      state.modals = state.modals.filter(m => m.tabID !== action.payload.tabID);
    },
  },
});

// A typed selector hook for accessing the extension's state
export const useHMonitorSelector: TypedUseSelectorHook<{hmonitor: SystemMonitorState}> = useSelector;

export const useHMonitorState = <T extends keyof SystemMonitorState>(propertyName: T): SystemMonitorStateTypes[T] =>
  useSelector((state: any) => state.hmonitor[propertyName]);

export const hmonitorActions = hmonitorSlice.actions;
export default hmonitorSlice.reducer;
