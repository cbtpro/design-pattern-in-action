import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabCommunicationState } from '../../types';

const initialState: TabCommunicationState = {
  messages: [],
  activeChannels: [],
};

const tabCommunicationSlice = createSlice({
  name: 'tabCommunication',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{
      id: string;
      content: string;
      timestamp: number;
      fromTab: string;
    }>) => {
      state.messages.unshift(action.payload);
      if (state.messages.length > 100) {
        state.messages = state.messages.slice(0, 100);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setActiveChannels: (state, action: PayloadAction<string[]>) => {
      state.activeChannels = action.payload;
    },
  },
});

export const { addMessage, clearMessages, setActiveChannels } = tabCommunicationSlice.actions;
export default tabCommunicationSlice.reducer;