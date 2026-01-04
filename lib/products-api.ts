
import type { Product } from "./types";
import { api } from "./api";

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

export async function getProducts(options?: { limit?: number; offset?: number }): Promise<Product[]> {
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", options.limit.toString());
  if (options?.offset) params.append("offset", options.offset.toString());
  const queryString = params.toString();
  const url = queryString ? `products?${queryString}` : "products";
  const response = await api.get<any[]>(url);
  return response.data.map(adaptProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await api.get<any>(`products/${id}`);
    return adaptProduct(response.data);
  } catch {
    return null;
  }
}

export async function createProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> {
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

  const response = await api.post<any>("products", payload);
  return adaptProduct(response.data);
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "createdAt" | "updatedAt" | "category">>
): Promise<Product> {
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

  const response = await api.patch<any>(`products/${id}`, payload);
  return adaptProduct(response.data);
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`products/${id}`);
}

