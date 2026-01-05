import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cartApi } from '@/lib/api-client';

interface CartItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image?: string;
}

interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
    total: number;
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
    total: 0,
};

// Helper to calculate total
const calculateTotal = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Async Thunks
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await cartApi.getCart();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity, price, productName, image }:
        { productId: string; quantity: number; price: number; productName: string; image?: string },
        { rejectWithValue }) => {
        try {
            const response = await cartApi.addItem(productId, quantity, price);
            return { ...response, productName, image };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
        try {
            const response = await cartApi.updateItem(productId, quantity);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId: string, { rejectWithValue }) => {
        try {
            await cartApi.removeItem(productId);
            return productId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            await cartApi.clearCart();
            return null;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
        }
    }
);

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Local cart operations (for non-authenticated users)
        addItemLocal: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.total = calculateTotal(state.items);
        },
        removeItemLocal: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
            state.total = calculateTotal(state.items);
        },
        updateItemLocal: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            state.total = calculateTotal(state.items);
        },
        clearCartLocal: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
    extraReducers: (builder) => {
        // Fetch Cart
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                state.total = calculateTotal(state.items);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Add to Cart
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const existingItem = state.items.find(item => item.productId === action.payload.productId);
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
                state.total = calculateTotal(state.items);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Cart Item
        builder
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const item = state.items.find(item => item.productId === action.payload.productId);
                if (item) {
                    item.quantity = action.payload.quantity;
                }
                state.total = calculateTotal(state.items);
            });

        // Remove from Cart
        builder
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.productId !== action.payload);
                state.total = calculateTotal(state.items);
            });

        // Clear Cart
        builder
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.total = 0;
            });
    },
});

export const { addItemLocal, removeItemLocal, updateItemLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartLoading = (state: { cart: CartState }) => state.cart.loading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;
export const selectCartItemByProductId = (state: { cart: CartState }, productId: string) =>
    state.cart.items.find(item => item.productId === productId);
