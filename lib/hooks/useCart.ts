import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    addItemLocal,
    removeItemLocal,
    updateItemLocal,
    clearCartLocal,
    selectCartItems,
    selectCartTotal,
    selectCartItemCount,
    selectCartLoading,
    selectCartError,
    selectCartItemByProductId,
} from '../store/slices/cartSlice';
import { selectIsAuthenticated } from '../store/slices/authSlice';

export const useCart = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const itemCount = useAppSelector(selectCartItemCount);
    const loading = useAppSelector(selectCartLoading);
    const error = useAppSelector(selectCartError);

    const loadCart = useCallback(async () => {
        if (isAuthenticated) {
            const result = await dispatch(fetchCart());
            return result;
        }
    }, [dispatch, isAuthenticated]);

    const addItem = useCallback(
        async (productId: string, quantity: number, price: number, productName: string, image?: string) => {
            if (isAuthenticated) {
                const result = await dispatch(addToCart({ productId, quantity, price, productName, image }));
                return result;
            } else {
                // Local cart for non-authenticated users
                dispatch(addItemLocal({ id: productId, productId, productName, quantity, price, image }));
            }
        },
        [dispatch, isAuthenticated]
    );

    const updateItem = useCallback(
        async (productId: string, quantity: number) => {
            if (isAuthenticated) {
                const result = await dispatch(updateCartItem({ productId, quantity }));
                return result;
            } else {
                dispatch(updateItemLocal({ productId, quantity }));
            }
        },
        [dispatch, isAuthenticated]
    );

    const removeItem = useCallback(
        async (productId: string) => {
            if (isAuthenticated) {
                const result = await dispatch(removeFromCart(productId));
                return result;
            } else {
                dispatch(removeItemLocal(productId));
            }
        },
        [dispatch, isAuthenticated]
    );

    const clear = useCallback(async () => {
        if (isAuthenticated) {
            const result = await dispatch(clearCart());
            return result;
        } else {
            dispatch(clearCartLocal());
        }
    }, [dispatch, isAuthenticated]);

    const getItemByProductId = useCallback(
        (productId: string) => {
            return useAppSelector((state) => selectCartItemByProductId(state, productId));
        },
        []
    );

    return {
        items,
        total,
        itemCount,
        loading,
        error,
        loadCart,
        addItem,
        updateItem,
        removeItem,
        clear,
        getItemByProductId,
    };
};
