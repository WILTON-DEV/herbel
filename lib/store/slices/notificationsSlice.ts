import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notificationsApi } from '@/lib/api-client';

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
}

interface NotificationsState {
    items: Record<string, Notification>;
    ids: string[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    items: {},
    ids: [],
    unreadCount: 0,
    loading: false,
    error: null,
};

// Async Thunks
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async ({ limit = 20, offset = 0 }: { limit?: number; offset?: number } = {}, { rejectWithValue }) => {
        try {
            const response = await notificationsApi.getNotifications({ limit, offset });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
        }
    }
);

export const fetchUnreadCount = createAsyncThunk(
    'notifications/fetchUnreadCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await notificationsApi.getUnreadCount();
            return response.count;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch unread count');
        }
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (id: string, { rejectWithValue }) => {
        try {
            await notificationsApi.markAsRead(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            await notificationsApi.markAllAsRead();
            return null;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark all as read');
        }
    }
);

// Slice
const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            const notification = action.payload;
            state.items[notification.id] = notification;
            state.ids.unshift(notification.id);
            if (!notification.isRead) {
                state.unreadCount += 1;
            }
        },
        clearNotifications: (state) => {
            state.items = {};
            state.ids = [];
            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        // Fetch Notifications
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                const { data } = action.payload;

                data.forEach((notification: Notification) => {
                    state.items[notification.id] = notification;
                    if (!state.ids.includes(notification.id)) {
                        state.ids.push(notification.id);
                    }
                });

                state.unreadCount = data.filter((n: Notification) => !n.isRead).length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Unread Count
        builder
            .addCase(fetchUnreadCount.fulfilled, (state, action) => {
                state.unreadCount = action.payload;
            });

        // Mark as Read
        builder
            .addCase(markAsRead.fulfilled, (state, action) => {
                const id = action.payload;
                if (state.items[id] && !state.items[id].isRead) {
                    state.items[id].isRead = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            });

        // Mark All as Read
        builder
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.ids.forEach(id => {
                    if (state.items[id]) {
                        state.items[id].isRead = true;
                    }
                });
                state.unreadCount = 0;
            });
    },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;

// Selectors
export const selectAllNotifications = (state: { notifications: NotificationsState }) =>
    state.notifications.ids.map(id => state.notifications.items[id]);

export const selectUnreadNotifications = (state: { notifications: NotificationsState }) =>
    state.notifications.ids
        .map(id => state.notifications.items[id])
        .filter(n => !n.isRead);

export const selectUnreadCount = (state: { notifications: NotificationsState }) =>
    state.notifications.unreadCount;

export const selectNotificationsLoading = (state: { notifications: NotificationsState }) =>
    state.notifications.loading;
