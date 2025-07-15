import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PubSubState, EventData, Subscriber } from '../../types';

const initialState: PubSubState = {
  events: [],
  subscribers: {},
  activeChannels: []
};

const pubsubSlice = createSlice({
  name: 'pubsub',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventData>) => {
      state.events.unshift(action.payload);
      if (state.events.length > 50) {
        state.events = state.events.slice(0, 50);
      }
    },
    clearEvents: (state) => {
      state.events = [];
    },
    setSubscribers: (state, action: PayloadAction<Record<string, Subscriber[]>>) => {
      state.subscribers = action.payload;
    },
    setActiveChannels: (state, action: PayloadAction<string[]>) => {
      state.activeChannels = action.payload;
    }
  }
});

export const {
  addEvent,
  clearEvents,
  setSubscribers,
  setActiveChannels
} = pubsubSlice.actions;

export default pubsubSlice.reducer;