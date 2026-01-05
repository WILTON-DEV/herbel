import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    selectAllOrders,
    selectOrderById,
    selectOrdersLoading,
    selectOrdersError,
    selectOrdersPagination,
} from '../store/slices/ordersSlice';

export const useOrders = () => {
    const dispatch = useAppDispatch();

    const orders = useAppSelector(selectAllOrders);
    const loading = useAppSelector(selectOrdersLoading);
    const error = useAppSelector(selectOrdersError);
    const pagination = useAppSelector(selectOrdersPagination);

    const loadOrders = useCallback(
        async (params?: { limit?: number; offset?: number }) => {
            const result = await dispatch(fetchOrders(params || {}));
            return result;
        },
        [dispatch]
    );

    const loadOrder = useCallback(
        async (id: string) => {
            const result = await dispatch(fetchOrderById(id));
            return result;
        },
        [dispatch]
    );

    const placeOrder = useCallback(
        async (orderData: any) => {
            const result = await dispatch(createOrder(orderData));
            return result;
        },
        [dispatch]
    );

    const updateOrderStatus = useCallback(
        async (id: string, data: any) => {
            const result = await dispatch(updateOrder({ id, data }));
            return result;
        },
        [dispatch]
    );

    const getOrderById = useCallback(
        (id: string) => {
            return useAppSelector((state) => selectOrderById(state, id));
        },
        []
    );

    return {
        orders,
        loading,
        error,
        pagination,
        loadOrders,
        loadOrder,
        placeOrder,
        updateOrderStatus,
        getOrderById,
    };
};
