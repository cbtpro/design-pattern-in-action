import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlyweightState, IconInstance } from '../../types';

const initialState: FlyweightState = {
  icons: [],
  flyweights: {},
  memoryUsage: {
    withFlyweight: 0,
    withoutFlyweight: 0
  }
};

const flyweightSlice = createSlice({
  name: 'flyweight',
  initialState,
  reducers: {
    addIcon: (state, action: PayloadAction<IconInstance>) => {
      state.icons.push(action.payload);
    },
    removeIcon: (state, action: PayloadAction<string>) => {
      state.icons = state.icons.filter(icon => icon.id !== action.payload);
    },
    clearIcons: (state) => {
      state.icons = [];
    },
    setFlyweights: (state, action: PayloadAction<Record<string, any>>) => {
      state.flyweights = action.payload;
    },
    updateMemoryUsage: (state, action: PayloadAction<{
      withFlyweight: number;
      withoutFlyweight: number;
    }>) => {
      state.memoryUsage = action.payload;
    }
  }
});

export const { 
  addIcon, 
  removeIcon, 
  clearIcons, 
  setFlyweights, 
  updateMemoryUsage 
} = flyweightSlice.actions;

export default flyweightSlice.reducer;