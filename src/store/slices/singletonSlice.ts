import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingletonState, LogEntry } from '../../types';

const initialState: SingletonState = {
  logs: [],
  instanceCount: 0
};

const singletonSlice = createSlice({
  name: 'singleton',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<LogEntry>) => {
      state.logs.unshift(action.payload);
      if (state.logs.length > 100) {
        state.logs = state.logs.slice(0, 100);
      }
    },
    clearLogs: (state) => {
      state.logs = [];
    },
    setInstanceCount: (state, action: PayloadAction<number>) => {
      state.instanceCount = action.payload;
    }
  }
});

export const { addLog, clearLogs, setInstanceCount } = singletonSlice.actions;
export default singletonSlice.reducer;