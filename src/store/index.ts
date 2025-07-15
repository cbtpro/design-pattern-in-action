import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notificationSlice';
import tabCommunicationReducer from './slices/tabCommunicationSlice';
import browserReducer from './slices/browserSlice';
import flyweightReducer from './slices/flyweightSlice';
import pubsubReducer from './slices/pubsubSlice';
import singletonReducer from './slices/singletonSlice';

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    tabCommunication: tabCommunicationReducer,
    browser: browserReducer,
    flyweight: flyweightReducer,
    pubsub: pubsubReducer,
    singleton: singletonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;