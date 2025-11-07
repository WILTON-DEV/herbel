# Herbel - Multi-Branch Herbal Shop Management System

A comprehensive admin dashboard for managing a multi-branch herbal/essential oils business in Uganda, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with localStorage support

### Installation

```bash
# Clone the repository
cd /home/wilton/Desktop/my_projects/herbel

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Dashboard Access

Navigate to [http://localhost:3000/admin/auth/login](http://localhost:3000/admin/auth/login) to access the admin dashboard.

## 🔐 Demo Credentials

The system includes pre-configured demo accounts for testing:

### Admin Account (Full Access)
- **Email**: `admin@example.com`
- **Password**: `password` (any password works in demo mode)
- **Permissions**: Full access to all features across all branches

### Shop Attendant Accounts

#### Kampala Branch Attendant
- **Email**: `attendant@kampala.example`
- **Password**: `password`
- **Permissions**: Manual order creation, inventory management for Kampala branch

#### Ntinda Branch Attendant
- **Email**: `attendant@ntinda.example`
- **Password**: `password`
- **Permissions**: Manual order creation, inventory management for Ntinda branch

**Note**: In demo mode, any password will work for authentication. This is for demonstration purposes only.

## 📋 Features

### Core Functionality

#### 🔒 Authentication & Authorization
- Role-based access control (Admin, Shop Attendant)
- Secure login with session management
- User profile display with role badges
- Branch-specific access for attendants

#### 📊 Dashboard
- Real-time business metrics (revenue, orders, customers, products)
- Recent orders overview
- Top-selling products
- Quick access navigation

#### 🛍️ Orders Management
- **Dual Order Sources**: Website orders & Manual shop orders
- **Advanced Filtering**: By status, branch, source, search
- **Payment Tracking**: Sin (Cash at shop) vs Mum (Mobile money to boss)
- **Status Flow**: Pending → Confirmed → Paid → Completed
- **Business Logic**:
  - Auto-status updates when payment method changes
  - Automatic inventory deduction on payment
  - Automatic sales record creation
  - Insufficient inventory prevention
- **Manual Order Creation**: Full form for shop attendants
- **Order Details**: Complete breakdown with customer info, items, and totals

#### 📦 Inventory Management
- **Multi-Branch Tracking**: Per-branch stock levels
- **Quick Adjustments**: +/- buttons for stock changes
- **Low Stock Alerts**: Automatic warnings when total < 10 units
- **Real-time Updates**: Reflects order fulfillment immediately
- **Filtering**: By branch and product name
- **Visual Display**: Product images with quantities

#### 💰 Sales Records
- **Automatic Recording**: Sales created when orders marked as paid
- **Payment Breakdown**: Sin (Cash) vs Mum (Mobile Money) tracking
- **Branch Analytics**: Sales summary per branch
- **Date Filtering**: Today, Week, Month, All Time
- **Detailed Reports**: Date, order number, amount, payment method, recorded by

#### 💸 Expense Tracking
- **Category-Based**: Supplies, Transport, Utilities, Salaries, Marketing, Maintenance, Other
- **Branch-Specific**: Track expenses per location
- **Full CRUD**: Add, view, filter, delete
- **Filtering**: By branch and category
- **Total Calculations**: Dynamic expense totals

#### 📦 Product Catalog
- **Complete CRUD**: Create, Read, Update, Delete products
- **Rich Information**: Name, description, category, image, price
- **Category Management**: Organize products logically
- **Image Support**: URL-based product images
- **Inventory Integration**: Auto-creates inventory entries for new products

#### 👥 Customer Management
- **Customer Profiles**: Name, email, phone, join date
- **Purchase History**: Total orders and spending
- **Order History View**: Complete order timeline per customer
- **Analytics**: Customer lifetime value tracking

#### 🏷️ Category Management
- **Product Organization**: Group products by type
- **Full CRUD**: Create, edit, delete categories
- **Product Count**: Automatic tracking of products per category

#### ⚙️ Settings
- **Store Information**: Name, email, phone, address
- **Payment Configuration**: Currency, tax rate
- **Delivery Settings**: Standard fee, free delivery threshold
- **Data Persistence**: Settings saved to localStorage
- **Demo Data Reset**: One-click restore of seed data

### Business-Specific Features

#### Multi-Branch System
- **4 Branches**: Kampala (Main), Entebbe, Ntinda, Chengira
- **Branch-Specific Operations**: Inventory, orders, sales, expenses
- **Attendant Assignment**: Each attendant tied to specific branch

#### Sin vs Mum Payment Terminology
- **Sin (Cash Received)**: Payment collected as cash at shop, held at branch
- **Mum (Mobile Money)**: Payment sent directly to boss via mobile money
- **Visual Indicators**: Color-coded badges (green for Sin, purple for Mum)
- **Automatic Recording**: Payment method triggers appropriate sales records

#### Currency & Localization
- **Ugandan Shillings (UGX)**: All prices and amounts
- **Local Context**: Designed for Ugandan business practices
- **Mobile Money Integration**: Acknowledges common payment method

## 🛠️ Technical Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library (shadcn/ui style)
- **State Management**: React Context API
- **Icons**: Lucide React

### Data Layer
- **Mock API**: Promise-based with simulated latency
- **Storage**: Browser localStorage
- **Persistence**: Automatic across page reloads
- **Seed Data**: Pre-populated demo data
- **Business Logic**: Enforced in mock API layer

### Architecture
- **Client-Side Rendering**: "use client" directives
- **Context Providers**: Auth, Cart (existing)
- **Protected Routes**: Authentication required for admin pages
- **Modular Design**: Separate components for forms, tables, dialogs

## 📁 Project Structure

```
herbel/
├── app/
│   ├── admin/
│   │   ├── auth/login/          # Login page
│   │   ├── analytics/           # Analytics (placeholder)
│   │   ├── categories/          # Category management
│   │   ├── customers/           # Customer management
│   │   ├── expenses/            # Expense tracking
│   │   ├── inventory/           # Stock management
│   │   ├── orders/              # Order management
│   │   ├── products/            # Product catalog
│   │   ├── reviews/             # Reviews (placeholder)
│   │   ├── sales/               # Sales records
│   │   ├── settings/            # System settings
│   │   ├── layout.tsx           # Admin layout with auth
│   │   └── page.tsx             # Dashboard
│   ├── (storefront pages...)    # E-commerce frontend
│   └── layout.tsx               # Root layout with providers
├── components/
│   ├── admin-header.tsx         # Admin header with user menu
│   ├── admin-sidebar.tsx        # Admin navigation sidebar
│   ├── ui/                      # Reusable UI components
│   └── (storefront components...)
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── lib/
│   ├── mockApi.ts               # Mock API layer
│   ├── types.ts                 # TypeScript type definitions
│   ├── inventory.ts             # Product inventory data
│   └── mock-data.ts             # Legacy mock data
├── ADMIN_DASHBOARD_SUMMARY.md   # Complete feature documentation
├── DEMO.md                      # User stories & walkthrough
└── README.md                    # This file
```

## 🎯 Key Workflows

### Order Processing Flow
1. Order created (website or manual)
2. Order confirmed
3. Payment method selected (Sin/Mum/Pending)
4. When payment = Cash or MoMo:
   - Status auto-updates to paid status
   - Inventory checked for availability
   - If sufficient, inventory deducted
   - Sales record auto-created
   - Recorded by current user
5. Order marked as completed

### Inventory Management Flow
1. Products added to catalog
2. Inventory initialized per branch
3. Manual adjustments via +/- buttons
4. Automatic deduction on paid orders
5. Low stock alerts when total < 10
6. Branch-specific stock tracking

### Sales Recording Flow
1. Triggered automatically when order paid
2. Branch determined by order (pickup) or attendant (delivery)
3. Amount equals order total
4. Payment method and status recorded
5. Recorded by user who marked payment
6. Appears in Sales page immediately

## 🧪 Testing Guide

See [DEMO.md](./DEMO.md) for complete testing instructions, including:
- User stories for each role (Admin, Attendant)
- Step-by-step walkthroughs
- Business logic demonstrations
- Testing checklist for stakeholders
- Advanced demo scenarios

### Quick Test Sequence
1. Login as Admin
2. Create a manual order
3. Add expense at branch
4. Add new product
5. Mark order as paid (cash)
6. Check inventory reduced
7. Check sales record created
8. View customer profile
9. Update settings
10. Reset demo data

## 📦 Data Management

### LocalStorage Keys
- `herbel_orders` - Order data
- `herbel_products` - Product catalog
- `herbel_customers` - Customer profiles
- `herbel_inventory` - Stock levels
- `herbel_sales` - Sales records
- `herbel_expenses` - Expense records
- `herbel_categories` - Product categories
- `herbel_users` - User accounts
- `herbel_settings` - System settings
- `herbel_initialized` - Initialization flag

### Reset Demo Data
Navigate to Settings page → Scroll to "Demo Data Management" → Click "Reset All Demo Data"

This will:
- Clear all localStorage data
- Restore original seed data
- Reload the page
- Useful for demos and testing

## 🔄 Seed Data Included

- **Users**: 3 (1 admin, 2 attendants)
- **Products**: 10 herbal products with images
- **Customers**: 6 with order history
- **Orders**: 8 mixed (website & manual)
- **Inventory**: Stock initialized per branch for all products
- **Sales Records**: 5 historical sales
- **Expenses**: 5 across different branches
- **Categories**: 5 product categories

## 🚧 Future Enhancements

The following features are planned but not yet implemented:

### Backend Integration
- Replace mock API with real REST/GraphQL backend
- Database persistence (PostgreSQL/MongoDB)
- Authentication with JWT tokens
- File upload for product images

### Additional Features
- **Analytics Page**: Charts and graphs for business insights
- **Reviews Management**: Approve/reject customer reviews
- **Email Notifications**: Order confirmations, low stock alerts
- **Export Functionality**: CSV/PDF reports
- **Multi-currency Support**: Beyond UGX
- **Batch Operations**: Bulk product updates
- **Advanced Search**: Full-text search across all entities

## 🐛 Known Limitations

- **Demo Mode Only**: All authentication bypassed (any password works)
- **Client-Side Storage**: Data lost if browser cache cleared
- **No Real-time Sync**: Changes not reflected across devices/tabs
- **Image URLs**: Must be publicly accessible URLs
- **No Validation**: Some fields accept invalid data
- **Mock Latency**: 200-700ms simulated delay

## 📄 License

This project is proprietary. All rights reserved.

## 👥 Team

Developed for Herbel - Organic Wellness business in Uganda.

## 📞 Support

For questions or issues:
1. Check [ADMIN_DASHBOARD_SUMMARY.md](./ADMIN_DASHBOARD_SUMMARY.md) for feature details
2. Review [DEMO.md](./DEMO.md) for usage instructions
3. Contact the development team

---

**Version**: 1.0  
**Last Updated**: November 2024  
**Status**: Demo/Prototype (Frontend Only)

