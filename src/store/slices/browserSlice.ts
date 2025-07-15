import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrowserState, BrowserInfo } from '../../types';

const initialState: BrowserState = {
  info: {
    name: 'Unknown',
    version: '0.0.0',
    platform: 'Unknown'
  },
  supportedFeatures: [],
};

const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    setBrowserInfo: (state, action: PayloadAction<BrowserInfo>) => {
      state.info = action.payload;
    },
    setSupportedFeatures: (state, action: PayloadAction<string[]>) => {
      state.supportedFeatures = action.payload;
    },
  },
});

export const { setBrowserInfo, setSupportedFeatures } = browserSlice.actions;
export default browserSlice.reducer;