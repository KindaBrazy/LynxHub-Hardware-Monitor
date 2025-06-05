import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {omit} from 'lodash';
import {useSelector} from 'react-redux';

import {HMONITOR_IPC_UPDATE_CONFIG, initialSystemMetrics} from '../cross/CrossConst';
import {MonitoringSettings} from '../cross/CrossTypes';

export type SystemMonitorState = MonitoringSettings & {
  modals: {isOpen: boolean; tabID: string}[];
};

type SystemMonitorStateTypes = {
  [K in keyof SystemMonitorState]: SystemMonitorState[K];
};

const initialState: SystemMonitorState = {
  refreshInterval: 1,
  enabled: true,
  compactMode: false,
  showSectionLabel: true,
  enabledMetrics: initialSystemMetrics,
  modals: [],
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
      window.electron.ipcRenderer.send(HMONITOR_IPC_UPDATE_CONFIG, JSON.stringify(omit(state, 'modals')));
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
