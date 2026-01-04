
import type { Category } from "./types";
import { api } from "./api";

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<any[]>("categories");
  return response.data.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description ?? null,
    parentId: cat.parentId ?? null,
    createdAt: new Date(cat.createdAt),
    updatedAt: new Date(cat.updatedAt),
    productCount: cat.products?.length || 0,
  }));
}

export async function createCategory(
  categoryData: Omit<Category, "id" | "createdAt" | "productCount">
): Promise<Category> {
  const payload = {
    name: categoryData.name,
    description: categoryData.description,
  };

  const response = await api.post<any>("categories", payload);

  return {
    id: response.data.id,
    name: response.data.name,
    slug: response.data.slug,
    description: response.data.description ?? null,
    parentId: response.data.parentId ?? null,
    createdAt: new Date(response.data.createdAt),
    updatedAt: new Date(response.data.updatedAt),
    productCount: 0,
  };
}

export async function updateCategory(
  id: string,
  updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt" | "productCount" | "slug" | "parentId">>
): Promise<Category> {
  const payload: any = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.description !== undefined) payload.description = updates.description ?? null;

  const response = await api.put<any>(`categories/${id}`, payload);

  return {
    id: response.data.id,
    name: response.data.name,
    slug: response.data.slug,
    description: response.data.description ?? null,
    parentId: response.data.parentId ?? null,
    createdAt: new Date(response.data.createdAt),
    updatedAt: new Date(response.data.updatedAt),
    productCount: response.data.products?.length || 0,
  };
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`categories/${id}`);
}
