
import type { Review } from "./types";
import { api } from "./api";

export async function getProductReviews(productId: string): Promise<Review[]> {
  const response = await api.get<any[]>(`reviews/product/${productId}`);
  return response.data.map((review) => ({
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
}

export async function createReview(data: {
  productId: string;
  rating: number;
  comment?: string;
}): Promise<Review> {
  const response = await api.post<any>("reviews", data);
  return {
    id: response.data.id,
    productId: response.data.productId,
    userId: response.data.userId,
    rating: Number(response.data.rating),
    comment: response.data.comment ?? null,
    createdAt: new Date(response.data.createdAt),
    updatedAt: new Date(response.data.updatedAt),
    user: response.data.user
      ? {
          id: response.data.user.id,
          name: response.data.user.name ?? null,
          email: response.data.user.email,
          image: response.data.user.image ?? null,
        }
      : undefined,
  };
}

export async function updateReview(
  id: string,
  data: { rating?: number; comment?: string }
): Promise<Review> {
  const response = await api.patch<any>(`reviews/${id}`, data);
  return {
    id: response.data.id,
    productId: response.data.productId,
    userId: response.data.userId,
    rating: Number(response.data.rating),
    comment: response.data.comment ?? null,
    createdAt: new Date(response.data.createdAt),
    updatedAt: new Date(response.data.updatedAt),
    user: response.data.user
      ? {
          id: response.data.user.id,
          name: response.data.user.name ?? null,
          email: response.data.user.email,
          image: response.data.user.image ?? null,
        }
      : undefined,
  };
}

export async function deleteReview(id: string): Promise<void> {
  await api.delete(`reviews/${id}`);
}
