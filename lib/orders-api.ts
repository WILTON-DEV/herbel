
import type { Order, OrderItem, OrderStatus, OrderSource, PaymentMethod, DeliveryMethod } from "./types";
import { api } from "./api";

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

export async function getOrders(filters?: {
  status?: OrderStatus;
  branchId?: string;
  search?: string;
  source?: OrderSource;
}): Promise<Order[]> {
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
  
  const response = await api.get<{ data: any[]; total?: number } | any[]>(endpoint);
  const orders = Array.isArray(response.data) ? response.data : response.data?.data || [];
  
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
}

export async function getOrder(id: string): Promise<Order | null> {
  try {
    const response = await api.get<any>(`orders/${id}`);
    return adaptOrder(response.data);
  } catch {
    return null;
  }
}

export async function createOrder(
  orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt" | "items" | "status"> & {
    items: Omit<OrderItem, "id" | "orderId">[];
  }
): Promise<Order> {
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

  const response = await api.post<any>("orders", payload);
  return adaptOrder(response.data);
}

export async function updateOrder(
  id: string,
  updates: Partial<Omit<Order, "id" | "orderNumber" | "items" | "createdAt" | "updatedAt" | "createdById">>
): Promise<Order> {
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

  const response = await api.patch<any>(`orders/${id}`, payload);
  return adaptOrder(response.data);
}

export async function deleteOrder(id: string): Promise<void> {
  await api.delete(`orders/${id}`);
}

