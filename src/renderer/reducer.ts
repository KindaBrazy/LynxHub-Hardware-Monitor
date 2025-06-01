import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

import {InfoType} from '../cross/CrossTypes';

type HMonitor = {
  compactMode: boolean;
  showSectionLabel: boolean;
  enableMonitor: InfoType[];
} & {[key: string]: any};

type HMonitorStateTypes = {
  [K in keyof HMonitor]: HMonitor[K];
};

const initialState: HMonitor = {
  compactMode: false,
  showSectionLabel: true,
  enableMonitor: ['cpuTemp', 'cpuUsage', 'gpuTemp', 'gpuUsage', 'memory', 'uptimeSystemSeconds', 'uptimeSeconds'],
};

const hMonitorReducer = createSlice({
  initialState,
  name: 'hMonitor',
  reducers: {
    setState: <K extends keyof HMonitor>(
      state: HMonitor,
      action: PayloadAction<{
        key: K;
        value: HMonitor[K];
      }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    toggleMonitor: (state: HMonitor, action: PayloadAction<InfoType>) => {
      const index = state.enableMonitor.indexOf(action.payload);
      if (index > -1) {
        state.enableMonitor.splice(index, 1);
      } else {
        state.enableMonitor.push(action.payload);
      }
    },
  },
});

export const useHMonitorState = <T extends keyof HMonitor>(name: T): HMonitorStateTypes[T] =>
  useSelector((state: any) => state.extension[name]);

export const hMonitorActions = hMonitorReducer.actions;

export default hMonitorReducer.reducer;
