
import type { InventoryItem } from "./types";
import { api } from "./api";

export async function getInventory(branchId?: string): Promise<InventoryItem[]> {
  const endpoint = branchId && branchId !== "all" 
    ? `inventory?branchId=${branchId}`
    : "inventory";
  
  const response = await api.get<any[]>(endpoint);
  return response.data.map((item: any) => ({
    id: item.id,
    productId: item.productId,
    branchId: item.branchId || item.branch?.id,
    quantity: Number(item.quantity ?? 0),
    createdAt: new Date(item.createdAt),
    lastUpdated: new Date(item.lastUpdated || item.updatedAt || item.createdAt),
  }));
}

export async function updateInventory(
  productId: string,
  branchId: string,
  quantity: number
): Promise<InventoryItem> {
  const response = await api.post<any>("inventory/set", {
    productId, 
    branchId, 
    quantity: Math.max(0, quantity),
  });

  return {
    id: response.data.id,
    productId: response.data.productId,
    branchId: response.data.branchId,
    quantity: Number(response.data.quantity),
    createdAt: new Date(response.data.createdAt),
    lastUpdated: new Date(response.data.lastUpdated || response.data.updatedAt),
  };
}

export async function adjustInventory(
  productId: string,
  branchId: string,
  adjustment: number
): Promise<InventoryItem> {
  const response = await api.patch<any>("inventory/adjust", {
    productId, 
    branchId, 
    quantity: adjustment, 
  });

  return {
    id: response.data.id,
    productId: response.data.productId,
    branchId: response.data.branchId,
    quantity: Number(response.data.quantity),
    createdAt: new Date(response.data.createdAt),
    lastUpdated: new Date(response.data.lastUpdated || response.data.updatedAt),
  };
}
