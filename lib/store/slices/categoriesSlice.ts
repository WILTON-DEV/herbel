import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '@/lib/api-client';

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface CategoriesState {
    items: Record<string, Category>;
    ids: string[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    items: {},
    ids: [],
    loading: false,
    error: null,
};

// Async Thunks
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await categoriesApi.getCategories();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

// Slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearCategories: (state) => {
            state.items = {};
            state.ids = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                const categories = action.payload;

                categories.forEach((category: Category) => {
                    state.items[category.id] = category;
                    if (!state.ids.includes(category.id)) {
                        state.ids.push(category.id);
                    }
                });
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

// Selectors
export const selectAllCategories = (state: { categories: CategoriesState }) =>
    state.categories.ids.map(id => state.categories.items[id]);

export const selectCategoryById = (state: { categories: CategoriesState }, categoryId: string) =>
    state.categories.items[categoryId];

export const selectCategoriesLoading = (state: { categories: CategoriesState }) =>
    state.categories.loading;
