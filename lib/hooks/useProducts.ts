import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchProducts,
    fetchProductById,
    searchProducts,
    selectAllProducts,
    selectProductById,
    selectProductsLoading,
    selectProductsError,
    selectProductsPagination,
    selectSearchResults,
    selectSearchLoading,
    clearSearchResults,
} from '../store/slices/productsSlice';

export const useProducts = (autoFetch = false) => {
    const dispatch = useAppDispatch();

    const products = useAppSelector(selectAllProducts);
    const loading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);
    const pagination = useAppSelector(selectProductsPagination);
    const searchResults = useAppSelector(selectSearchResults);
    const searchLoading = useAppSelector(selectSearchLoading);

    useEffect(() => {
        if (autoFetch && products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [autoFetch, products.length, dispatch]);

    const loadProducts = useCallback(
        async (params?: { limit?: number; offset?: number }) => {
            const result = await dispatch(fetchProducts(params || {}));
            return result;
        },
        [dispatch]
    );

    const loadProduct = useCallback(
        async (id: string) => {
            const result = await dispatch(fetchProductById(id));
            return result;
        },
        [dispatch]
    );

    const search = useCallback(
        async (query: string) => {
            const result = await dispatch(searchProducts(query));
            return result;
        },
        [dispatch]
    );

    const clearSearch = useCallback(() => {
        dispatch(clearSearchResults());
    }, [dispatch]);

    const getProductById = useCallback(
        (id: string) => {
            return useAppSelector((state) => selectProductById(state, id));
        },
        []
    );

    return {
        products,
        loading,
        error,
        pagination,
        searchResults,
        searchLoading,
        loadProducts,
        loadProduct,
        search,
        clearSearch,
        getProductById,
    };
};
