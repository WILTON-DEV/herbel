/**
 * Mock API Layer
 * 
 * Simulates REST-like API endpoints with:
 * - Promise-based async operations
 * - Simulated network latency (200-700ms)
 * - LocalStorage persistence
 * - Seed data initialization
 * - Business logic enforcement
 */

import type {
  Order,
  Product,
  Customer,
  InventoryItem,
  SalesRecord,
  Expense,
  Category,
  User,
  Settings,
  OrderStatus,
  PaymentMethod,
} from "./types";
import { inventory } from "./inventory";
import { branches } from "./types";

const STORAGE_KEYS = {
  ORDERS: "herbel_orders",
  PRODUCTS: "herbel_products",
  CUSTOMERS: "herbel_customers",
  INVENTORY: "herbel_inventory",
  SALES: "herbel_sales",
  EXPENSES: "herbel_expenses",
  CATEGORIES: "herbel_categories",
  USERS: "herbel_users",
  SETTINGS: "herbel_settings",
  INITIALIZED: "herbel_initialized",
};

// Utility: Simulate network delay
const delay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 500 + 200)
  );

// Utility: Parse dates from localStorage
const parseDates = <T>(data: any): T => {
  if (Array.isArray(data)) {
    return data.map((item) => parseDatesInObject(item)) as T;
  }
  return parseDatesInObject(data) as T;
};

const parseDatesInObject = (obj: any): any => {
  if (obj === null || typeof obj !== "object") return obj;
  
  if (obj instanceof Array) {
    return obj.map(parseDatesInObject);
  }
  
  const parsed: any = {};
  for (const key in obj) {
    const value = obj[key];
    if (
      typeof value === "string" &&
      (key.includes("At") || key.includes("Date") || key === "date")
    ) {
      parsed[key] = new Date(value);
    } else if (typeof value === "object") {
      parsed[key] = parseDatesInObject(value);
    } else {
      parsed[key] = value;
    }
  }
  return parsed;
};

// Storage helpers
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? parseDates<T>(JSON.parse(item)) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

// ============================================================
// SEED DATA
// ============================================================

export const seedData = () => {
  // Demo users
  const users: User[] = [
    {
      id: "user_admin",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "user_att_kampala",
      email: "attendant@kampala.example",
      name: "Kampala Attendant",
      role: "attendant",
      branch: "kampala",
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "user_att_ntinda",
      email: "attendant@ntinda.example",
      name: "Ntinda Attendant",
      role: "attendant",
      branch: "ntinda",
      createdAt: new Date("2024-01-01"),
    },
  ];

  // Products (from existing inventory)
  const products: Product[] = inventory.slice(0, 10).map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || `${item.name} - Natural herbal product`,
    category: item.category,
    image: item.image || "/placeholder.svg",
    priceUGX: item.priceUGX,
    priceOptionsUGX: item.priceOptionsUGX,
    sizeOptions: item.sizeOptions,
    stockQuantity: item.stockQuantity || 50,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  }));

  // Customers
  const customers: Customer[] = [
    {
      id: "cust_001",
      name: "John Doe",
      email: "john@example.com",
      phone: "0700 123 456",
      totalOrders: 3,
      totalSpent: 350000,
      joinedDate: new Date("2024-06-15"),
    },
    {
      id: "cust_002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0700 987 654",
      totalOrders: 2,
      totalSpent: 140000,
      joinedDate: new Date("2024-07-22"),
    },
    {
      id: "cust_003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "0700 555 123",
      totalOrders: 1,
      totalSpent: 245000,
      joinedDate: new Date("2024-05-10"),
    },
    {
      id: "cust_004",
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "0700 444 789",
      totalOrders: 4,
      totalSpent: 567890,
      joinedDate: new Date("2024-08-03"),
    },
    {
      id: "cust_005",
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "0700 333 555",
      totalOrders: 2,
      totalSpent: 180000,
      joinedDate: new Date("2024-06-28"),
    },
    {
      id: "cust_006",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "0700 222 111",
      totalOrders: 1,
      totalSpent: 95000,
      joinedDate: new Date("2024-09-12"),
    },
  ];

  // Orders
  const orders: Order[] = [
    {
      id: "ord_001",
      orderNumber: "#ORD-3210",
      customerName: "John Doe",
      customerPhone: "0700 123 456",
      customerEmail: "john@example.com",
      items: [
        {
          productId: products[0].id,
          productName: products[0].name,
          quantity: 2,
          price: 30000,
        },
        {
          productId: products[1].id,
          productName: products[1].name,
          quantity: 1,
          price: 40000,
        },
      ],
      subtotal: 100000,
      deliveryFee: 5000,
      total: 105000,
      deliveryMethod: "delivery",
      location: "Kampala, Nakasero",
      status: "pending",
      paymentMethod: "pending",
      source: "website",
      createdAt: new Date("2024-11-05T10:30:00"),
      updatedAt: new Date("2024-11-05T10:30:00"),
    },
    {
      id: "ord_002",
      orderNumber: "#ORD-3211",
      customerName: "Jane Smith",
      customerPhone: "0700 987 654",
      items: [
        {
          productId: products[2].id,
          productName: products[2].name,
          quantity: 1,
          price: 70000,
        },
      ],
      subtotal: 70000,
      deliveryFee: 0,
      total: 70000,
      deliveryMethod: "pickup",
      branch: "kampala",
      status: "cash-received",
      paymentMethod: "cash",
      notes: "Sin - Cash received at shop",
      source: "manual",
      createdAt: new Date("2024-11-05T09:15:00"),
      updatedAt: new Date("2024-11-05T11:45:00"),
    },
    {
      id: "ord_003",
      orderNumber: "#ORD-3212",
      customerName: "Mike Johnson",
      customerPhone: "0700 555 123",
      items: [
        {
          productId: products[3].id,
          productName: products[3].name,
          quantity: 1,
          price: 120000,
        },
        {
          productId: products[4].id,
          productName: products[4].name,
          quantity: 2,
          price: 60000,
        },
      ],
      subtotal: 240000,
      deliveryFee: 5000,
      total: 245000,
      deliveryMethod: "delivery",
      location: "Entebbe, Airport Road",
      status: "mobile-money-received",
      paymentMethod: "mobile-money",
      notes: "Mum - Money sent to boss via mobile money",
      source: "website",
      createdAt: new Date("2024-11-04T08:00:00"),
      updatedAt: new Date("2024-11-04T10:00:00"),
    },
    {
      id: "ord_004",
      orderNumber: "#ORD-3213",
      customerName: "Sarah Williams",
      customerPhone: "0700 444 789",
      items: [
        {
          productId: products[5].id,
          productName: products[5].name,
          quantity: 3,
          price: 45000,
        },
      ],
      subtotal: 135000,
      deliveryFee: 0,
      total: 135000,
      deliveryMethod: "pickup",
      branch: "ntinda",
      status: "completed",
      paymentMethod: "cash",
      source: "manual",
      createdAt: new Date("2024-11-03T14:00:00"),
      updatedAt: new Date("2024-11-03T16:00:00"),
    },
    {
      id: "ord_005",
      orderNumber: "#ORD-3214",
      customerName: "Tom Brown",
      customerPhone: "0700 333 555",
      items: [
        {
          productId: products[6].id,
          productName: products[6].name,
          quantity: 1,
          price: 90000,
        },
      ],
      subtotal: 90000,
      deliveryFee: 5000,
      total: 95000,
      deliveryMethod: "delivery",
      location: "Chengira, Kampala",
      status: "confirmed",
      paymentMethod: "pending",
      source: "website",
      createdAt: new Date("2024-11-06T09:00:00"),
      updatedAt: new Date("2024-11-06T09:00:00"),
    },
    {
      id: "ord_006",
      orderNumber: "#ORD-3215",
      customerName: "Emily Davis",
      customerPhone: "0700 222 111",
      items: [
        {
          productId: products[7].id,
          productName: products[7].name,
          quantity: 2,
          price: 35000,
        },
      ],
      subtotal: 70000,
      deliveryFee: 0,
      total: 70000,
      deliveryMethod: "pickup",
      branch: "entebbe",
      status: "pending",
      paymentMethod: "pending",
      source: "manual",
      createdAt: new Date("2024-11-06T11:00:00"),
      updatedAt: new Date("2024-11-06T11:00:00"),
    },
    {
      id: "ord_007",
      orderNumber: "#ORD-3216",
      customerName: "John Doe",
      customerPhone: "0700 123 456",
      customerEmail: "john@example.com",
      items: [
        {
          productId: products[8].id,
          productName: products[8].name,
          quantity: 1,
          price: 55000,
        },
      ],
      subtotal: 55000,
      deliveryFee: 5000,
      total: 60000,
      deliveryMethod: "delivery",
      location: "Kampala, Kololo",
      status: "cash-received",
      paymentMethod: "cash",
      source: "website",
      createdAt: new Date("2024-11-02T10:00:00"),
      updatedAt: new Date("2024-11-02T12:00:00"),
    },
    {
      id: "ord_008",
      orderNumber: "#ORD-3217",
      customerName: "Jane Smith",
      customerPhone: "0700 987 654",
      items: [
        {
          productId: products[9].id,
          productName: products[9].name,
          quantity: 2,
          price: 80000,
        },
      ],
      subtotal: 160000,
      deliveryFee: 5000,
      total: 165000,
      deliveryMethod: "delivery",
      location: "Ntinda, Shopping Center",
      status: "mobile-money-received",
      paymentMethod: "mobile-money",
      source: "website",
      createdAt: new Date("2024-11-01T15:00:00"),
      updatedAt: new Date("2024-11-01T17:00:00"),
    },
  ];

  // Inventory (per branch for each product)
  const inventoryItems: InventoryItem[] = products.flatMap((product) =>
    branches.map((branch) => ({
      productId: product.id,
      branch: branch.id,
      quantity: Math.floor(Math.random() * 30) + 10, // 10-40 units per branch
      lastUpdated: new Date(),
    }))
  );

  // Sales Records
  const salesRecords: SalesRecord[] = [
    {
      id: "sale_001",
      orderId: "ord_002",
      branch: "kampala",
      amount: 70000,
      paymentMethod: "cash",
      deliveryMethod: "pickup",
      status: "cash-received",
      date: new Date("2024-11-05"),
      recordedBy: "Kampala Attendant",
    },
    {
      id: "sale_002",
      orderId: "ord_003",
      branch: "entebbe",
      amount: 245000,
      paymentMethod: "mobile-money",
      deliveryMethod: "delivery",
      status: "mobile-money-sent",
      date: new Date("2024-11-04"),
      recordedBy: "Admin User",
    },
    {
      id: "sale_003",
      orderId: "ord_004",
      branch: "ntinda",
      amount: 135000,
      paymentMethod: "cash",
      deliveryMethod: "pickup",
      status: "cash-received",
      date: new Date("2024-11-03"),
      recordedBy: "Ntinda Attendant",
    },
    {
      id: "sale_004",
      orderId: "ord_007",
      branch: "kampala",
      amount: 60000,
      paymentMethod: "cash",
      deliveryMethod: "delivery",
      status: "cash-received",
      date: new Date("2024-11-02"),
      recordedBy: "Kampala Attendant",
    },
    {
      id: "sale_005",
      orderId: "ord_008",
      branch: "ntinda",
      amount: 165000,
      paymentMethod: "mobile-money",
      deliveryMethod: "delivery",
      status: "mobile-money-sent",
      date: new Date("2024-11-01"),
      recordedBy: "Admin User",
    },
  ];

  // Expenses
  const expenses: Expense[] = [
    {
      id: "exp_001",
      branch: "kampala",
      description: "Shop supplies and packaging materials",
      amount: 50000,
      category: "supplies",
      recordedBy: "Kampala Attendant",
      date: new Date("2024-11-05"),
      createdAt: new Date("2024-11-05T12:00:00"),
    },
    {
      id: "exp_002",
      branch: "ntinda",
      description: "Transportation for product delivery",
      amount: 30000,
      category: "transport",
      recordedBy: "Ntinda Attendant",
      date: new Date("2024-11-05"),
      createdAt: new Date("2024-11-05T14:30:00"),
    },
    {
      id: "exp_003",
      branch: "entebbe",
      description: "Electricity bill payment",
      amount: 75000,
      category: "utilities",
      recordedBy: "Admin User",
      date: new Date("2024-11-04"),
      createdAt: new Date("2024-11-04T10:00:00"),
    },
    {
      id: "exp_004",
      branch: "kampala",
      description: "Social media advertising campaign",
      amount: 120000,
      category: "marketing",
      recordedBy: "Admin User",
      date: new Date("2024-11-03"),
      createdAt: new Date("2024-11-03T16:00:00"),
    },
    {
      id: "exp_005",
      branch: "chengira",
      description: "Shop maintenance and repairs",
      amount: 95000,
      category: "maintenance",
      recordedBy: "Admin User",
      date: new Date("2024-11-02"),
      createdAt: new Date("2024-11-02T11:00:00"),
    },
  ];

  // Categories
  const categories: Category[] = [
    {
      id: "cat_hormonal",
      name: "Hormonal Balance",
      description: "Products for hormone regulation and balance",
      productCount: 3,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "cat_immune",
      name: "Immune Support",
      description: "Boost your immune system naturally",
      productCount: 2,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "cat_digestive",
      name: "Digestive Health",
      description: "Support healthy digestion and gut health",
      productCount: 2,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "cat_pain",
      name: "Pain Relief",
      description: "Natural pain management solutions",
      productCount: 1,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "cat_wellness",
      name: "General Wellness",
      description: "Overall health and wellness support",
      productCount: 2,
      createdAt: new Date("2024-01-01"),
    },
  ];

  // Settings
  const settings: Settings = {
    storeName: "Herbel - Organic Wellness",
    storeEmail: "info@herbel.ug",
    storePhone: "0200 804 020",
    storeAddress: "Kampala Road, Kampala, Uganda",
    currency: "UGX",
    taxRate: 0,
    deliveryFee: 5000,
    freeDeliveryThreshold: 100000,
  };

  // Save all to localStorage
  saveToStorage(STORAGE_KEYS.USERS, users);
  saveToStorage(STORAGE_KEYS.PRODUCTS, products);
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
  saveToStorage(STORAGE_KEYS.INVENTORY, inventoryItems);
  saveToStorage(STORAGE_KEYS.SALES, salesRecords);
  saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
  saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  saveToStorage(STORAGE_KEYS.INITIALIZED, true);

  return {
    users,
    products,
    customers,
    orders,
    inventory: inventoryItems,
    sales: salesRecords,
    expenses,
    categories,
    settings,
  };
};

// Initialize data if not already done
export const initializeData = () => {
  const initialized = getFromStorage(STORAGE_KEYS.INITIALIZED, false);
  if (!initialized) {
    return seedData();
  }
  return null;
};

// ============================================================
// AUTH API
// ============================================================

export const authApi = {
  login: async (email: string, password: string): Promise<User | null> => {
    await delay();
    const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    // In demo, any password works for simplicity
    const user = users.find((u) => u.email === email);
    return user || null;
  },

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    try {
      const userStr = sessionStorage.getItem("currentUser");
      return userStr ? parseDates<User>(JSON.parse(userStr)) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User | null) => {
    if (typeof window === "undefined") return;
    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("currentUser");
    }
  },

  logout: () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("currentUser");
  },
};

// ============================================================
// ORDERS API
// ============================================================

export const ordersApi = {
  getOrders: async (filters?: {
    status?: string;
    branch?: string;
    search?: string;
    source?: "website" | "manual";
  }): Promise<Order[]> => {
    await delay();
    let orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);

    if (filters?.status && filters.status !== "all") {
      orders = orders.filter((o) => o.status === filters.status);
    }
    if (filters?.branch && filters.branch !== "all") {
      orders = orders.filter((o) => o.branch === filters.branch);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchLower) ||
          o.customerName.toLowerCase().includes(searchLower) ||
          o.customerPhone.includes(searchLower)
      );
    }
    if (filters?.source) {
      orders = orders.filter((o) => o.source === filters.source);
    }

    return orders.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  getOrder: async (id: string): Promise<Order | null> => {
    await delay();
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    return orders.find((o) => o.id === id) || null;
  },

  createOrder: async (orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">): Promise<Order> => {
    await delay();
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `#ORD-${3210 + orders.length}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    orders.push(newOrder);
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  },

  updateOrder: async (id: string, updates: Partial<Order>, currentUser?: User): Promise<Order> => {
    await delay();
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    const orderIndex = orders.findIndex((o) => o.id === id);
    
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    const oldOrder = orders[orderIndex];
    const updatedOrder = {
      ...oldOrder,
      ...updates,
      updatedAt: new Date(),
    };

    // Business logic: Auto-update status based on payment method
    if (updates.paymentMethod === "cash") {
      updatedOrder.status = "cash-received";
    } else if (updates.paymentMethod === "mobile-money") {
      updatedOrder.status = "mobile-money-received";
    }

    // Check if order is being marked as paid (cash-received or mobile-money-received)
    const wasNotPaid = oldOrder.status !== "cash-received" && oldOrder.status !== "mobile-money-received";
    const isNowPaid = updatedOrder.status === "cash-received" || updatedOrder.status === "mobile-money-received";

    if (wasNotPaid && isNowPaid) {
      // Check inventory availability
      const inventory = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY, []);
      const branch = updatedOrder.branch || currentUser?.branch || "kampala";
      
      for (const item of updatedOrder.items) {
        const inventoryItem = inventory.find(
          (inv) => inv.productId === item.productId && inv.branch === branch
        );
        
        if (!inventoryItem || inventoryItem.quantity < item.quantity) {
          throw new Error(
            `Insufficient inventory for ${item.productName} at ${branch} branch. Available: ${inventoryItem?.quantity || 0}, Required: ${item.quantity}`
          );
        }
      }

      // Deduct inventory
      for (const item of updatedOrder.items) {
        const invIndex = inventory.findIndex(
          (inv) => inv.productId === item.productId && inv.branch === branch
        );
        if (invIndex !== -1) {
          inventory[invIndex].quantity -= item.quantity;
          inventory[invIndex].lastUpdated = new Date();
        }
      }
      saveToStorage(STORAGE_KEYS.INVENTORY, inventory);

      // Create sales record
      const sales = getFromStorage<SalesRecord[]>(STORAGE_KEYS.SALES, []);
      const newSale: SalesRecord = {
        id: `sale_${Date.now()}`,
        orderId: updatedOrder.id,
        branch: branch,
        amount: updatedOrder.total,
        paymentMethod: updatedOrder.paymentMethod,
        deliveryMethod: updatedOrder.deliveryMethod,
        status: updatedOrder.paymentMethod === "cash" ? "cash-received" : "mobile-money-sent",
        date: new Date(),
        recordedBy: currentUser?.name || "System",
      };
      sales.push(newSale);
      saveToStorage(STORAGE_KEYS.SALES, sales);
    }

    orders[orderIndex] = updatedOrder;
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
    return updatedOrder;
  },

  deleteOrder: async (id: string): Promise<void> => {
    await delay();
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    const filtered = orders.filter((o) => o.id !== id);
    saveToStorage(STORAGE_KEYS.ORDERS, filtered);
  },
};

// ============================================================
// PRODUCTS API
// ============================================================

export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    await delay();
    return getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
  },

  getProduct: async (id: string): Promise<Product | null> => {
    await delay();
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    return products.find((p) => p.id === id) || null;
  },

  createProduct: async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> => {
    await delay();
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    products.push(newProduct);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);

    // Initialize inventory for all branches
    const inventory = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY, []);
    branches.forEach((branch) => {
      inventory.push({
        productId: newProduct.id,
        branch: branch.id,
        quantity: 0,
        lastUpdated: new Date(),
      });
    });
    saveToStorage(STORAGE_KEYS.INVENTORY, inventory);

    return newProduct;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    await delay();
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const productIndex = products.findIndex((p) => p.id === id);
    
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    const updatedProduct = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date(),
    };

    products[productIndex] = updatedProduct;
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return updatedProduct;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await delay();
    const products = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    const filtered = products.filter((p) => p.id !== id);
    saveToStorage(STORAGE_KEYS.PRODUCTS, filtered);

    // Also remove from inventory
    const inventory = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY, []);
    const filteredInv = inventory.filter((inv) => inv.productId !== id);
    saveToStorage(STORAGE_KEYS.INVENTORY, filteredInv);
  },
};

// ============================================================
// INVENTORY API
// ============================================================

export const inventoryApi = {
  getInventory: async (branch?: string): Promise<InventoryItem[]> => {
    await delay();
    let inventory = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY, []);
    
    if (branch && branch !== "all") {
      inventory = inventory.filter((inv) => inv.branch === branch);
    }
    
    return inventory;
  },

  updateInventory: async (productId: string, branch: string, quantity: number): Promise<InventoryItem> => {
    await delay();
    const inventory = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY, []);
    const invIndex = inventory.findIndex(
      (inv) => inv.productId === productId && inv.branch === branch
    );

    if (invIndex === -1) {
      throw new Error("Inventory item not found");
    }

    inventory[invIndex].quantity = Math.max(0, quantity);
    inventory[invIndex].lastUpdated = new Date();
    saveToStorage(STORAGE_KEYS.INVENTORY, inventory);
    
    return inventory[invIndex];
  },

  adjustInventory: async (productId: string, branch: string, adjustment: number): Promise<InventoryItem> => {
    await delay();
    const inventory = getFromStorage<InventoryItem[]>(STORAGE_KEYS.INVENTORY, []);
    const invIndex = inventory.findIndex(
      (inv) => inv.productId === productId && inv.branch === branch
    );

    if (invIndex === -1) {
      throw new Error("Inventory item not found");
    }

    inventory[invIndex].quantity = Math.max(0, inventory[invIndex].quantity + adjustment);
    inventory[invIndex].lastUpdated = new Date();
    saveToStorage(STORAGE_KEYS.INVENTORY, inventory);
    
    return inventory[invIndex];
  },
};

// ============================================================
// SALES API
// ============================================================

export const salesApi = {
  getSales: async (filters?: {
    branch?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }): Promise<SalesRecord[]> => {
    await delay();
    let sales = getFromStorage<SalesRecord[]>(STORAGE_KEYS.SALES, []);

    if (filters?.branch && filters.branch !== "all") {
      sales = sales.filter((s) => s.branch === filters.branch);
    }
    if (filters?.dateFrom) {
      sales = sales.filter((s) => s.date >= filters.dateFrom!);
    }
    if (filters?.dateTo) {
      sales = sales.filter((s) => s.date <= filters.dateTo!);
    }

    return sales.sort((a, b) => b.date.getTime() - a.date.getTime());
  },
};

// ============================================================
// EXPENSES API
// ============================================================

export const expensesApi = {
  getExpenses: async (filters?: {
    branch?: string;
    category?: string;
  }): Promise<Expense[]> => {
    await delay();
    let expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, []);

    if (filters?.branch && filters.branch !== "all") {
      expenses = expenses.filter((e) => e.branch === filters.branch);
    }
    if (filters?.category && filters.category !== "all") {
      expenses = expenses.filter((e) => e.category === filters.category);
    }

    return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  createExpense: async (expenseData: Omit<Expense, "id" | "createdAt">): Promise<Expense> => {
    await delay();
    const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, []);
    
    const newExpense: Expense = {
      ...expenseData,
      id: `exp_${Date.now()}`,
      createdAt: new Date(),
    };

    expenses.push(newExpense);
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
    return newExpense;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await delay();
    const expenses = getFromStorage<Expense[]>(STORAGE_KEYS.EXPENSES, []);
    const filtered = expenses.filter((e) => e.id !== id);
    saveToStorage(STORAGE_KEYS.EXPENSES, filtered);
  },
};

// ============================================================
// CUSTOMERS API
// ============================================================

export const customersApi = {
  getCustomers: async (): Promise<Customer[]> => {
    await delay();
    return getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
  },

  getCustomer: async (id: string): Promise<Customer | null> => {
    await delay();
    const customers = getFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
    return customers.find((c) => c.id === id) || null;
  },
};

// ============================================================
// CATEGORIES API
// ============================================================

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    await delay();
    return getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
  },

  createCategory: async (categoryData: Omit<Category, "id" | "createdAt" | "productCount">): Promise<Category> => {
    await delay();
    const categories = getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    
    const newCategory: Category = {
      ...categoryData,
      id: `cat_${Date.now()}`,
      productCount: 0,
      createdAt: new Date(),
    };

    categories.push(newCategory);
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return newCategory;
  },

  updateCategory: async (id: string, updates: Partial<Category>): Promise<Category> => {
    await delay();
    const categories = getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    const catIndex = categories.findIndex((c) => c.id === id);
    
    if (catIndex === -1) {
      throw new Error("Category not found");
    }

    const updatedCategory = {
      ...categories[catIndex],
      ...updates,
    };

    categories[catIndex] = updatedCategory;
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return updatedCategory;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await delay();
    const categories = getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    const filtered = categories.filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.CATEGORIES, filtered);
  },
};

// ============================================================
// USER MANAGEMENT API
// ============================================================

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    await delay();
    return getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
  },

  createUser: async (data: {
    email: string;
    password: string;
    name: string;
    role: "admin" | "attendant";
    branch?: string;
  }): Promise<User> => {
    await delay();
    const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    
    // Check if email already exists
    if (users.find((u) => u.email === data.email)) {
      throw new Error("Email already exists");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      branch: data.branch,
      createdAt: new Date(),
    };

    users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  updateUser: async (
    id: string,
    updates: {
      name?: string;
      role?: "admin" | "attendant";
      branch?: string;
    }
  ): Promise<User> => {
    await delay();
    const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const updatedUser = {
      ...users[userIndex],
      ...updates,
      // Remove branch if changing to admin
      branch: updates.role === "admin" ? undefined : updates.branch || users[userIndex].branch,
    };

    users[userIndex] = updatedUser;
    saveToStorage(STORAGE_KEYS.USERS, users);
    return updatedUser;
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay();
    const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    const filtered = users.filter((u) => u.id !== id);
    
    if (filtered.length === users.length) {
      throw new Error("User not found");
    }

    saveToStorage(STORAGE_KEYS.USERS, filtered);
  },
};

// ============================================================
// SETTINGS API
// ============================================================

export const settingsApi = {
  getSettings: async (): Promise<Settings> => {
    await delay();
    return getFromStorage<Settings>(STORAGE_KEYS.SETTINGS, {
      storeName: "Herbel",
      storeEmail: "info@herbel.ug",
      storePhone: "0200 804 020",
      storeAddress: "Kampala, Uganda",
      currency: "UGX",
      taxRate: 0,
      deliveryFee: 5000,
      freeDeliveryThreshold: 100000,
    });
  },

  updateSettings: async (updates: Partial<Settings>): Promise<Settings> => {
    await delay();
    const currentSettings = getFromStorage<Settings>(STORAGE_KEYS.SETTINGS, {} as Settings);
    const updatedSettings = {
      ...currentSettings,
      ...updates,
    };
    saveToStorage(STORAGE_KEYS.SETTINGS, updatedSettings);
    return updatedSettings;
  },
};

// ============================================================
// RESET API
// ============================================================

export const resetDemoData = () => {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
  return seedData();
};

