import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    selectAllNotifications,
    selectUnreadNotifications,
    selectUnreadCount,
    selectNotificationsLoading,
} from '../store/slices/notificationsSlice';

export const useNotifications = (autoFetch = false) => {
    const dispatch = useAppDispatch();

    const notifications = useAppSelector(selectAllNotifications);
    const unreadNotifications = useAppSelector(selectUnreadNotifications);
    const unreadCount = useAppSelector(selectUnreadCount);
    const loading = useAppSelector(selectNotificationsLoading);

    useEffect(() => {
        if (autoFetch) {
            dispatch(fetchNotifications());
            dispatch(fetchUnreadCount());
        }
    }, [autoFetch, dispatch]);

    const loadNotifications = useCallback(
        async (params?: { limit?: number; offset?: number }) => {
            const result = await dispatch(fetchNotifications(params || {}));
            return result;
        },
        [dispatch]
    );

    const loadUnreadCount = useCallback(async () => {
        const result = await dispatch(fetchUnreadCount());
        return result;
    }, [dispatch]);

    const markNotificationAsRead = useCallback(
        async (id: string) => {
            const result = await dispatch(markAsRead(id));
            return result;
        },
        [dispatch]
    );

    const markAllNotificationsAsRead = useCallback(async () => {
        const result = await dispatch(markAllAsRead());
        return result;
    }, [dispatch]);

    return {
        notifications,
        unreadNotifications,
        unreadCount,
        loading,
        loadNotifications,
        loadUnreadCount,
        markAsRead: markNotificationAsRead,
        markAllAsRead: markAllNotificationsAsRead,
    };
};
