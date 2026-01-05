import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
    updateUserProfile,
    selectCurrentUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError,
    selectUserRole,
    selectIsAdmin,
    clearError,
} from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectCurrentUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);
    const role = useAppSelector(selectUserRole);
    const isAdmin = useAppSelector(selectIsAdmin);

    const login = useCallback(
        async (email: string, password: string) => {
            const result = await dispatch(loginUser({ email, password }));
            return result;
        },
        [dispatch]
    );

    const register = useCallback(
        async (email: string, password: string, name: string) => {
            const result = await dispatch(registerUser({ email, password, name }));
            return result;
        },
        [dispatch]
    );

    const getSession = useCallback(async () => {
        const result = await dispatch(getCurrentUser());
        return result;
    }, [dispatch]);

    const logout = useCallback(async () => {
        const result = await dispatch(logoutUser());
        return result;
    }, [dispatch]);

    const updateProfile = useCallback(
        async (data: { name?: string; contact?: string; image?: string }) => {
            const result = await dispatch(updateUserProfile(data));
            return result;
        },
        [dispatch]
    );

    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        loading,
        error,
        role,
        isAdmin,
        login,
        register,
        getSession,
        logout,
        updateProfile,
        clearError: clearAuthError,
    };
};
