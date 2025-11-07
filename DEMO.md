# Herbel Admin Dashboard Demo Guide

## Overview

This is a fully functional frontend demo of the Herbel Admin Dashboard for managing a multi-branch herbal/essential oils business. The system uses mock APIs with localStorage persistence, allowing you to test all operational flows without a backend.

## Demo Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password` (any password works in demo mode)
- **Access**: Full access to all features and all branches

### Shop Attendant Accounts

#### Kampala Branch
- **Email**: `attendant@kampala.example`
- **Password**: `password`
- **Access**: Can create manual orders and view data filtered to Kampala branch

#### Ntinda Branch
- **Email**: `attendant@ntinda.example`
- **Password**: `password`
- **Access**: Can create manual orders and view data filtered to Ntinda branch

## Key User Stories & Walkthroughs

### User Story 1: Admin Managing Complete Order Flow

**Goal**: As an Admin, I want to manage orders from creation to completion, including payment tracking and inventory management.

**Steps**:
1. **Login** as Admin (`admin@example.com`)
2. Navigate to **Dashboard** - See overview of total revenue, orders, customers, and products
3. Go to **Orders** page
4. **Filter Orders**:
   - Try filtering by Status (Pending, Confirmed, etc.)
   - Try filtering by Branch (Kampala, Entebbe, etc.)
   - Try filtering by Source (Website vs Manual)
5. **View Order Details**: Click the eye icon on any order
   - See full customer information
   - View order items breakdown
   - See subtotal, delivery fee, and total
6. **Update Payment Method**: Change payment to "Cash (Sin)" or "MoMo (Mum)"
   - **Notice**: Status automatically updates to "cash-received" or "mobile-money-received"
   - **Behind the scenes**: Inventory is automatically deducted and a sales record is created
7. Navigate to **Sales** page to see the new sales record
8. Navigate to **Inventory** page to see stock reduced for that branch

**Expected Outcome**: Complete order processing with automatic inventory and sales tracking.

---

### User Story 2: Shop Attendant Creating Manual Order

**Goal**: As a Shop Attendant, I want to create a manual order for a customer who visits the physical shop.

**Steps**:
1. **Login** as Kampala Attendant (`attendant@kampala.example`)
2. Navigate to **Orders** page
3. Click **"Add Manual Order"** button
4. **Fill in Order Form**:
   - Customer Name: `Test Customer`
   - Phone: `0700 123 456`
   - Delivery Method: Choose "Pickup from Store"
   - Branch: Kampala (pre-selected)
   - Click "Add Item" and select a product with quantity
   - Add multiple items if needed
   - Payment Method: Choose "Cash (Sin)" or leave as "Pending"
   - Add optional notes
5. **Review Total**: See subtotal and delivery fee calculation
6. Click **"Create Order"**
7. **Verify**: See the new order in the orders list with 🏪 Manual badge
8. If you marked payment as received, check **Inventory** to see stock reduced
9. Check **Sales** page to see the sales record

**Expected Outcome**: Manual order created successfully with all tracking in place.

---

### User Story 3: Inventory Manager Tracking Stock

**Goal**: As an Inventory Manager, I want to monitor stock levels across all branches and receive low-stock alerts.

**Steps**:
1. **Login** as Admin
2. Navigate to **Inventory** page
3. **View Summary Cards**:
   - Total Products count
   - Low Stock Items (< 10 units total across branches)
4. **Filter by Branch**: Select a specific branch to see its inventory
5. **Search Products**: Use the search box to find specific products
6. **View Per-Branch Stock**: Each product shows quantity at each branch
7. **Adjust Stock**:
   - Click the **+** button to add stock
   - Click the **-** button to remove stock (cannot go below 0)
8. **Notice Low Stock Badge**: Products with total < 10 units show "Low Stock" badge
9. **Read Info Card**: Understand that inventory auto-reduces when orders are marked as paid

**Expected Outcome**: Complete visibility of stock levels with easy management controls.

---

### User Story 4: Finance Person Reviewing Sales

**Goal**: As a Finance Person, I want to see daily sales breakdown by branch and payment method (Sin vs Mum).

**Steps**:
1. **Login** as Admin
2. Navigate to **Sales Records** page
3. **View Summary Cards**:
   - Total Sales amount
   - Cash Received (Sin) - money at shop
   - Mobile Money (Mum) - money sent to boss
4. **Apply Filters**:
   - Filter by Branch
   - Filter by Date Range (Today, This Week, This Month, All Time)
5. **View Sales by Branch**: See breakdown per branch with cash vs mobile money split
6. **View Detailed Records**: See individual sales with:
   - Date, Order number, Branch
   - Delivery type (pickup/delivery)
   - Amount and payment method
   - Who recorded it
7. **Read Info Card**: Understand Sin vs Mum terminology and auto-recording

**Expected Outcome**: Clear financial overview with payment method tracking.

---

### User Story 5: Admin Managing Products

**Goal**: As an Admin, I want to add, edit, and delete products in the catalog.

**Steps**:
1. **Login** as Admin
2. Navigate to **Products** page
3. **View Current Products**: See list with images, names, categories, and prices
4. **Add New Product**:
   - Click **"Add Product"** button
   - Fill in:
     - Product Name
     - Description
     - Category (select from dropdown)
     - Image URL (e.g., `https://images.unsplash.com/photo...`)
     - Price in UGX
   - Click **"Create Product"**
5. **Edit Product**:
   - Click edit icon on any product
   - Update fields as needed
   - Click **"Update Product"**
6. **Delete Product**:
   - Click delete (trash) icon
   - Confirm deletion
7. **Verify**: Product changes reflected in Products list and Inventory

**Expected Outcome**: Complete product catalog management.

---

### User Story 6: Admin Tracking Expenses

**Goal**: As an Admin, I want to track and categorize shop expenses by branch.

**Steps**:
1. **Login** as Admin
2. Navigate to **Expenses** page
3. **View Summary**: See total expenses with count
4. **Add New Expense**:
   - Click **"Add Expense"** button
   - Select Branch
   - Select Category (Supplies, Transport, Utilities, etc.)
   - Enter Description
   - Enter Amount in UGX
   - Select Date
   - Click **"Add Expense"**
5. **Filter Expenses**:
   - Filter by Branch
   - Filter by Category
6. **View Expense Table**: See all expenses with dates, amounts, and who recorded them
7. **Delete Expense**: Click trash icon to remove an expense

**Expected Outcome**: Complete expense tracking by branch and category.

---

### User Story 7: Admin Managing Categories

**Goal**: As an Admin, I want to organize products into categories.

**Steps**:
1. **Login** as Admin
2. Navigate to **Categories** page
3. **View Categories**: See list with names, descriptions, and product counts
4. **Add Category**:
   - Click **"Add Category"**
   - Enter Category Name
   - Enter Description
   - Click **"Create Category"**
5. **Edit Category**: Click edit icon, update fields, save
6. **Delete Category**: Click delete icon and confirm

**Expected Outcome**: Organized category structure for products.

---

### User Story 8: Admin Updating Settings

**Goal**: As an Admin, I want to configure store settings and reset demo data.

**Steps**:
1. **Login** as Admin
2. Navigate to **Settings** page
3. **Update Store Information**:
   - Store Name, Email, Phone, Address
   - Click **"Save Changes"**
4. **Update Payment Settings**:
   - Currency, Tax Rate
   - Click **"Save Changes"**
5. **Update Delivery Settings**:
   - Standard Delivery Fee
   - Free Delivery Threshold
   - Click **"Save Changes"**
6. **Reload Page**: Verify settings persist after refresh
7. **Reset Demo Data** (optional):
   - Scroll to "Demo Data Management" section
   - Click **"Reset All Demo Data"**
   - Confirm the action
   - Page reloads with fresh seed data

**Expected Outcome**: Settings saved to localStorage and persist across sessions.

---

### User Story 9: Viewing Customer Information

**Goal**: As an Admin, I want to view customer profiles and order history.

**Steps**:
1. **Login** as Admin
2. Navigate to **Customers** page
3. **View Customer List**: See names, emails, order counts, and total spent
4. **View Customer Details**:
   - Click eye icon on any customer
   - See full contact information
   - View complete order history with dates, order numbers, amounts, and statuses

**Expected Outcome**: Complete customer relationship management view.

---

## Business Logic Demonstrations

### Sin vs Mum Payment Flow

**Sin (Cash Received at Shop)**:
1. Create or select an order
2. Set Payment Method to "Cash (Sin)"
3. **Automatic Actions**:
   - Status changes to "cash-received"
   - Sales record created with "Cash (Sin)" label
   - Inventory deducted from branch
   - Cash tracked as held at shop (green indicators)

**Mum (Mobile Money to Boss)**:
1. Create or select an order
2. Set Payment Method to "MoMo (Mum)"
3. **Automatic Actions**:
   - Status changes to "mobile-money-received"
   - Sales record created with "MoMo (Mum)" label
   - Inventory deducted from branch
   - Money tracked as sent to boss (purple indicators)

### Inventory Auto-Deduction

1. Create an order with items (e.g., 3x Product A)
2. Check Inventory - note current stock at relevant branch
3. Set order payment to "Cash" or "MoMo"
4. **Observe**:
   - Status changes to paid
   - Go back to Inventory
   - Stock reduced by 3 units at that branch
   - Last Updated timestamp updated
5. **Low Stock Alert**: If total drops below 10, orange "Low Stock" badge appears

### Insufficient Inventory Prevention

1. Create an order with high quantity (e.g., 50 units)
2. If branch doesn't have enough stock, attempt to mark as paid
3. **Result**: Error message prevents payment status change
4. Order stays in pending/confirmed until stock replenished

---

## Testing Checklist for Stakeholders

### Authentication & Access Control
- [ ] Login as Admin works
- [ ] Login as Attendant works
- [ ] Logout works
- [ ] User name and role displayed in header
- [ ] Admin can access all pages
- [ ] Attendant has limited access (cannot access settings, etc.)

### Dashboard
- [ ] Shows correct total revenue from sales
- [ ] Shows correct order count
- [ ] Shows correct customer and product counts
- [ ] Recent orders display with correct status colors
- [ ] Top products show actual sales data

### Orders Page
- [ ] Can filter by status, branch, source
- [ ] Search by order number, customer name, phone works
- [ ] Can create manual orders
- [ ] Manual order shows 🏪 badge, website orders show 🌐 badge
- [ ] Payment method dropdown changes status automatically
- [ ] Order details modal shows complete information
- [ ] Inventory reduces when marked as paid
- [ ] Sales record created when marked as paid

### Inventory Page
- [ ] Shows correct total products and low stock count
- [ ] Filter by branch works
- [ ] Search by product name works
- [ ] Per-branch stock displays correctly
- [ ] +/- buttons adjust stock (cannot go below 0)
- [ ] Low Stock badge appears when total < 10

### Products Page
- [ ] List displays with images and prices
- [ ] Can add new product with all fields
- [ ] Can edit existing product
- [ ] Can delete product with confirmation
- [ ] Changes reflect in Inventory page

### Sales Page
- [ ] Summary cards show correct totals
- [ ] Filter by branch and date range works
- [ ] Sales by branch breakdown correct
- [ ] Detailed records show all sales
- [ ] Cash (Sin) vs MoMo (Mum) tracked correctly

### Expenses Page
- [ ] Can add expense with all categories
- [ ] Filter by branch and category works
- [ ] Total expenses calculated correctly
- [ ] Can delete expenses
- [ ] Expense list sorted by date

### Customers Page
- [ ] Customer list shows correct data
- [ ] Customer details modal shows profile
- [ ] Order history displays for each customer

### Categories Page
- [ ] Can add new category
- [ ] Can edit category
- [ ] Can delete category

### Settings Page
- [ ] Store information editable and persists
- [ ] Payment settings editable and persists
- [ ] Delivery settings editable and persists
- [ ] Reset Demo Data restores seed data

---

## Advanced Demo Scenarios

### Scenario: Full Order Lifecycle
1. Shop attendant creates manual order (pending)
2. Admin confirms order (status → confirmed)
3. Customer pays via mobile money (payment → mobile-money, status → mobile-money-received)
4. Sales record auto-created
5. Inventory auto-deducted
6. Admin marks order complete (status → completed)
7. Check sales, inventory, and customer profile reflect changes

### Scenario: Multi-Branch Stock Management
1. View inventory for all branches
2. Filter to Kampala branch only
3. Adjust stock for multiple products
4. Create order for Ntinda branch
5. Mark as paid and verify Ntinda inventory reduces (not Kampala)

### Scenario: Data Persistence Test
1. Create several orders, products, expenses
2. Update settings
3. Close browser completely
4. Reopen and login
5. Verify all data persists (localStorage)
6. Use Reset Demo Data to restore seed data

---

## Technical Notes

### Data Storage
- All data stored in browser localStorage
- Changes persist across page reloads
- Each data type has separate storage key
- Reset Demo Data clears all and reloads seed data

### Mock API Layer
- Simulates 200-700ms network latency
- Returns Promises for async operations
- Enforces business logic (Sin/Mum auto-status, inventory checks)
- Handles validation (e.g., insufficient inventory)

### Role-Based Access
- Admin: Full access to all features
- Attendant: Limited to orders, inventory (branch-specific), and view-only for most pages

---

## Troubleshooting

**Problem**: Data not persisting after refresh
- **Solution**: Ensure browser allows localStorage. Check browser console for errors.

**Problem**: Login not working
- **Solution**: Any password works in demo mode. Check that email matches demo accounts exactly.

**Problem**: Inventory not reducing
- **Solution**: Ensure payment method is set to "Cash" or "MoMo", not "Pending". Check browser console for errors.

**Problem**: Want to start fresh
- **Solution**: Go to Settings page and click "Reset All Demo Data"

---

## Contact & Support

This is a demo/prototype system. For questions about implementation or to request changes, refer to the project documentation or contact the development team.

**Demo System Version**: 1.0  
**Last Updated**: November 2024

