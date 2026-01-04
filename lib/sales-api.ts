
import type { SalesRecord, SalesStatus, PaymentMethod, DeliveryMethod } from "./types";
import { api } from "./api";

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

function mapSalesStatus(status: string): SalesStatus {
  const normalized = status?.toLowerCase();
  if (normalized === "cash-received" || normalized === "mobile-money-sent" || normalized === "pending") {
    return normalized as SalesStatus;
  }
  return "pending";
}

export async function getSales(filters?: {
  branchId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}): Promise<SalesRecord[]> {
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
  
  const response = await api.get<{ data: any[] } | any[]>(endpoint);
  const sales = Array.isArray(response.data) ? response.data : response.data?.data || [];
  
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
}
