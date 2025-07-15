import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from '../../types';

const initialState: NotificationState = {
  permission: 'default',
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setPermission: (state, action: PayloadAction<string | undefined>) => {
      state.permission = action.payload;
    },
    addNotification: (state, action: PayloadAction<{
      id: string;
      title: string;
      body: string;
      timestamp: number;
    }>) => {
      state.notifications.unshift(action.payload);
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { setPermission, addNotification, removeNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;