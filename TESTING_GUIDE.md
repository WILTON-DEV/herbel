# Herbel Frontend-Backend Integration Testing Guide

## Prerequisites

1. **Backend API Running**
   ```bash
   cd herbel-api
   pnpm install
   pnpm run start:dev
   ```
   Backend should be running on `http://localhost:3000`

2. **Frontend Running**
   ```bash
   cd herbel
   pnpm install
   # Create .env.local with:
   # NEXT_PUBLIC_API_URL=http://localhost:3000
   pnpm run dev
   ```
   Frontend should be running on `http://localhost:3001` (or 3000 if backend is on different port)

3. **Database Setup**
   - PostgreSQL database should be running
   - Migrations should be applied
   - At least one admin user should exist

## E2E Testing Checklist

### 1. Authentication Flow ✅

#### Test Login
1. Navigate to `/admin/auth/login`
2. Enter admin credentials
3. Verify:
   - ✅ Login succeeds
   - ✅ Token is stored in localStorage (`herbel_token`)
   - ✅ User is redirected to `/admin`
   - ✅ User session is maintained on page refresh

#### Test Logout
1. While logged in, click logout
2. Verify:
   - ✅ Token is removed from localStorage
   - ✅ User is redirected to login page
   - ✅ Protected routes are inaccessible

#### Test Session Persistence
1. Login successfully
2. Refresh the page
3. Verify:
   - ✅ User remains logged in
   - ✅ Session is restored from token

### 2. Products Management ✅

#### List Products
1. Navigate to `/admin/products`
2. Verify:
   - ✅ Products list loads
   - ✅ Product images display correctly
   - ✅ Prices are formatted correctly (UGX)

#### Create Product
1. Click "Add Product"
2. Fill in form:
   - Name: "Test Product"
   - Description: "Test description"
   - Price: 50000
   - Stock: 100
   - Category: Select a category
   - Image URL: Valid image URL
3. Submit
4. Verify:
   - ✅ Product is created
   - ✅ Product appears in list
   - ✅ Inventory is initialized for all branches

#### Update Product
1. Click "Edit" on a product
2. Change name and price
3. Save
4. Verify:
   - ✅ Changes are saved
   - ✅ Updated product shows in list

#### Delete Product
1. Click "Delete" on a product
2. Confirm deletion
3. Verify:
   - ✅ Product is removed from list
   - ✅ Related inventory is removed

### 3. Orders Management ✅

#### List Orders
1. Navigate to `/admin/orders`
2. Verify:
   - ✅ Orders list loads
   - ✅ Orders are sorted by date (newest first)
   - ✅ Order status badges display correctly

#### Filter Orders
1. Use status filter dropdown
2. Verify:
   - ✅ Orders are filtered correctly
3. Use branch filter
4. Verify:
   - ✅ Orders filtered by branch
5. Use search
6. Verify:
   - ✅ Orders filtered by search term

#### Create Manual Order
1. Click "Create Order"
2. Fill in:
   - Customer name
   - Customer phone
   - Select products and quantities
   - Choose delivery method
   - Select branch (for pickup)
3. Submit
4. Verify:
   - ✅ Order is created
   - ✅ Order appears in list
   - ✅ Order number is generated

#### Update Order Status
1. Select an order
2. Change payment method to "Cash"
3. Verify:
   - ✅ Order status updates to "cash-received"
   - ✅ Inventory is deducted
   - ✅ Sales record is created

### 4. Inventory Management ✅

#### View Inventory
1. Navigate to `/admin/inventory`
2. Verify:
   - ✅ Inventory items load
   - ✅ Products show with images
   - ✅ Quantities display correctly
   - ✅ Low stock alerts show (< 10 units)

#### Adjust Inventory
1. Click "+" or "-" buttons
2. Verify:
   - ✅ Quantity updates
   - ✅ Changes persist after refresh

#### Filter by Branch
1. Select a branch from filter
2. Verify:
   - ✅ Only that branch's inventory shows

### 5. Sales Records ✅

#### View Sales
1. Navigate to `/admin/sales`
2. Verify:
   - ✅ Sales records load
   - ✅ Sales are sorted by date
   - ✅ Payment method badges display (Sin/Mum)

#### Filter Sales
1. Select date range (Today, Week, Month)
2. Verify:
   - ✅ Sales filtered correctly
3. Filter by branch
4. Verify:
   - ✅ Sales filtered by branch

### 6. Expenses Management ✅

#### List Expenses
1. Navigate to `/admin/expenses`
2. Verify:
   - ✅ Expenses load
   - ✅ Totals calculate correctly

#### Create Expense
1. Click "Add Expense"
2. Fill in:
   - Branch
   - Category
   - Description
   - Amount
   - Date
3. Submit
4. Verify:
   - ✅ Expense is created
   - ✅ Expense appears in list

#### Delete Expense
1. Click delete on an expense
2. Confirm
3. Verify:
   - ✅ Expense is removed

### 7. Categories Management ✅

#### List Categories
1. Navigate to `/admin/categories`
2. Verify:
   - ✅ Categories load
   - ✅ Product counts display

#### Create Category
1. Click "Add Category"
2. Fill in name and description
3. Submit
4. Verify:
   - ✅ Category is created

#### Update Category
1. Click "Edit" on a category
2. Update name/description
3. Save
4. Verify:
   - ✅ Category is updated

#### Delete Category
1. Click "Delete" on a category
2. Confirm
3. Verify:
   - ✅ Category is removed

### 8. Customers Management ✅

#### View Customers
1. Navigate to `/admin/customers`
2. Verify:
   - ✅ Customers load
   - ✅ Total orders and spending display

#### View Customer Details
1. Click on a customer
2. Verify:
   - ✅ Customer details show
   - ✅ Order history displays

### 9. Users Management ✅

#### List Users
1. Navigate to `/admin/users` (Admin only)
2. Verify:
   - ✅ Users list loads
   - ✅ Roles display correctly

#### Create User
1. Click "Add User"
2. Fill in:
   - Name
   - Email
   - Password
   - Role (Admin/Attendant)
   - Branch (if attendant)
3. Submit
4. Verify:
   - ✅ User is created
   - ✅ User appears in list

#### Update User
1. Click "Edit" on a user
2. Update name/role/branch
3. Save
4. Verify:
   - ✅ User is updated

#### Delete User
1. Click "Delete" on a user
2. Confirm
3. Verify:
   - ✅ User is removed

### 10. Dashboard ✅

#### View Dashboard
1. Navigate to `/admin`
2. Verify:
   - ✅ Stats cards display:
     - Total Revenue
     - Total Orders
     - Total Customers
     - Total Products
   - ✅ Recent orders show
   - ✅ Top products show

### 11. Settings ✅

#### View Settings
1. Navigate to `/admin/settings`
2. Verify:
   - ✅ Settings form loads
   - ✅ Current values display

#### Update Settings
1. Change store name/email/phone
2. Update delivery fee
3. Save
4. Verify:
   - ✅ Settings are saved
   - ✅ Settings persist after refresh

## Error Handling Tests

### Network Errors
1. Stop the backend API
2. Try to load any page
3. Verify:
   - ✅ Error is caught
   - ✅ User-friendly error message displays
   - ✅ App doesn't crash

### Authentication Errors
1. Manually remove token from localStorage
2. Try to access protected route
3. Verify:
   - ✅ User is redirected to login
   - ✅ Error message displays

### Invalid Data
1. Try to create product with invalid price
2. Verify:
   - ✅ Validation error displays
   - ✅ Form doesn't submit

## Performance Tests

### Large Data Sets
1. Create 100+ products
2. Verify:
   - ✅ List loads in reasonable time
   - ✅ Pagination works (if implemented)

### Concurrent Requests
1. Open multiple tabs
2. Make changes in one tab
3. Verify:
   - ✅ Changes reflect in other tabs (if real-time sync)

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if available)

## Mobile Responsiveness

Test on:
- ✅ Mobile viewport (375px width)
- ✅ Tablet viewport (768px width)
- ✅ Desktop viewport (1920px width)

## Known Issues & Workarounds

1. **Settings Endpoint**: Uses localStorage fallback (backend may not have endpoint)
2. **Customers**: Derived from orders (no dedicated endpoint)
3. **Token Storage**: Token stored in localStorage (better-auth handles this)
4. **User Management**: Uses adminClient plugin with API fallback

## Next Steps After Testing

1. Fix any bugs found
2. Optimize slow queries
3. Add loading states where missing
4. Improve error messages
5. Add retry logic for failed requests
6. Implement request caching where appropriate

