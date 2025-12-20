# State Management in Herbel Frontend

## Current Implementation

The Herbel frontend currently uses **React's built-in state management** with `useState` and `useEffect` hooks. Each component manages its own local state independently.

### Architecture

```
Component Level State Management
├── Each page/component has its own useState hooks
├── Data fetched on component mount (useEffect)
├── State updated after API calls
└── No global state management library
```

### Example Pattern

```typescript
// Typical pattern in admin pages
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsApi.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

## State Management by Feature

### 1. Authentication State
**Location**: `contexts/AuthContext.tsx`
- **State**: User session, loading state
- **Scope**: Global (via React Context)
- **Persistence**: Token in localStorage, session via better-auth

```typescript
const { user, loading, login, logout } = useAuth();
```

### 2. Product State
**Location**: `app/admin/products/page.tsx`
- **State**: Products list, loading, form state
- **Scope**: Component-level
- **Refresh**: Manual refresh or after CRUD operations

### 3. Order State
**Location**: `app/admin/orders/page.tsx`
- **State**: Orders list, filters, selected order
- **Scope**: Component-level
- **Auto-refresh**: 10-second interval for new orders

### 4. Inventory State
**Location**: `app/admin/inventory/page.tsx`
- **State**: Inventory items, branch filter
- **Scope**: Component-level
- **Real-time**: Updates immediately after adjustments

### 5. Dashboard State
**Location**: `app/admin/page.tsx`
- **State**: Stats, recent orders, top products
- **Scope**: Component-level
- **Refresh**: On mount, manual refresh button

## Pros and Cons

### ✅ Pros of Current Approach

1. **Simplicity**: Easy to understand and maintain
2. **No Dependencies**: No additional state management libraries
3. **Component Isolation**: Each component is self-contained
4. **Fast Development**: Quick to implement new features
5. **Small Bundle Size**: No extra libraries

### ⚠️ Cons of Current Approach

1. **No Shared State**: Data fetched multiple times across components
2. **No Caching**: Same API calls repeated unnecessarily
3. **Prop Drilling**: Some data passed through multiple components
4. **No Optimistic Updates**: UI doesn't update optimistically
5. **Race Conditions**: Possible with rapid API calls
6. **No Request Deduplication**: Same request made multiple times

## Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
API Call (api-client.ts)
    ↓
Backend API
    ↓
Response
    ↓
Update Local State (useState)
    ↓
Re-render Component
```

## State Synchronization

### Current Approach
- **No automatic sync** between components
- Each component fetches its own data
- Manual refresh buttons where needed
- Auto-refresh intervals (e.g., orders page)

### Example: Order Updates
```typescript
// Orders page auto-refreshes every 10 seconds
useEffect(() => {
  const interval = setInterval(() => {
    loadOrders(true); // Silent refresh
  }, 10000);
  return () => clearInterval(interval);
}, []);
```

## Recommendations for Improvement

### Option 1: React Query / TanStack Query (Recommended)
**Benefits:**
- Automatic caching
- Request deduplication
- Background refetching
- Optimistic updates
- Error retry logic

**Implementation:**
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createMutation = useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
}
```

### Option 2: Zustand (Lightweight Global State)
**Benefits:**
- Simple API
- Small bundle size
- TypeScript support
- No boilerplate

**Implementation:**
```typescript
import create from 'zustand';

interface ProductsStore {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    const products = await productsApi.getProducts();
    set({ products, loading: false });
  },
}));
```

### Option 3: SWR (Data Fetching Library)
**Benefits:**
- Lightweight
- Built-in caching
- Revalidation
- Focus revalidation

**Implementation:**
```typescript
import useSWR from 'swr';

function ProductsPage() {
  const { data: products, error, isLoading } = useSWR(
    'products',
    () => productsApi.getProducts(),
    { refreshInterval: 10000 }
  );
}
```

## Current State Management Patterns

### 1. Loading States
```typescript
const [loading, setLoading] = useState(true);
// Set to false after data fetch
```

### 2. Error Handling
```typescript
try {
  const data = await api.getData();
  setData(data);
} catch (error) {
  console.error("Error:", error);
  // Show error message to user
}
```

### 3. Form State
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
});
```

### 4. Dialog/Modal State
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### 5. Filter State
```typescript
const [filterStatus, setFilterStatus] = useState("all");
const [filterBranch, setFilterBranch] = useState("all");
```

## State Persistence

### Current Persistence
- **Authentication**: Token in localStorage
- **Settings**: localStorage (fallback)
- **No other persistence**: All other state is in-memory

### Recommendations
- Consider persisting user preferences
- Cache frequently accessed data
- Store filter preferences

## Performance Considerations

### Current Issues
1. **Multiple API Calls**: Same data fetched in multiple components
2. **No Request Batching**: Each component makes separate requests
3. **No Debouncing**: Search/filter triggers immediate API calls
4. **Large Re-renders**: Entire component tree re-renders on state change

### Optimizations Applied
- Auto-refresh intervals (orders page)
- Silent refresh option
- Loading states to prevent duplicate requests

### Recommended Optimizations
1. **Implement React Query** for caching and deduplication
2. **Debounce Search Inputs** (300ms delay)
3. **Memoize Expensive Computations** (useMemo)
4. **Code Splitting** for large components
5. **Virtual Scrolling** for long lists

## Migration Path

If migrating to React Query:

1. **Phase 1**: Install and setup React Query
2. **Phase 2**: Migrate one feature at a time (start with products)
3. **Phase 3**: Add optimistic updates
4. **Phase 4**: Implement background refetching
5. **Phase 5**: Add error retry logic

## Conclusion

The current state management approach is **functional and appropriate** for the current scale of the application. However, as the application grows, consider migrating to a more robust solution like React Query for better performance and developer experience.

**Current Status**: ✅ Working well for MVP
**Future Consideration**: ⚠️ May need optimization as app scales

