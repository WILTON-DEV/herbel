# Admin Dashboard Summary

## Overview

This is a comprehensive admin dashboard for managing a multi-branch herbal/essential oils business in Uganda. The dashboard is built with Next.js, React, and TypeScript, using a modern UI component library. The system tracks orders, inventory, sales, expenses, and customer data across multiple physical branches.

## Architecture & Technology

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Components**: Custom component library with shadcn/ui style components
- **State Management**: React useState hooks (client-side state)
- **Currency**: Ugandan Shillings (UGX) - all monetary values displayed with `formatUGX()` function
- **Color Scheme**:
  - Primary: `#1a3a2e` (dark green)
  - Accent: `#d4a574` (tan/beige)
  - Background: `#f5f1e8` (cream/beige)
  - Success: `#4CAF50` (green)

## Navigation Structure

The admin dashboard has a sidebar navigation with the following pages:

1. **Dashboard** (`/admin`) - Main overview page
2. **Orders** (`/admin/orders`) - Order management
3. **Inventory** (`/admin/inventory`) - Stock tracking
4. **Products** (`/admin/products`) - Product catalog
5. **Sales Records** (`/admin/sales`) - Sales tracking
6. **Expenses** (`/admin/expenses`) - Expense management
7. **Customers** (`/admin/customers`) - Customer database
8. **Analytics** (`/admin/analytics`) - Business analytics (coming soon)
9. **Categories** (`/admin/categories`) - Product categories
10. **Reviews** (`/admin/reviews`) - Customer reviews (coming soon)
11. **Settings** (`/admin/settings`) - System settings

## Branch System

The business operates with **4 branches**:

1. **Main Branch - Kampala** (id: `kampala`)
2. **Entebbe Branch** (id: `entebbe`)
3. **Ntinda Branch** (id: `ntinda`)
4. **Chengira Branch** (id: `chengira`)

Each branch has:

- Unique ID
- Name
- Address
- Phone number

## Core Features by Page

### 1. Dashboard (`/admin/page.tsx`)

**Purpose**: Overview of business metrics and recent activity

**Features**:

- **Statistics Cards** (4 cards):
  - Total Revenue (with percentage change from last month)
  - Total Orders (with count change)
  - Total Customers (with percentage change)
  - Total Products (with new products count)
- **Recent Orders Section**: List of 5 most recent orders showing:
  - Customer name
  - Product name
  - Amount
  - Status (Completed, Processing, Shipped)
- **Top Products Section**: Best-selling products with:
  - Product name
  - Sales count
  - Revenue generated

**Current State**: Uses mock/static data

---

### 2. Orders (`/admin/orders/page.tsx`)

**Purpose**: Comprehensive order management system for both website and manual shop orders

**Key Features**:

- **Order Sources**:
  - Website orders (🌐 Website)
  - Manual orders entered by shop attendants (🏪 Manual)
- **Order Statuses**:
  - `pending` - Order placed but not confirmed
  - `confirmed` - Order confirmed
  - `cash-received` (Sin) - Cash payment received at shop
  - `mobile-money-received` (Mum) - Mobile money sent to boss
  - `completed` - Order fulfilled
  - `cancelled` - Order cancelled
- **Payment Methods**:
  - `pending` - Payment not yet received
  - `cash` (Sin) - Cash received at shop
  - `mobile-money` (Mum) - Mobile money sent to boss
- **Delivery Methods**:
  - `pickup` - Customer picks up from branch
  - `delivery` - Home delivery

**Functionality**:

- **Filters**:
  - Filter by status (all, pending, confirmed, cash-received, mobile-money-received, completed, cancelled)
  - Filter by branch (all branches or specific branch)
- **Order Table** displays:
  - Order number with source indicator
  - Customer name and phone
  - Delivery type (pickup/delivery) with icons
  - Location/Branch
  - Total amount (UGX)
  - Payment method (editable dropdown)
  - Status badge (color-coded)
  - View details button
- **Order Details Dialog**:
  - Full customer information (name, phone, email)
  - Delivery method and location
  - Complete order items list with quantities and prices
  - Subtotal, delivery fee, and total breakdown
  - Editable payment method selector
  - Editable order status selector
  - Order notes (if any)
  - Created and updated timestamps
- **Manual Order Creation**:
  - Dialog form to create orders manually
  - Fields:
    - Customer name (required)
    - Customer phone (required)
    - Delivery method (pickup/delivery)
    - Branch selection (if pickup)
    - Delivery location (if delivery)
    - Payment method
    - Notes (optional)
  - Note: Currently shows alert - backend integration pending

**Business Logic**:

- When payment method changes to "cash", status automatically updates to "cash-received"
- When payment method changes to "mobile-money", status automatically updates to "mobile-money-received"
- Orders can be updated in real-time (status and payment method)

---

### 3. Inventory (`/admin/inventory/page.tsx`)

**Purpose**: Track product stock levels across all branches

**Key Features**:

- **Summary Cards**:
  - Total Products count
  - Low Stock Items count (items with total stock < 10 units)
  - Branch filter selector
  - Product search input
- **Inventory Display**:
  - Products grouped by product ID
  - Each product shows:
    - Product image (thumbnail)
    - Product name
    - Price (UGX)
    - Total stock across all branches
    - Low stock badge if total < 10 units
    - Per-branch stock breakdown:
      - Branch name
      - Current quantity
      - Increment/decrement buttons (+/-)
- **Stock Management**:
  - Quick adjust buttons (+/-) for each branch
  - Stock cannot go below 0
  - Last updated timestamp per stock entry
- **Filters**:
  - Filter by branch (all or specific branch)
  - Search by product name
- **Automatic Updates**:
  - Note displayed that inventory is automatically reduced when orders are marked as "Cash Received (Sin)" or "Mobile Money Received (Mum)" in Orders page

**Current State**: Uses mock data from inventory file, initialized with products mapped to all branches

---

### 4. Products (`/admin/products/page.tsx`)

**Purpose**: Manage product catalog

**Features**:

- **Product List Table**:
  - Product image (thumbnail)
  - Product name
  - Price (UGX) - shows single price or first price option
  - Edit button (icon)
  - Delete button (icon)
- **Actions**:
  - "Add Product" button (links to `/admin/products/new` - page not yet implemented)
  - Edit and delete buttons (currently non-functional)

**Current State**: Displays products from inventory data file, edit/delete actions not implemented

---

### 5. Sales Records (`/admin/sales/page.tsx`)

**Purpose**: Track daily sales by branch with detailed payment breakdown

**Key Features**:

- **Filters**:
  - Filter by branch (all or specific branch)
  - Filter by date range (Today, This Week, This Month, All Time)
- **Summary Cards** (3 cards):
  - Total Sales (UGX) with sale count
  - Cash Received (Sin) - Total cash collected at shop
  - Mobile Money (Mum) - Total mobile money sent to boss
- **Sales by Branch Section**:
  - Each branch shows:
    - Branch name
    - Total sales amount
    - Sale count
    - Cash (Sin) breakdown (green card)
    - Mobile Money (Mum) breakdown (purple card)
- **Detailed Sales Records Table**:
  - Date
  - Order number
  - Branch
  - Delivery type (pickup/delivery with icons)
  - Amount (UGX)
  - Payment status badge (Cash, MoMo, or Pending)
  - Recorded by (staff name)
- **Information Card**:
  - Explains "Sin" (Cash Received) - payment at shop
  - Explains "Mum" (Mobile Money) - payment sent to boss
  - Notes that sales are automatically recorded when orders marked as paid

**Business Logic**:

- Sales records are linked to orders
- Status can be: `cash-received`, `mobile-money-sent`, or `pending`
- Sales automatically recorded when orders marked as paid

---

### 6. Expenses (`/admin/expenses/page.tsx`)

**Purpose**: Track and manage shop expenses by branch

**Key Features**:

- **Expense Categories**:
  - Supplies & Packaging
  - Transportation
  - Utilities
  - Salaries & Wages
  - Marketing
  - Maintenance
  - Other
- **Summary Cards**:
  - Total Expenses (UGX) with expense count
  - Branch filter selector
  - Category filter selector
- **Add Expense Dialog**:
  - Branch selection (required)
  - Category selection (required)
  - Description textarea (required)
  - Amount in UGX (required, number input)
  - Date picker (required)
  - Recorded By field (required, defaults to "Shop Attendant")
- **Expenses Table**:
  - Date
  - Branch name
  - Category name
  - Description
  - Amount (UGX)
  - Recorded By (staff name)
  - Delete button (with confirmation)
- **Filters**:
  - Filter by branch (all or specific branch)
  - Filter by category (all or specific category)

**Functionality**:

- Add new expenses with full form validation
- Delete expenses with confirmation dialog
- Filter expenses by branch and/or category
- Calculate total expenses for filtered results

---

### 7. Customers (`/admin/customers/page.tsx`)

**Purpose**: View and manage customer information

**Features**:

- **Customer Table**:
  - Customer name
  - Email address
  - Total orders count
  - Total spent (currency)
  - Join date
  - View details button (icon)
- **Actions**:
  - View customer details (button present but functionality not implemented)

**Current State**: Uses mock customer data, view details functionality not implemented

---

### 8. Analytics (`/admin/analytics/page.tsx`)

**Status**: Coming Soon

- Currently displays "Analytics page coming soon"
- Commented code shows planned features:
  - Revenue metrics
  - Order metrics
  - Average order value
  - Conversion rate
  - Sales overview chart
  - Top selling products
  - Traffic sources

---

### 9. Categories (`/admin/categories/page.tsx`)

**Purpose**: Organize products into categories

**Features**:

- **Category List**:
  - Category name
  - Description
  - Product count per category
  - Edit button (icon)
  - Delete button (icon)
- **Actions**:
  - "Add Category" button (not yet functional)
  - Edit and delete buttons (not yet functional)

**Current State**: Displays mock categories, CRUD operations not implemented

---

### 10. Reviews (`/admin/reviews/page.tsx`)

**Status**: Coming Soon

- Currently displays "Reviews page coming soon"
- Commented code shows planned features:
  - Customer reviews list
  - Star ratings (1-5)
  - Review comments
  - Approve/Reject functionality for pending reviews
  - Review status (pending/approved)

---

### 11. Settings (`/admin/settings/page.tsx`)

**Purpose**: Manage store configuration

**Sections**:

1. **Store Information**:

   - Store name
   - Store email
   - Phone number
   - Address
   - "Save Changes" button (not yet functional)

2. **Payment Settings**:

   - Currency selector
   - Tax rate percentage
   - "Save Changes" button (not yet functional)

3. **Delivery Settings**:
   - Standard delivery fee (UGX)
   - Free delivery threshold (UGX)
   - "Save Changes" button (not yet functional)

**Current State**: Form fields present with default values, save functionality not implemented

---

## Data Models

### Order

```typescript
{
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: "pickup" | "delivery";
  branch?: string; // For pickup orders
  location?: string; // For delivery orders
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  source: "website" | "manual";
}
```

### SalesRecord

```typescript
{
  id: string;
  orderId: string;
  branch: string;
  amount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  status: "cash-received" | "mobile-money-sent" | "pending";
  date: Date;
  recordedBy: string;
}
```

### Expense

```typescript
{
  id: string;
  branch: string;
  description: string;
  amount: number;
  category: string;
  recordedBy: string;
  date: Date;
  createdAt: Date;
}
```

### InventoryItem

```typescript
{
  productId: string;
  branch: string;
  quantity: number;
  lastUpdated: Date;
}
```

## Key Business Rules

1. **Payment Terminology**:

   - **"Sin"** = Cash received at the shop (held at branch)
   - **"Mum"** = Mobile money sent directly to boss

2. **Order Status Flow**:

   - Orders can be created as `pending`
   - When payment method is set to `cash`, status becomes `cash-received`
   - When payment method is set to `mobile-money`, status becomes `mobile-money-received`
   - Orders can be marked as `completed` or `cancelled`

3. **Inventory Management**:

   - Inventory is tracked per product per branch
   - Stock is automatically reduced when orders are marked as paid (cash-received or mobile-money-received)
   - Low stock alert triggers when total stock < 10 units

4. **Sales Recording**:

   - Sales are automatically recorded when orders are marked as paid
   - Sales records track which branch, payment method, and who recorded it

5. **Multi-Branch Operations**:
   - All major features support branch filtering
   - Inventory, sales, and expenses are tracked per branch
   - Orders can be assigned to specific branches for pickup

## Current Implementation Status

### Fully Functional:

- ✅ Dashboard overview (with mock data)
- ✅ Orders management (CRUD operations, filtering, status updates)
- ✅ Inventory tracking (view, adjust stock per branch)
- ✅ Sales records (view, filtering, branch breakdown)
- ✅ Expenses (add, delete, filtering)

### Partially Functional:

- ⚠️ Products (view only, edit/delete not implemented)
- ⚠️ Customers (view only, details not implemented)
- ⚠️ Categories (view only, CRUD not implemented)
- ⚠️ Settings (form fields only, save not implemented)

### Not Yet Implemented:

- ❌ Analytics page
- ❌ Reviews page
- ❌ Product creation/editing
- ❌ Category management
- ❌ Customer details view
- ❌ Settings persistence
- ❌ Backend API integration (currently uses mock data)

## UI/UX Features

- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Color-Coded Status Badges**: Visual indicators for order statuses
- **Icons**: Visual indicators for delivery methods (pickup/delivery)
- **Filtering**: Most pages support filtering by branch and other criteria
- **Search**: Inventory page supports product name search
- **Dialogs/Modals**: Used for forms and detailed views
- **Real-time Updates**: Order status and payment method can be updated inline
- **Confirmation Dialogs**: Delete operations require confirmation

## Data Sources

Currently, the dashboard uses:

- **Mock Data**: `lib/mock-data.ts` - Contains sample orders, sales records, expenses
- **Inventory Data**: `lib/inventory.ts` - Product catalog with prices and images
- **Type Definitions**: `lib/types.ts` - TypeScript types and branch definitions

## Integration Points Needed

To make this production-ready, the following backend integrations are needed:

1. **API Endpoints** for:

   - Orders (CRUD operations)
   - Inventory (stock updates)
   - Sales records (automatic creation)
   - Expenses (CRUD operations)
   - Products (CRUD operations)
   - Customers (view and management)
   - Categories (CRUD operations)
   - Settings (persistence)

2. **Real-time Updates**: WebSocket or polling for order updates from website

3. **Authentication**: Admin login and authorization

4. **Data Persistence**: Database for all entities

5. **File Upload**: Product image management

## Special Notes

- The system is designed for a Ugandan business context with:

  - UGX currency formatting
  - Mobile money payment integration
  - Multi-branch retail operations
  - Manual order entry for shop attendants
  - Cash vs mobile money payment tracking (Sin vs Mum)

- The dashboard supports both:

  - **Website orders**: Orders placed through the e-commerce website
  - **Manual orders**: Orders entered by shop attendants at physical locations

- Payment flow distinguishes between:
  - Cash collected at shop (Sin) - stays at branch
  - Mobile money sent to owner (Mum) - goes directly to boss
