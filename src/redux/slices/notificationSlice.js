import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        unreadCount: 0,
        notifications: [],
        lastUpdated: null
    },
    reducers: {
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
            state.lastUpdated = new Date().toISOString();
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
            const unreadNotifications = action.payload.filter(
                notification => notification.read === false
            );
            state.unreadCount = unreadNotifications.length;
        },
        incrementUnreadCount: (state) => {
            state.unreadCount += 1;
        },
        decrementUnreadCount: (state) => {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
        },
        resetNotificationState: (state) => {
            state.unreadCount = 0;
            state.notifications = [];
            state.lastUpdated = null;
        }
    }
});

export const {
    setUnreadCount,
    setNotifications,
    incrementUnreadCount,
    decrementUnreadCount,
    resetNotificationState
} = notificationSlice.actions;

export default notificationSlice.reducer;