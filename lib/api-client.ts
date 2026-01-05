
import { authClient } from "./auth-client";
import type {
  Order,
  OrderItem,
  OrderSource,
  Product,
  Customer,
  InventoryItem,
  SalesRecord,
  SalesStatus,
  Expense,
  ExpenseCategory,
  Category,
  User,
  Settings,
  OrderStatus,
  PaymentMethod,
  DeliveryMethod,
  Review,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://herbel-api.onrender.com";
const API_VERSION = "v1";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("herbel_token");
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (typeof window === "undefined") {
    throw new Error("apiRequest can only be called on the client side");
  }

  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}/api/${API_VERSION}/${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to the API server");
    }
    throw error;
  }
}

function adaptProduct(backendProduct: any): Product {
  return {
    id: backendProduct.id,
    name: backendProduct.name,
    description: backendProduct.description ?? null,
    price: Number(backendProduct.price),
    stock: Number(backendProduct.stock ?? 0),
    image: backendProduct.image ?? null,
    images: backendProduct.images ?? [],
    categoryId: backendProduct.categoryId ?? backendProduct.category?.id ?? null,
    productNumber: backendProduct.productNumber ?? null,
    priceOptions: backendProduct.priceOptions ?? [],
    sizeOptions: backendProduct.sizeOptions ?? [],
    averageRating: Number(backendProduct.averageRating ?? 0),
    reviewCount: Number(backendProduct.reviewCount ?? 0),
    benefits: backendProduct.benefits ?? [],
    createdAt: new Date(backendProduct.createdAt),
    updatedAt: new Date(backendProduct.updatedAt),
    category: backendProduct.category
      ? {
        id: backendProduct.category.id,
        name: backendProduct.category.name,
        slug: backendProduct.category.slug,
        description: backendProduct.category.description ?? null,
      }
      : undefined,
  };
}

function adaptOrder(backendOrder: any): Order {
  return {
    id: backendOrder.id,
    orderNumber: backendOrder.orderNumber || `#ORD-${backendOrder.id.slice(0, 8)}`,
    customerName: backendOrder.customerName,
    customerPhone: backendOrder.customerPhone,
    customerEmail: backendOrder.customerEmail ?? null,
    deliveryMethod: mapDeliveryMethod(backendOrder.deliveryMethod),
    branchId: backendOrder.branchId ?? backendOrder.branch?.id ?? null,
    location: backendOrder.location ?? null,
    status: mapOrderStatus(backendOrder.status),
    paymentMethod: mapPaymentMethod(backendOrder.paymentMethod),
    subtotal: Number(backendOrder.subtotal),
    deliveryFee: Number(backendOrder.deliveryFee ?? 0),
    total: Number(backendOrder.total),
    notes: backendOrder.notes ?? null,
    source: mapOrderSource(backendOrder.source),
    createdById: backendOrder.createdById ?? backendOrder.createdBy?.id ?? null,
    createdAt: new Date(backendOrder.createdAt),
    updatedAt: new Date(backendOrder.updatedAt),
    branch: backendOrder.branch
      ? {
        id: backendOrder.branch.id,
        name: backendOrder.branch.name,
        address: backendOrder.branch.address,
        phone: backendOrder.branch.phone,
        isActive: backendOrder.branch.isActive,
      }
      : null,
    items: backendOrder.items?.map((item: any) => ({
      id: item.id,
      orderId: item.orderId || backendOrder.id,
      productId: item.productId,
      productName: item.productName,
      quantity: Number(item.quantity),
      price: Number(item.price),
    })) || [],
  };
}

function mapOrderStatus(status: string): OrderStatus {
  const normalized = status?.toLowerCase();
  const validStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "cash-received",
    "mobile-money-received",
    "completed",
    "cancelled",
  ];
  if (validStatuses.includes(normalized as OrderStatus)) {
    return normalized as OrderStatus;
  }
  return "pending";
}

function mapSalesStatus(status: string): SalesStatus {
  const normalized = status?.toLowerCase();
  if (normalized === "cash-received" || normalized === "mobile-money-sent" || normalized === "pending") {
    return normalized as SalesStatus;
  }
  return "pending";
}

function mapPaymentMethod(method: string): PaymentMethod {
  const normalized = method?.toLowerCase();
  if (normalized === "cash" || normalized === "mobile-money" || normalized === "pending") {
    return normalized as PaymentMethod;
  }
  return "pending";
}

function mapDeliveryMethod(method: string): DeliveryMethod {
  const normalized = method?.toLowerCase();
  if (normalized === "pickup" || normalized === "delivery") {
    return normalized as DeliveryMethod;
  }
  return "pickup";
}

function mapOrderSource(source: string): OrderSource {
  const normalized = source?.toLowerCase();
  if (normalized === "website" || normalized === "manual") {
    return normalized as OrderSource;
  }
  return "website";
}

export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    try {
      // Better-auth signIn.email returns a response with data or error
      const response = await authClient.signIn.email({
        email,
        password,
      }) as any;

      // Check for error in response
      if (response?.error) {
        const errorObj = response.error;
        const errorMessage = errorObj?.message ||
          (typeof response.error === 'string' ? response.error : "Invalid email or password");
        return { user: null, error: errorMessage };
      }

      // After successful sign in, get the session to retrieve user and token
      // Better-auth handles session management, so we get it from getSession
      const session = await authClient.getSession();

      if (!session?.data?.user) {
        return { user: null, error: "Failed to get user session after login" };
      }

      // Extract token from session if available
      let token: string | null = null;
      if (session.data.session?.token) {
        token = session.data.session.token;
      } else if ((session as any).data?.token) {
        token = (session as any).data.token;
      } else if (response?.data?.token) {
        token = response.data.token;
      }

      if (token) {
        localStorage.setItem("herbel_token", token);
      }



      const user = session.data.user as any;
      const mappedUser: User = {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? user.phoneNumber ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };

      return { user: mappedUser, error: null };
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || error?.toString() || "An unexpected error occurred during login";
      return { user: null, error: errorMessage };
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = getAuthToken();
      if (!token) {
        return null;
      }

      const session = await authClient.getSession();
      if (!session?.data?.user) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("herbel_token");
        }
        return null;
      }

      if ((session as any).data?.token && (session as any).data.token !== token) {
        localStorage.setItem("herbel_token", (session as any).data.token);
      }

      const user = session.data.user as any;
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? user.phoneNumber ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };
    } catch {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("herbel_token");
      }
      await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("herbel_token");
      }
    }
  },

  signUp: async (email: string, password: string, name: string): Promise<User> => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (response.error) {
        throw new Error(response.error.message || "Sign up failed");
      }

      if (response.data?.token) {
        localStorage.setItem("herbel_token", response.data.token);
      } else if ((response as any).token) {
        localStorage.setItem("herbel_token", (response as any).token);
      }

      const session = await authClient.getSession();
      if (!session?.data?.user) {
        throw new Error("Failed to get user session");
      }

      const user = session.data.user as any;
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? user.phoneNumber ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };
    } catch (error: any) {
      console.error("Sign up failed:", error);
      throw error;
    }
  },

  verifyEmail: async (token: string): Promise<void> => {
    try {
      const response = await authClient.verifyEmail({
        query: { token },
      });

      if (response.error) {
        throw new Error(response.error.message || "Email verification failed");
      }
    } catch (error: any) {
      console.error("Email verification failed:", error);
      throw error;
    }
  },

  resendVerificationEmail: async (email: string): Promise<void> => {
    try {
      const response = await authClient.sendVerificationEmail({
        email,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to resend verification email");
      }
    } catch (error: any) {
      console.error("Resend verification email failed:", error);
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      const response = await authClient.requestPasswordReset({
        email,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to send password reset email");
      }
    } catch (error: any) {
      console.error("Forgot password failed:", error);
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      const response = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (response.error) {
        throw new Error(response.error.message || "Password reset failed");
      }
    } catch (error: any) {
      console.error("Reset password failed:", error);
      throw error;
    }
  },
};

function mapUserRole(role: string): "admin" | "attendant" | "customer" {
  const normalizedRole = role?.toUpperCase();
  if (normalizedRole === "ADMIN") return "admin";
  if (normalizedRole === "ATTENDANT") return "attendant";
  if (normalizedRole === "CUSTOMER") return "customer";
  console.warn(`Unknown role: ${role}, defaulting to customer`);
  return "customer";
}

function mapRoleToBackend(role: "admin" | "attendant" | "customer"): string {
  const roleMap: Record<string, string> = {
    admin: "ADMIN",
    attendant: "ATTENDANT",
    customer: "CUSTOMER",
  };
  return roleMap[role] || "CUSTOMER";
}

export const productsApi = {
  getProducts: async (options?: { limit?: number; offset?: number }): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.offset) params.append("offset", options.offset.toString());
    const queryString = params.toString();
    const url = queryString ? `products?${queryString}` : "products";
    const response = await apiRequest<any[]>(url);
    return response.map(adaptProduct);
  },

  getProduct: async (id: string): Promise<Product | null> => {
    try {
      const product = await apiRequest<any>(`products/${id}`);
      return adaptProduct(product);
    } catch {
      return null;
    }
  },

  createProduct: async (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product> => {
    const payload: any = {
      name: productData.name,
      description: productData.description ?? null,
      price: productData.price,
      stock: productData.stock,
    };

    if (productData.image) {
      payload.image = productData.image;
      payload.images = [productData.image];
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (productData.category) {
      if (typeof productData.category === 'string' && uuidRegex.test(productData.category)) {
        payload.categoryId = productData.category;
      } else if (typeof productData.category === 'object' && productData.category.id) {
        payload.categoryId = productData.category.id;
      }
    }

    const product = await apiRequest<any>("products", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return adaptProduct(product);
  },

  updateProduct: async (
    id: string,
    updates: Partial<Omit<Product, "id" | "createdAt" | "updatedAt" | "category">>
  ): Promise<Product> => {
    const payload: any = {};

    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.description !== undefined) payload.description = updates.description ?? null;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.stock !== undefined) payload.stock = updates.stock;

    if (updates.image !== undefined || updates.images !== undefined) {
      if (updates.image) {
        payload.image = updates.image;
        payload.images = updates.images && updates.images.length > 0
          ? updates.images
          : [updates.image];
      } else if (updates.images) {
        payload.images = updates.images;
        payload.image = updates.images[0] ?? null;
      } else {
        payload.image = null;
        payload.images = [];
      }
    }

    if (updates.categoryId !== undefined) {
      if (updates.categoryId) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        payload.categoryId = uuidRegex.test(updates.categoryId) ? updates.categoryId : null;
      } else {
        payload.categoryId = null;
      }
    }

    const product = await apiRequest<any>(`products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return adaptProduct(product);
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiRequest(`products/${id}`, {
      method: "DELETE",
    });
  },
};

export const ordersApi = {
  getOrders: async (filters?: {
    status?: OrderStatus;
    branchId?: string;
    search?: string;
    source?: OrderSource;
  }): Promise<Order[]> => {
    const params = new URLSearchParams();
    if (filters?.status) {
      params.append("status", filters.status);
    }
    if (filters?.branchId && filters.branchId !== "all") {
      params.append("branchId", filters.branchId);
    }
    if (filters?.source) {
      params.append("source", filters.source);
    }

    const query = params.toString();
    const endpoint = query ? `orders?${query}` : "orders";

    const response = await apiRequest<{ data: any[]; total?: number }>(endpoint);
    const orders = Array.isArray(response) ? response : response.data || [];

    let filtered = orders.map(adaptOrder);

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchLower) ||
          o.customerName.toLowerCase().includes(searchLower) ||
          o.customerPhone.includes(searchLower)
      );
    }

    return filtered;
  },

  getOrder: async (id: string): Promise<Order | null> => {
    try {
      const order = await apiRequest<any>(`orders/${id}`);
      return adaptOrder(order);
    } catch {
      return null;
    }
  },

  createOrder: async (
    orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt" | "items" | "status"> & {
      items: Omit<OrderItem, "id" | "orderId">[];
    }
  ): Promise<Order> => {
    const payload = {
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      deliveryMethod: orderData.deliveryMethod.toUpperCase(),
      branchId: orderData.branchId ?? null,
      location: orderData.location,
      items: orderData.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      total: orderData.total,
      source: orderData.source === "website" ? "WEBSITE" : "MANUAL",
      paymentMethod: orderData.paymentMethod.toUpperCase().replace("-", "_"),
      notes: orderData.notes,
    };

    const order = await apiRequest<any>("orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return adaptOrder(order);
  },

  updateOrder: async (
    id: string,
    updates: Partial<Omit<Order, "id" | "orderNumber" | "items" | "createdAt" | "updatedAt" | "createdById">>,
    currentUser?: User
  ): Promise<Order> => {
    const payload: any = {};

    if (updates.status !== undefined) {
      payload.status = updates.status;
    }
    if (updates.paymentMethod !== undefined) {
      payload.paymentMethod = updates.paymentMethod;
    }
    if (updates.deliveryMethod !== undefined) {
      payload.deliveryMethod = updates.deliveryMethod;
    }
    if (updates.branchId !== undefined) {
      payload.branchId = updates.branchId ?? null;
    }
    if (updates.location !== undefined) {
      payload.location = updates.location ?? null;
    }
    if (updates.notes !== undefined) {
      payload.notes = updates.notes ?? null;
    }
    if (updates.customerName !== undefined) {
      payload.customerName = updates.customerName;
    }
    if (updates.customerPhone !== undefined) {
      payload.customerPhone = updates.customerPhone;
    }
    if (updates.customerEmail !== undefined) {
      payload.customerEmail = updates.customerEmail ?? null;
    }

    const order = await apiRequest<any>(`orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    return adaptOrder(order);
  },

  deleteOrder: async (id: string): Promise<void> => {
    await apiRequest(`orders/${id}`, {
      method: "DELETE",
    });
  },
};

export const inventoryApi = {
  getInventory: async (branchId?: string): Promise<InventoryItem[]> => {
    const endpoint = branchId && branchId !== "all"
      ? `inventory?branchId=${branchId}`
      : "inventory";

    const response = await apiRequest<any[]>(endpoint);
    return response.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      branchId: item.branchId || item.branch?.id,
      quantity: Number(item.quantity ?? 0),
      createdAt: new Date(item.createdAt),
      lastUpdated: new Date(item.lastUpdated || item.updatedAt || item.createdAt),
    }));
  },

  updateInventory: async (
    productId: string,
    branchId: string,
    quantity: number
  ): Promise<InventoryItem> => {
    const response = await apiRequest<any>("inventory/set", {
      method: "POST",
      body: JSON.stringify({
        productId,
        branchId,
        quantity: Math.max(0, quantity),
      }),
    });

    return {
      id: response.id,
      productId: response.productId,
      branchId: response.branchId,
      quantity: Number(response.quantity),
      createdAt: new Date(response.createdAt),
      lastUpdated: new Date(response.lastUpdated || response.updatedAt),
    };
  },

  adjustInventory: async (
    productId: string,
    branchId: string,
    adjustment: number
  ): Promise<InventoryItem> => {
    const response = await apiRequest<any>("inventory/adjust", {
      method: "PATCH",
      body: JSON.stringify({
        productId,
        branchId,
        quantity: adjustment,
      }),
    });

    return {
      id: response.id,
      productId: response.productId,
      branchId: response.branchId,
      quantity: Number(response.quantity),
      createdAt: new Date(response.createdAt),
      lastUpdated: new Date(response.lastUpdated || response.updatedAt),
    };
  },
};

export const salesApi = {
  getSales: async (filters?: {
    branchId?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<SalesRecord[]> => {
    let endpoint = "sales";

    if (filters?.dateFrom || filters?.dateTo) {
      const params = new URLSearchParams();
      if (filters?.dateFrom) {
        params.append("startDate", filters.dateFrom.toISOString());
      }
      if (filters?.dateTo) {
        params.append("endDate", filters.dateTo.toISOString());
      }
      if (filters?.branchId && filters.branchId !== "all") {
        params.append("branchId", filters.branchId);
      }
      endpoint = `sales/summary?${params.toString()}`;
    } else if (filters?.branchId && filters.branchId !== "all") {
      endpoint = `sales/by-branch/${filters.branchId}`;
    }

    const response = await apiRequest<{ data: any[] }>(endpoint);
    const sales = Array.isArray(response) ? response : response.data || [];

    return sales.map((sale: any) => ({
      id: sale.id,
      orderId: sale.orderId,
      branchId: sale.branchId || sale.branch?.id,
      amount: Number(sale.amount),
      paymentMethod: mapPaymentMethod(sale.paymentMethod),
      deliveryMethod: mapDeliveryMethod(sale.deliveryMethod),
      status: mapSalesStatus(sale.status),
      recordedById: sale.recordedById || sale.recordedBy?.id || sale.recordedBy,
      date: new Date(sale.date || sale.createdAt),
      createdAt: new Date(sale.createdAt),
    }));
  },
};

export const expensesApi = {
  getExpenses: async (filters?: {
    branch?: string;
    category?: string;
  }): Promise<Expense[]> => {
    let endpoint = "expenses";

    if (filters?.branch && filters.branch !== "all") {
      endpoint = `expenses/by-branch/${filters.branch}`;
    } else if (filters?.category && filters.category !== "all") {
      endpoint = `expenses/by-category/${filters.category}`;
    }

    const response = await apiRequest<{ data: any[] }>(endpoint);
    const expenses = Array.isArray(response) ? response : response.data || [];

    return expenses.map((expense: any) => ({
      id: expense.id,
      branchId: expense.branchId || expense.branch?.id,
      category: expense.category.toUpperCase() as ExpenseCategory,
      description: expense.description,
      amount: Number(expense.amount),
      recordedById: expense.recordedById || expense.recordedBy?.id,
      date: new Date(expense.date),
      createdAt: new Date(expense.createdAt),
      updatedAt: new Date(expense.updatedAt),
    }));
  },

  createExpense: async (
    expenseData: Omit<Expense, "id" | "createdAt">
  ): Promise<Expense> => {
    const payload = {
      branchId: expenseData.branchId,
      description: expenseData.description,
      amount: expenseData.amount,
      category: expenseData.category,
      date: expenseData.date.toISOString(),
    };

    const expense = await apiRequest<any>("expenses", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      id: expense.id,
      branchId: expense.branchId || expense.branch?.id,
      category: expense.category.toUpperCase() as ExpenseCategory,
      description: expense.description,
      amount: Number(expense.amount),
      recordedById: expense.recordedById || expense.recordedBy?.id,
      date: new Date(expense.date),
      createdAt: new Date(expense.createdAt),
      updatedAt: new Date(expense.updatedAt),
    };
  },

  deleteExpense: async (id: string): Promise<void> => {
    await apiRequest(`expenses/${id}`, {
      method: "DELETE",
    });
  },
};

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiRequest<any[]>("categories");
    return response.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description ?? null,
      parentId: cat.parentId ?? null,
      createdAt: new Date(cat.createdAt),
      updatedAt: new Date(cat.updatedAt),
      productCount: cat.products?.length || 0,
    }));
  },

  createCategory: async (
    categoryData: Omit<Category, "id" | "createdAt" | "productCount">
  ): Promise<Category> => {
    const payload = {
      name: categoryData.name,
      description: categoryData.description,
    };

    const category = await apiRequest<any>("categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? null,
      parentId: category.parentId ?? null,
      createdAt: new Date(category.createdAt),
      updatedAt: new Date(category.updatedAt),
      productCount: 0,
    };
  },

  updateCategory: async (
    id: string,
    updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt" | "productCount" | "slug" | "parentId">>
  ): Promise<Category> => {
    const payload: any = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.description !== undefined) payload.description = updates.description ?? null;

    const category = await apiRequest<any>(`categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? null,
      parentId: category.parentId ?? null,
      createdAt: new Date(category.createdAt),
      updatedAt: new Date(category.updatedAt),
      productCount: category.products?.length || 0,
    };
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiRequest(`categories/${id}`, {
      method: "DELETE",
    });
  },
};

export const customersApi = {
  getCustomers: async (): Promise<Customer[]> => {
    const orders = await ordersApi.getOrders();
    const customerMap = new Map<string, Customer>();

    orders.forEach((order) => {
      const key = order.customerEmail || order.customerPhone;
      if (!customerMap.has(key)) {
        customerMap.set(key, {
          id: `cust_${order.customerPhone}`,
          name: order.customerName,
          email: order.customerEmail || "",
          phone: order.customerPhone,
          totalOrders: 0,
          totalSpent: 0,
          joinedDate: order.createdAt,
        });
      }

      const customer = customerMap.get(key)!;
      customer.totalOrders += 1;
      customer.totalSpent += order.total;
    });

    return Array.from(customerMap.values());
  },

  getCustomer: async (id: string): Promise<Customer | null> => {
    const customers = await customersApi.getCustomers();
    return customers.find((c) => c.id === id) || null;
  },
};

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await (authClient as any).admin.listUsers();

      if (response.error) {
        throw new Error(response.error.message || "Failed to fetch users");
      }

      const users = response.data || [];
      return users.map((user: any) => ({
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      }));
    } catch (error: any) {
      console.error("Failed to get users:", error);
      try {
        const response = await apiRequest<any[]>("users");
        return response.map((user: any) => ({
          id: user.id,
          email: user.email,
          name: user.name || "",
          role: mapUserRole(user.role),
          branchId: user.branchId ?? null,
          banned: user.banned ?? null,
          banReason: user.banReason ?? null,
          banExpires: user.banExpires ? new Date(user.banExpires) : null,
          emailVerified: user.emailVerified ?? false,
          image: user.image ?? null,
          contact: user.contact ?? null,
          updatedAt: new Date(user.updatedAt || user.createdAt),
          createdAt: new Date(user.createdAt),
        }));
      } catch {
        throw error;
      }
    }
  },

  createUser: async (data: {
    email: string;
    password: string;
    name: string;
    role: "admin" | "attendant" | "customer";
    branchId?: string | null;
  }): Promise<User> => {
    try {
      const response = await (authClient as any).admin.createUser({
        email: data.email,
        password: data.password,
        name: data.name,
        role: mapRoleToBackend(data.role),
        branchId: data.branchId ?? null,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to create user");
      }

      const user = response.data;
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };
    } catch (error: any) {
      console.error("Failed to create user:", error);
      try {
        const payload = {
          email: data.email,
          password: data.password,
          name: data.name,
          role: mapRoleToBackend(data.role),
          branchId: data.branchId ?? null,
        };

        const user = await apiRequest<any>("users", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email,
          emailVerified: user.emailVerified ?? false,
          image: user.image ?? null,
          contact: user.contact ?? null,
          role: mapUserRole(user.role),
          branchId: user.branchId ?? null,
          banned: user.banned ?? null,
          banReason: user.banReason ?? null,
          banExpires: user.banExpires ? new Date(user.banExpires) : null,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt || user.createdAt),
        };
      } catch {
        throw error;
      }
    }
  },

  updateUser: async (
    id: string,
    updates: {
      name?: string;
      role?: "admin" | "attendant" | "customer";
      branchId?: string | null;
    }
  ): Promise<User> => {
    try {
      const payload: any = {};
      if (updates.name) payload.name = updates.name;
      if (updates.role) payload.role = mapRoleToBackend(updates.role);
      if (updates.branchId !== undefined) payload.branchId = updates.branchId ?? null;

      const response = await (authClient as any).admin.updateUser(id, payload);

      if (response.error) {
        throw new Error(response.error.message || "Failed to update user");
      }

      const user = response.data;
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? false,
        image: user.image ?? null,
        contact: user.contact ?? null,
        role: mapUserRole(user.role || "CUSTOMER"),
        branchId: user.branchId ?? null,
        banned: user.banned ?? null,
        banReason: user.banReason ?? null,
        banExpires: user.banExpires ? new Date(user.banExpires) : null,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt || user.createdAt),
      };
    } catch (error: any) {
      console.error("Failed to update user:", error);
      try {
        const payload: any = {};
        if (updates.name) payload.name = updates.name;
        if (updates.role) payload.role = updates.role.toUpperCase();
        if (updates.branchId !== undefined) payload.branchId = updates.branchId ?? null;

        const user = await apiRequest<any>(`users/${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name || "",
          role: mapUserRole(user.role),
          branchId: user.branchId ?? null,
          banned: user.banned ?? null,
          banReason: user.banReason ?? null,
          banExpires: user.banExpires ? new Date(user.banExpires) : null,
          emailVerified: user.emailVerified ?? false,
          image: user.image ?? null,
          contact: user.contact ?? null,
          updatedAt: new Date(user.updatedAt || user.createdAt),
          createdAt: new Date(user.createdAt),
        };
      } catch {
        throw error;
      }
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      const response = await (authClient as any).admin.deleteUser(id);

      if (response.error) {
        throw new Error(response.error.message || "Failed to delete user");
      }
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      await apiRequest(`users/${id}`, {
        method: "DELETE",
      });
    }
  },
};

export const reviewsApi = {
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await apiRequest<any[]>(`reviews/product/${productId}`);
    return response.map((review) => ({
      id: review.id,
      productId: review.productId,
      userId: review.userId,
      rating: Number(review.rating),
      comment: review.comment ?? null,
      createdAt: new Date(review.createdAt),
      updatedAt: new Date(review.updatedAt),
      user: review.user
        ? {
          id: review.user.id,
          name: review.user.name ?? null,
          email: review.user.email,
          image: review.user.image ?? null,
        }
        : undefined,
    }));
  },

  createReview: async (data: {
    productId: string;
    rating: number;
    comment?: string;
  }): Promise<Review> => {
    const response = await apiRequest<any>("reviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return {
      id: response.id,
      productId: response.productId,
      userId: response.userId,
      rating: Number(response.rating),
      comment: response.comment ?? null,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
      user: response.user
        ? {
          id: response.user.id,
          name: response.user.name ?? null,
          email: response.user.email,
          image: response.user.image ?? null,
        }
        : undefined,
    };
  },

  updateReview: async (
    id: string,
    data: { rating?: number; comment?: string }
  ): Promise<Review> => {
    const response = await apiRequest<any>(`reviews/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return {
      id: response.id,
      productId: response.productId,
      userId: response.userId,
      rating: Number(response.rating),
      comment: response.comment ?? null,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
      user: response.user
        ? {
          id: response.user.id,
          name: response.user.name ?? null,
          email: response.user.email,
          image: response.user.image ?? null,
        }
        : undefined,
    };
  },

  deleteReview: async (id: string): Promise<void> => {
    await apiRequest(`reviews/${id}`, {
      method: "DELETE",
    });
  },
};

export const cartApi = {
  getCart: async (): Promise<any> => {
    return apiRequest<any>("cart");
  },
  addItem: async (productId: string, quantity: number, price: number): Promise<any> => {
    return apiRequest<any>("cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity, price }),
    });
  },
  updateItem: async (productId: string, quantity: number): Promise<any> => {
    return apiRequest<any>("cart/update", {
      method: "PATCH",
      body: JSON.stringify({ productId, quantity }),
    });
  },
  removeItem: async (productId: string): Promise<void> => {
    await apiRequest(`cart/remove/${productId}`, {
      method: "DELETE",
    });
  },
  clearCart: async (): Promise<void> => {
    await apiRequest("cart/clear", {
      method: "DELETE",
    });
  },
};

export const notificationsApi = {
  getNotifications: async (options: { limit?: number; offset?: number } = {}): Promise<any> => {
    const params = new URLSearchParams();
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.offset) params.append("offset", options.offset.toString());
    const query = params.toString();
    return apiRequest<any>(query ? `notifications?${query}` : "notifications");
  },
  getUnreadCount: async (): Promise<{ count: number }> => {
    return apiRequest<{ count: number }>("notifications/unread-count");
  },
  markAsRead: async (id: string): Promise<void> => {
    await apiRequest(`notifications/${id}/read`, {
      method: "PATCH",
    });
  },
  markAllAsRead: async (): Promise<void> => {
    await apiRequest("notifications/read-all", {
      method: "PATCH",
    });
  },
};

export const settingsApi = {
  getSettings: async (): Promise<Settings> => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("herbel_settings");
      if (stored) {
        return JSON.parse(stored);
      }
    }

    return {
      storeName: "Herbel",
      storeEmail: "info@herbel.ug",
      storePhone: "0200 804 020",
      storeAddress: "Kampala, Uganda",
      currency: "UGX",
      taxRate: 0,
      deliveryFee: 5000,
      freeDeliveryThreshold: 100000,
    };
  },

  updateSettings: async (updates: Partial<Settings>): Promise<Settings> => {
    const current = await settingsApi.getSettings();
    const updated = { ...current, ...updates };

    if (typeof window !== "undefined") {
      localStorage.setItem("herbel_settings", JSON.stringify(updated));
    }

    return updated;
  },
};

export const initializeData = () => {
  console.log("Using real API - no local data initialization needed");
};

export const resetDemoData = () => {
  console.warn("resetDemoData is not available with real API");
};

