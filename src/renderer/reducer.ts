import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isEmpty, omit} from 'lodash';
import {useSelector} from 'react-redux';

import {HMONITOR_IPC_UPDATE_CONFIG, initialSystemMetrics} from '../cross/CrossConst';
import {AvailableHardware, MonitoringSettings, NewSystemMetrics} from '../cross/CrossTypes';

export type SystemMonitorState = MonitoringSettings & {
  modals: {isOpen: boolean; tabID: string}[];
  availableHardware: AvailableHardware;
};

type SystemMonitorStateTypes = {
  [K in keyof SystemMonitorState]: SystemMonitorState[K];
};

const initAvailableHardware = {
  gpu: [],
  cpu: [],
  memory: [],
};

const initialState: SystemMonitorState = {
  refreshInterval: 1,
  enabled: true,
  compactMode: false,
  showSectionLabel: true,
  showMetricLabel: true,
  enabledMetrics: initialSystemMetrics,
  modals: [],

  availableHardware: initAvailableHardware,
};

const systemMonitorSlice = createSlice({
  initialState,
  name: 'systemMonitor',
  reducers: {
    updateState: <K extends keyof SystemMonitorState>(
      state: SystemMonitorState,
      action: PayloadAction<{
        key: K;
        value: SystemMonitorState[K];
      }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    setConfig: (state: SystemMonitorState, action: PayloadAction<MonitoringSettings>) => {
      return {...state, ...action.payload};
    },
    saveSettings: (state: SystemMonitorState) => {
      window.electron.ipcRenderer.send(HMONITOR_IPC_UPDATE_CONFIG, JSON.stringify(omit(state, 'modals')));
    },
    setAvailableHardware: (state: SystemMonitorState, action: PayloadAction<AvailableHardware>) => {
      state.availableHardware = action.payload;

      if (isEmpty(state.enabledMetrics.gpu)) {
        state.enabledMetrics.gpu = action.payload.gpu.map(name => ({name, enabled: []}));
      }
      if (isEmpty(state.enabledMetrics.cpu)) {
        state.enabledMetrics.cpu = action.payload.cpu.map(name => ({name, enabled: []}));
      }
      if (isEmpty(state.enabledMetrics.memory)) {
        state.enabledMetrics.memory = action.payload.memory.map(name => ({name, enabled: []}));
      }
    },
    updateMetrics: (state: SystemMonitorState, action: PayloadAction<Partial<Omit<NewSystemMetrics, 'uptime'>>>) => {
      state.enabledMetrics = {...state.enabledMetrics, ...action.payload};
    },
    updateUptime: (state: SystemMonitorState, action: PayloadAction<Partial<NewSystemMetrics['uptime']>>) => {
      state.enabledMetrics.uptime = {...state.enabledMetrics.uptime, ...action.payload};
    },
    openModal: (state: SystemMonitorState, action: PayloadAction<{tabID: string}>) => {
      state.modals.push({isOpen: true, tabID: action.payload.tabID});
    },
    closeModal: (state: SystemMonitorState, action: PayloadAction<{tabID: string}>) => {
      state.modals = state.modals.map(item =>
        item.tabID === action.payload.tabID ? {...item, isOpen: false} : {...item},
      );
    },
    removeModal: (state: SystemMonitorState, action: PayloadAction<{tabID: string}>) => {
      state.modals = state.modals.filter(item => item.tabID !== action.payload.tabID);
    },
  },
});

export const useSystemMonitorState = <T extends keyof SystemMonitorState>(
  propertyName: T,
): SystemMonitorStateTypes[T] => useSelector((state: any) => state.extension[propertyName]);

export const systemMonitorActions = systemMonitorSlice.actions;

export default systemMonitorSlice.reducer;
