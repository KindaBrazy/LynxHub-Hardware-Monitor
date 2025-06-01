import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {initialSystemMetrics} from '../cross/CrossConst';
import {MonitoringSettings, SystemMetrics} from '../cross/CrossTypes';

type SystemMonitorState = Omit<MonitoringSettings, 'enabled'> & {[key: string]: any};

type SystemMonitorStateTypes = {
  [K in keyof SystemMonitorState]: SystemMonitorState[K];
};

const initialState: SystemMonitorState = {
  compactMode: false,
  showSectionLabel: true,
  enabledMetrics: initialSystemMetrics,
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
    toggleMetric: (state: SystemMonitorState, action: PayloadAction<SystemMetrics>) => {
      const metricIndex = state.enabledMetrics.indexOf(action.payload);
      if (metricIndex > -1) {
        state.enabledMetrics.splice(metricIndex, 1);
      } else {
        state.enabledMetrics.push(action.payload);
      }
    },
  },
});

export const useSystemMonitorState = <T extends keyof SystemMonitorState>(
  propertyName: T,
): SystemMonitorStateTypes[T] => useSelector((state: any) => state.extension[propertyName]);

export const systemMonitorActions = systemMonitorSlice.actions;

export default systemMonitorSlice.reducer;
