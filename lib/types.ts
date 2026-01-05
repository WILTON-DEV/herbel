
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const branchNames = {
  kampala: "Main Branch - Kampala",
  entebbe: "Entebbe Branch",
  ntinda: "Ntinda Branch",
  chengira: "Chengira Branch",
} as const;

export const branches: Branch[] = [
  {
    id: "kampala",
    name: "Main Branch - Kampala",
    address: "Kampala, Uganda",
    phone: "0200 804 020",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "entebbe",
    name: "Entebbe Branch",
    address: "Entebbe, Uganda",
    phone: "0200 804 021",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "ntinda",
    name: "Ntinda Branch",
    address: "Ntinda, Kampala",
    phone: "0200 804 022",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "chengira",
    name: "Chengira Branch",
    address: "Chengira, Uganda",
    phone: "0200 804 023",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export type ProductCategory =
  | "hormonal-balance"
  | "immune-support"
  | "digestive-health"
  | "pain-relief"
  | "cardiovascular"
  | "mental-wellness"
  | "skin-care"
  | "detox-cleanse"
  | "womens-health"
  | "mens-health"
  | "general-wellness";

export const productCategories: {
  id: ProductCategory;
  name: string;
  description: string;
}[] = [
    {
      id: "hormonal-balance",
      name: "Hormonal Balance",
      description: "Products for hormone regulation and balance",
    },
    {
      id: "immune-support",
      name: "Immune Support",
      description: "Boost your immune system naturally",
    },
    {
      id: "digestive-health",
      name: "Digestive Health",
      description: "Support healthy digestion and gut health",
    },
    {
      id: "pain-relief",
      name: "Pain Relief",
      description: "Natural pain management solutions",
    },
    {
      id: "cardiovascular",
      name: "Cardiovascular Health",
      description: "Support heart and blood pressure health",
    },
    {
      id: "mental-wellness",
      name: "Mental Wellness",
      description: "Stress relief and mental clarity",
    },
    {
      id: "skin-care",
      name: "Skin Care",
      description: "Natural beauty and skin care products",
    },
    {
      id: "detox-cleanse",
      name: "Detox & Cleanse",
      description: "Body cleansing and detoxification",
    },
    {
      id: "womens-health",
      name: "Women's Health",
      description: "Specialized products for women's wellness",
    },
    {
      id: "mens-health",
      name: "Men's Health",
      description: "Specialized products for men's wellness",
    },
    {
      id: "general-wellness",
      name: "General Wellness",
      description: "Overall health and wellness support",
    },
  ];

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "cash-received"
  | "mobile-money-received"
  | "completed"
  | "cancelled";

export type DeliveryMethod = "pickup" | "delivery";

export type PaymentMethod = "cash" | "mobile-money" | "pending";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  deliveryMethod: DeliveryMethod;
  branchId: string | null;
  location: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes: string | null;
  source: OrderSource;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  branch?: {
    id: string;
    name: string;
    address: string;
    phone: string;
    isActive: boolean;
  } | null;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type OrderSource = "website" | "manual";

export type InventoryItem = {
  id: string;
  productId: string;
  branchId: string;
  quantity: number;
  createdAt: Date;
  lastUpdated: Date;
};

export type Expense = {
  id: string;
  branchId: string;
  branch?: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  recordedById: string;
  recordedBy?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ExpenseCategory =
  | "SUPPLIES"
  | "TRANSPORT"
  | "UTILITIES"
  | "SALARIES"
  | "MARKETING"
  | "MAINTENANCE"
  | "OTHER";

export type SalesRecord = {
  id: string;
  orderId: string;
  branchId: string;
  branch?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  status: SalesStatus;
  recordedById: string;
  recordedBy?: string;
  date: Date;
  createdAt: Date;
};

export type SalesStatus = "cash-received" | "mobile-money-sent" | "pending";

export type UserRole = "admin" | "attendant" | "customer";

export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  contact: string | null;
  role: UserRole;
  branchId: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: Date;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
  images: string[];
  categoryId: string | null;
  productNumber: string | null;
  priceOptions: number[];
  sizeOptions: string[];
  averageRating: number;
  reviewCount: number;
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
  category?: string | {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
};

export type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
};

export type Settings = {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  taxRate: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
};

