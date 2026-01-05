import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersApi } from '@/lib/api-client';

interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    status: string;
    paymentMethod: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
    items: OrderItem[];
    createdAt: string;
}

interface OrdersState {
    items: Record<string, Order>;
    ids: string[];
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

const initialState: OrdersState = {
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
};

// Async Thunks
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}, { rejectWithValue }) => {
        try {
            const response = await ordersApi.getOrders({ limit, offset });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await ordersApi.getOrder(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
        }
    }
);

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: any, { rejectWithValue }) => {
        try {
            const response = await ordersApi.createOrder(orderData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);

export const updateOrder = createAsyncThunk(
    'orders/updateOrder',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await ordersApi.updateOrder(id, data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update order');
        }
    }
);

// Slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.items = {};
            state.ids = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Orders
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                const { data, total, limit, offset, hasMore } = action.payload;

                data.forEach((order: Order) => {
                    state.items[order.id] = order;
                    if (!state.ids.includes(order.id)) {
                        state.ids.push(order.id);
                    }
                });

                state.pagination = { total, limit, offset, hasMore };
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch Order By ID
        builder
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                const order = action.payload;
                state.items[order.id] = order;
                if (!state.ids.includes(order.id)) {
                    state.ids.push(order.id);
                }
            });

        // Create Order
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                const order = action.payload;
                state.items[order.id] = order;
                state.ids.unshift(order.id);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Order
        builder
            .addCase(updateOrder.fulfilled, (state, action) => {
                const order = action.payload;
                state.items[order.id] = order;
            });
    },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;

// Selectors
export const selectAllOrders = (state: { orders: OrdersState }) =>
    state.orders.ids.map(id => state.orders.items[id]);

export const selectOrderById = (state: { orders: OrdersState }, orderId: string) =>
    state.orders.items[orderId];

export const selectOrdersLoading = (state: { orders: OrdersState }) =>
    state.orders.loading;

export const selectOrdersError = (state: { orders: OrdersState }) =>
    state.orders.error;

export const selectOrdersPagination = (state: { orders: OrdersState }) =>
    state.orders.pagination;
