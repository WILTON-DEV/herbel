// Core types for the Organic Plug application

export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export const branches: Branch[] = [
  {
    id: "kampala",
    name: "Main Branch - Kampala",
    address: "Kampala Road, Kampala",
    phone: "0200 804 020",
  },
  {
    id: "entebbe",
    name: "Entebbe Branch",
    address: "Entebbe Road, Entebbe",
    phone: "0200 804 021",
  },
  {
    id: "ntinda",
    name: "Ntinda Branch",
    address: "Ntinda Shopping Center, Ntinda",
    phone: "0200 804 022",
  },
  {
    id: "chengira",
    name: "Chengira Branch",
    address: "Chengira, Kampala",
    phone: "0200 804 023",
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
  customerEmail?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  branch?: string;
  location?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  source: "website" | "manual"; // From website or manually entered by shop attendant
};

export type InventoryItem = {
  productId: string;
  branch: string;
  quantity: number;
  lastUpdated: Date;
};

export type Expense = {
  id: string;
  branch: string;
  description: string;
  amount: number;
  category: string;
  recordedBy: string;
  date: Date;
  createdAt: Date;
};

export type SalesRecord = {
  id: string;
  orderId: string;
  branch: string;
  amount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  status: "cash-received" | "mobile-money-sent" | "pending";
  date: Date;
  recordedBy: string;
};

