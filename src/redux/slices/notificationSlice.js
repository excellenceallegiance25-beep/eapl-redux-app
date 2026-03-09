import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',

    initialState: {
        unreadCount: 0,
        notifications: [],
        lastUpdated: null,

        // NEW → used to refresh notices grid
        noticeRefreshKey: 0
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

        // ⭐ IMPORTANT (NEW)
        triggerNoticeRefresh: (state) => {
            state.noticeRefreshKey += 1;
        },

        resetNotificationState: (state) => {
            state.unreadCount = 0;
            state.notifications = [];
            state.lastUpdated = null;
            state.noticeRefreshKey = 0;
        }
    }
});

export const {
    setUnreadCount,
    setNotifications,
    incrementUnreadCount,
    decrementUnreadCount,
    triggerNoticeRefresh, // ⭐ EXPORT THIS
    resetNotificationState
} = notificationSlice.actions;

export default notificationSlice.reducer;