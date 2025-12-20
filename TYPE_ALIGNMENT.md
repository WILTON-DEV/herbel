# Type Alignment: Frontend ↔ Backend

This document ensures frontend types match backend DTOs and expectations.

## User Roles

### Backend (herbel-api)
```typescript
enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  ATTENDANT = 'ATTENDANT',
}
```

### Frontend (herbel)
```typescript
type UserRole = "admin" | "attendant" | "customer";
```

### Mapping Functions
- `mapUserRole()`: Converts backend enum → frontend type
- `mapRoleToBackend()`: Converts frontend type → backend enum

**Status**: ✅ Fixed - All three roles now supported

## Product Types

### Backend DTO (CreateProductDto)
```typescript
{
  name: string;
  description?: string;
  price: number;           // decimal
  stock: number;           // integer
  image?: string;          // URL
  images?: string[];       // Array of URLs
  categoryId?: string;     // UUID (not category name!)
}
```

### Frontend Type
```typescript
{
  id: string;
  productNumber: string;
  name: string;
  description: string;
  category: string;        // UUID (stored as categoryId from backend)
  image: string;
  priceUGX?: number;
  priceOptionsUGX?: number[];
  stockQuantity?: number;
  // ...
}
```

### Key Differences
- ✅ **price** → **priceUGX**: Mapped correctly
- ✅ **stock** → **stockQuantity**: Mapped correctly
- ⚠️ **categoryId** (UUID) → **category**: Frontend stores UUID, but may need to map to name for display
- ✅ **image/images**: Handled correctly

**Status**: ✅ Fixed - UUID validation added for categoryId

## Order Types

### Backend DTO (CreateOrderDto)
```typescript
{
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMethod: DeliveryMethod;  // PICKUP | DELIVERY (enum)
  branchId?: string;                // UUID (required for pickup)
  location?: string;                // Required for delivery
  items: CreateOrderItemDto[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  source: OrderSource;              // WEBSITE | MANUAL (enum)
  paymentMethod: PaymentMethod;     // PENDING | CASH | MOBILE_MONEY (enum)
  notes?: string;
}
```

### Frontend Type
```typescript
{
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMethod: "pickup" | "delivery";
  branch?: string;                  // UUID (from backend)
  location?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  source: "website" | "manual";
  paymentMethod: "pending" | "cash" | "mobile-money";
  notes?: string;
}
```

### Mapping
- ✅ **deliveryMethod**: `"pickup"` → `DeliveryMethod.PICKUP`
- ✅ **source**: `"website"` → `OrderSource.WEBSITE`
- ✅ **paymentMethod**: `"cash"` → `PaymentMethod.CASH`
- ⚠️ **branch**: Should be UUID, not branch name

**Status**: ✅ Fixed - Enum mappings implemented

## Category Types

### Backend Entity
```typescript
{
  id: string;              // UUID (Primary Key)
  name: string;
  slug: string;
  description?: string;
  parentId?: string;       // UUID
}
```

### Frontend Type
```typescript
{
  id: string;              // UUID
  name: string;
  description: string;
  productCount: number;
  createdAt: Date;
}
```

**Status**: ✅ Aligned - Frontend uses UUID for category ID

## Branch Types

### Backend Entity
```typescript
{
  id: string;              // UUID (Primary Key)
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}
```

### Frontend (from types.ts)
```typescript
{
  id: string;              // String ID (e.g., "kampala")
  name: string;
  address: string;
  phone: string;
}
```

### Issue
⚠️ **Frontend uses string IDs** (e.g., "kampala") but **backend expects UUIDs**

**Solution**: Created `branches-api.ts` helper to map branch names to UUIDs

**Status**: ⚠️ Needs attention - Branch name → UUID mapping required

## Inventory Types

### Backend
```typescript
{
  productId: string;       // UUID
  branchId: string;        // UUID
  quantity: number;
}
```

### Frontend
```typescript
{
  productId: string;       // UUID
  branch: string;           // UUID (from branchId)
  quantity: number;
}
```

**Status**: ✅ Aligned - Both use UUIDs

## Expense Types

### Backend DTO
```typescript
{
  branchId: string;        // UUID
  category: ExpenseCategory; // Enum
  description: string;
  amount: number;          // decimal
  date: string;            // ISO date string
}
```

### Frontend
```typescript
{
  branch: string;          // UUID (from branchId)
  category: string;        // Category name
  description: string;
  amount: number;
  date: Date;
}
```

**Status**: ✅ Aligned - Date conversion handled

## Sales Types

### Backend
```typescript
{
  orderId: string;         // UUID
  branchId: string;        // UUID
  amount: number;
  paymentMethod: PaymentMethod; // Enum
  deliveryMethod: DeliveryMethod; // Enum
  status: string;          // Status enum
  date: Date;
  recordedBy: string;     // User ID
}
```

### Frontend
```typescript
{
  orderId: string;
  branch: string;          // UUID
  amount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  status: "cash-received" | "mobile-money-sent" | "pending";
  date: Date;
  recordedBy: string;
}
```

**Status**: ✅ Aligned - Status mapping implemented

## Type Conversion Checklist

### ✅ Fixed
- [x] User roles (CUSTOMER, ADMIN, ATTENDANT)
- [x] Order status enums
- [x] Payment method enums
- [x] Delivery method enums
- [x] Product price/stock mapping
- [x] Category ID (UUID validation)
- [x] Date string → Date object conversion
- [x] Sales record status mapping

### ⚠️ Needs Attention
- [ ] Branch name → UUID mapping (helper created, needs integration)
- [ ] Category name → UUID mapping (if using names in forms)
- [ ] Product category display (UUID → name mapping)

### 📝 Notes

1. **UUID Validation**: Added regex validation for categoryId and branchId
2. **Enum Mapping**: All enums properly mapped between frontend/backend
3. **Type Safety**: TypeScript types ensure compile-time safety
4. **Runtime Validation**: UUID format checked before sending to backend

## Recommendations

1. **Use UUIDs Everywhere**: Frontend should work with UUIDs, not names
2. **Display Mapping**: Create helper functions to map UUIDs to names for display
3. **Form Handling**: Forms should work with UUIDs internally, display names in UI
4. **Error Handling**: Validate UUIDs before API calls to catch errors early

## Helper Functions Created

1. `mapUserRole()`: Backend role → Frontend role
2. `mapRoleToBackend()`: Frontend role → Backend role
3. `mapOrderStatus()`: Backend status → Frontend status
4. `mapPaymentMethod()`: Backend method → Frontend method
5. `getBranches()`: Fetch branches and cache
6. `getBranchIdByName()`: Map branch name → UUID
7. `getBranchNameById()`: Map UUID → branch name

