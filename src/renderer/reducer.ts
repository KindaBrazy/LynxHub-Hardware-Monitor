import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

type HMonitor = {compactMode: boolean};

type HMonitorStateTypes = {
  [K in keyof HMonitor]: HMonitor[K];
};

const initialState: HMonitor = {
  compactMode: false,
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
  },
});

export const useHMonitorState = <T extends keyof HMonitor>(name: T): HMonitorStateTypes[T] =>
  useSelector((state: any) => state.extension[name]);

export const hMonitorActions = hMonitorReducer.actions;

export default hMonitorReducer.reducer;
