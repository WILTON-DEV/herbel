# Herbel Frontend-Backend Integration Guide

This document explains how the Herbel frontend is integrated with the NestJS backend API.

## Overview

The frontend has been wired to connect to the real backend API instead of using mock data. The integration includes:

- **Authentication**: Better-auth integration for user authentication
- **API Client**: Real HTTP client that communicates with the NestJS backend
- **Type Adapters**: Mappers between frontend types and backend DTOs
- **Error Handling**: Proper error handling for API requests

## Architecture

### API Client (`lib/api-client.ts`)

The `api-client.ts` file replaces `mockApi.ts` and provides:

- Real HTTP requests to the backend
- Automatic token management via better-auth
- Type adapters to convert backend responses to frontend types
- Error handling and response parsing

### Authentication (`lib/auth-client.ts`)

The auth client is configured to use better-auth with:

- Base URL from environment variables
- Automatic session management
- Bearer token authentication

### Auth Context (`contexts/AuthContext.tsx`)

Updated to use the real API client:

- Fetches user session from better-auth
- Handles login/logout with real backend
- Manages authentication state

## Setup

### 1. Environment Variables

Create a `.env.local` file in the `herbel/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production, set this to your production API URL.

### 2. Backend Requirements

Ensure your backend API is:

- Running on the port specified in `NEXT_PUBLIC_API_URL`
- CORS configured to allow requests from your frontend
- Database properly set up and migrated

### 3. Switching from Mock to Real API

The codebase has been updated to use `api-client.ts` instead of `mockApi.ts`. To switch back to mock data (for development/testing):

1. Update imports in pages/components from:
   ```typescript
   import { ... } from "@/lib/api-client";
   ```
   to:
   ```typescript
   import { ... } from "@/lib/mockApi";
   ```

2. Update `contexts/AuthContext.tsx` to use `mockApi` instead of `api-client`

## API Endpoints

The frontend communicates with these backend endpoints:

### Authentication
- `POST /api/auth/sign-in/email` - User login
- `GET /api/auth/session` - Get current session
- `POST /api/auth/sign-out` - User logout

### Products
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product (Admin only)
- `PATCH /api/v1/products/:id` - Update product (Admin only)
- `DELETE /api/v1/products/:id` - Delete product (Admin only)

### Orders
- `GET /api/v1/orders` - List orders (with filters)
- `GET /api/v1/orders/:id` - Get order by ID
- `POST /api/v1/orders` - Create order
- `PATCH /api/v1/orders/:id` - Update order
- `DELETE /api/v1/orders/:id` - Delete order (Admin only)

### Inventory
- `GET /api/v1/inventory` - List inventory items
- `GET /api/v1/inventory?branchId=:id` - Filter by branch
- `PATCH /api/v1/inventory/adjust` - Adjust inventory
- `POST /api/v1/inventory/set` - Set inventory quantity

### Sales
- `GET /api/v1/sales` - List sales records
- `GET /api/v1/sales/summary` - Get sales summary
- `GET /api/v1/sales/by-branch/:id` - Sales by branch

### Expenses
- `GET /api/v1/expenses` - List expenses
- `GET /api/v1/expenses/by-branch/:id` - Expenses by branch
- `GET /api/v1/expenses/by-category/:category` - Expenses by category
- `POST /api/v1/expenses` - Create expense
- `DELETE /api/v1/expenses/:id` - Delete expense

### Categories
- `GET /api/v1/categories` - List categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

## Type Mapping

The API client includes type adapters that convert backend types to frontend types:

### Order Status Mapping
- Backend: `PENDING`, `CONFIRMED`, `CASH_RECEIVED`, etc.
- Frontend: `pending`, `confirmed`, `cash-received`, etc.

### Payment Method Mapping
- Backend: `PENDING`, `CASH`, `MOBILE_MONEY`
- Frontend: `pending`, `cash`, `mobile-money`

### User Role Mapping
- Backend: `ADMIN`, `ATTENDANT`, `CUSTOMER`
- Frontend: `admin`, `attendant`

## Authentication Flow

1. User logs in via `authApi.login(email, password)`
2. Better-auth handles the authentication and returns a session
3. Session token is automatically included in subsequent API requests
4. Token is retrieved from better-auth session on each request

## Error Handling

The API client includes error handling:

- Network errors are caught and logged
- API errors (4xx, 5xx) are parsed and thrown as Error objects
- Authentication errors trigger logout

## Development Notes

### Pagination

The backend returns paginated results in the format:
```typescript
{
  data: T[],
  total: number,
  limit: number,
  offset: number,
  hasMore: boolean
}
```

The API client extracts the `data` array for use in the frontend.

### Missing Endpoints

Some features may not have backend endpoints yet:

- **Settings**: Currently uses localStorage as fallback
- **Customers**: Derived from orders (no dedicated endpoint)
- **User Management**: May need to use better-auth admin endpoints

### Testing

To test the integration:

1. Start the backend API: `cd herbel-api && pnpm run start:dev`
2. Start the frontend: `cd herbel && pnpm run dev`
3. Ensure both are running on the correct ports
4. Test authentication and API calls

## Troubleshooting

### CORS Errors

If you see CORS errors, ensure:
- Backend CORS is configured to allow your frontend origin
- `NEXT_PUBLIC_API_URL` matches the backend URL

### Authentication Issues

If authentication fails:
- Check that better-auth is properly configured on the backend
- Verify the `BETTER_AUTH_URL` matches your backend URL
- Check browser console for detailed error messages

### API Errors

If API calls fail:
- Check network tab in browser dev tools
- Verify backend is running and accessible
- Check backend logs for errors
- Ensure authentication token is being sent

## Next Steps

1. **Complete Type Mapping**: Ensure all backend types are properly mapped
2. **Add Error Boundaries**: Implement React error boundaries for better error handling
3. **Add Loading States**: Improve loading indicators during API calls
4. **Add Retry Logic**: Implement retry logic for failed requests
5. **Add Request Caching**: Consider caching frequently accessed data
6. **Add Offline Support**: Consider adding offline support with service workers

