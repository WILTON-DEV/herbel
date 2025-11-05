# Admin Dashboard Guide - The Organic Plug UG

## Overview
This comprehensive admin dashboard is designed specifically for **The Organic Plug UG** herbal products e-commerce platform. It enables shop attendants and administrators to manage orders, inventory, expenses, and sales across multiple branches in Uganda.

## Key Features

### 1. **Order Management** (`/admin/orders`)
Complete order tracking system with:
- **Dual Order Sources**: Automatically captures orders from the website AND allows manual entry by shop attendants
- **Delivery Methods**: 
  - **Pickup**: Customer collects from selected branch
  - **Delivery**: Home delivery to customer's location
- **Payment Status Tracking**:
  - **Sin (Cash Received)**: Cash collected at the shop
  - **Mum (Mobile Money)**: Payment sent directly to boss via mobile money
  - **Pending**: Awaiting payment
- **Order Status Management**: Track order lifecycle from pending to completed
- **Automatic Inventory Reduction**: When order is marked as paid (Sin or Mum), inventory automatically reduces

**How Shop Attendants Use It:**
1. View all orders (from website and manual entries)
2. For in-store customers: Click "Add Manual Order" to record the sale
3. Change payment status when cash is received or mobile money is sent
4. Orders automatically appear in Sales Records when marked as paid

### 2. **Inventory Management** (`/admin/inventory`)
Real-time stock tracking across all branches:
- **Multi-Branch Stock**: View stock levels for each branch separately
- **Quick Adjustments**: Increase/decrease stock with + and - buttons
- **Low Stock Alerts**: Automatically highlights products below 10 units
- **Product Search**: Quickly find any product
- **Filter by Branch**: View inventory for specific branches
- **Automatic Updates**: Inventory reduces when orders are confirmed as paid

### 3. **Sales Records** (`/admin/sales`)
Track daily sales by branch:
- **Sales by Branch**: View sales breakdown for each location
- **Payment Method Tracking**:
  - Cash (Sin) - received at shop
  - Mobile Money (Mum) - sent to boss
- **Sales Reports**: Filter by date range and branch
- **Performance Metrics**: Total sales, cash vs mobile money breakdown

**How It Works:**
- Sales are automatically recorded when orders are marked as paid
- Each sale shows: amount, payment method, delivery type, branch
- Shop attendants can track their daily performance

### 4. **Expenses Tracking** (`/admin/expenses`)
Record and manage shop expenses:
- **Categories**: Supplies, Transport, Utilities, Salaries, Marketing, Maintenance, Other
- **Branch-Specific**: Track expenses per location
- **Date Tracking**: Record when expense occurred
- **Recorded By**: Track who entered the expense
- **Filtering**: View expenses by branch or category
- **Summary Reports**: See total expenses

**How to Record an Expense:**
1. Click "Add Expense"
2. Select branch
3. Choose category
4. Enter description and amount
5. Select date
6. Enter your name
7. Click "Add Expense"

### 5. **Products Management** (`/admin/products`)
Manage product catalog:
- View all products with images and prices
- Products are categorized by functionality (hormonal balance, immune support, etc.)
- Edit product details
- Track product performance

### 6. **Dashboard** (`/admin`)
Quick overview:
- Total revenue
- Order count
- Customer count
- Product count
- Recent orders
- Top products

## Branch System

The system supports multiple branches:
1. **Main Branch - Kampala**
2. **Entebbe Branch**
3. **Ntinda Branch**
4. **Chengira Branch**

Each branch can:
- Manage their own inventory
- Record their own expenses
- Process orders (pickup and delivery)
- Track their sales

## Sales Recording Workflow

### For Shop Attendants:

1. **Customer Orders in Store:**
   - Go to Orders page
   - Click "Add Manual Order"
   - Enter customer details
   - Select Pickup or Delivery
   - Choose payment method (Sin for cash, Mum for mobile money)
   - Submit order

2. **Website Orders:**
   - Orders automatically appear in the Orders page
   - Change payment status when payment is received
   - Mark as Sin (cash) or Mum (mobile money)

3. **When to Mark Orders:**
   - **Sin (Cash Received)**: When customer pays cash at the shop
   - **Mum (Mobile Money)**: When payment is sent to boss via mobile money transfer

4. **Automatic Effects:**
   - Inventory automatically reduces
   - Sale is recorded in Sales Records
   - Can track in branch performance

## Admin vs Shop Attendant Access

**Admin Access:**
- Full access to all features
- Can view all branches
- Can manage all orders, inventory, expenses
- Access to analytics and settings

**Shop Attendant Access:**
- Same features as admin
- Typically focused on their own branch
- Can record expenses for their branch
- Can manage orders and inventory

## Product Categorization

Products are categorized by functionality:
- **Hormonal Balance**: Vitex, Dong Quai, Black Cohosh, etc.
- **Digestive Health**: Ulcers Tea, Aloe Vera, Probiotics, etc.
- **Immune Support**: Black Seed, Elderberry, Propolis, etc.
- **Women's Health**: Period Pain Tea, Womb Tea, Cranberry, etc.
- **Men's Health**: Saw Palmetto, Shilajit, Tongkat Ali, etc.
- **Cardiovascular**: High BP Tea, Hawthorn Berry, Omega 3, etc.
- **Detox & Cleanse**: Milk Thistle, Blood Detox, Colon Cleanse, etc.
- **Skin Care**: Face Glow Serum, Hair Oil, Castor Oil, etc.
- **Mental Wellness**: Ashwagandha, Lion's Mane, St. John's Wort, etc.
- **General Wellness**: Moringa, Green Tea, Sea Moss, etc.

## Key Terms

- **Sin**: Cash received at the shop (Swahili/local term for "received")
- **Mum**: Mobile Money sent to boss (short for "Mum" - sent to the main account)
- **Pickup**: Customer collects product from branch
- **Delivery**: Product is delivered to customer's location
- **Branch**: Physical store location
- **Stock**: Inventory/quantity of products available

## Best Practices

1. **Always Update Payment Status**: When you receive cash or send mobile money, update the order status immediately
2. **Check Inventory**: Before confirming orders, verify stock is available
3. **Record Expenses Daily**: Don't wait to record expenses - do it on the same day
4. **Verify Customer Details**: Double-check phone numbers and addresses for delivery orders
5. **Monitor Low Stock**: Check inventory page regularly for low stock alerts
6. **Track Your Branch Performance**: Review Sales Records to see your branch's daily performance

## Mobile Access

The entire admin dashboard is mobile-responsive:
- Access from phone or tablet
- All features work on mobile
- Optimized for on-the-go management
- Shop attendants can use their phones to manage orders

## Support & Help

For technical issues or questions:
1. Check this guide first
2. Contact your administrator
3. Review the system documentation

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Developed for**: The Organic Plug UG

