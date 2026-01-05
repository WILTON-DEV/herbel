import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '@/lib/api-client';
import type { Product } from '@/lib/types';

interface ProductsState {
    items: Record<string, Product>;
    ids: string[];
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
    searchResults: string[];
    searchLoading: boolean;
}

const initialState: ProductsState = {
    items: {},
    ids: [],
    loading: false,
    error: null,
    pagination: {
        total: 0,
        limit: 10,
        offset: 0,
        hasMore: false,
    },
    searchResults: [],
    searchLoading: false,
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}, { rejectWithValue }) => {
        try {
            const response = await productsApi.getProducts({ limit, offset });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await productsApi.getProduct(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (query: string, { rejectWithValue }) => {
        try {
            // Implement search logic - for now using getProducts with filter
            const response = await productsApi.getProducts({ limit: 50, offset: 0 });
            const filtered = response.filter((p: Product) =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.description?.toLowerCase().includes(query.toLowerCase())
            );
            return filtered;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Search failed');
        }
    }
);

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.items = {};
            state.ids = [];
            state.error = null;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        // Fetch Products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                const products = action.payload;

                // Normalize data
                products.forEach((product: Product) => {
                    state.items[product.id] = product;
                    if (!state.ids.includes(product.id)) {
                        state.ids.push(product.id);
                    }
                });

                // Update pagination (we don't have server pagination info, so we estimate)
                state.pagination.total = products.length;
                state.pagination.hasMore = products.length === state.pagination.limit;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Product By ID
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                const product = action.payload;
                if (product) {
                    state.items[product.id] = product;
                    if (!state.ids.includes(product.id)) {
                        state.ids.push(product.id);
                    }
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Search Products
        builder
            .addCase(searchProducts.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchLoading = false;
                const products = action.payload;
                state.searchResults = products.map((p: Product) => p.id);
                products.forEach((product: Product) => {
                    state.items[product.id] = product;
                });
            })
            .addCase(searchProducts.rejected, (state) => {
                state.searchLoading = false;
            });
    },
});

export const { clearProducts, clearSearchResults } = productsSlice.actions;
export default productsSlice.reducer;

// Selectors
export const selectAllProducts = (state: { products: ProductsState }) =>
    state.products.ids.map(id => state.products.items[id]);

export const selectProductById = (state: { products: ProductsState }, productId: string) =>
    state.products.items[productId];

export const selectProductsLoading = (state: { products: ProductsState }) =>
    state.products.loading;

export const selectProductsError = (state: { products: ProductsState }) =>
    state.products.error;

export const selectProductsPagination = (state: { products: ProductsState }) =>
    state.products.pagination;

export const selectSearchResults = (state: { products: ProductsState }) =>
    state.products.searchResults.map(id => state.products.items[id]);

export const selectSearchLoading = (state: { products: ProductsState }) =>
    state.products.searchLoading;
