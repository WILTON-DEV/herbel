"use client";


import { Button } from "@/components/ui/button";
import { StarIcon, CheckCircleIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { formatUGX } from "@/lib/utils";
import { productsApi, reviewsApi } from "@/lib/api-client";
import { Product, Review } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        const data = await productsApi.getProduct(params.id);
        setProduct(data);
        if (data) {
          setSelectedPrice(data.price);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!params.id || typeof params.id !== "string" || !product) {
        return;
      }

      try {
        const data = await reviewsApi.getProductReviews(params.id);
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (product) {
      fetchReviews();
    }
  }, [params.id, product]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: selectedPrice,
        image: product.image || product.images?.[0] || "/placeholder.svg",
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="text-center">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1a3a2e] mb-4">Product Not Found</h1>
            <p className="text-gray-600">{error || "The product you're looking for doesn't exist."}</p>
          </div>
        </div>
      </div>
    );
  }

  const allImages = product.image
    ? [product.image, ...(product.images || [])]
    : product.images || [];
  const displayImages = allImages.length > 0 ? allImages : ["/placeholder.svg"];

  const availablePrices = product.priceOptions && product.priceOptions.length > 0
    ? product.priceOptions
    : [product.price];

  const availableSizes = product.sizeOptions && product.sizeOptions.length > 0
    ? product.sizeOptions
    : null;

  const inStock = product.stock > 0;
  const stockStatus = inStock
    ? `${product.stock} in stock`
    : "Out of stock";

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="rounded-2xl p-6 md:p-12 flex items-center justify-center overflow-hidden bg-white aspect-square">
              <img
                src={displayImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-[#c9a961]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover aspect-square"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <div className="mb-2">
                <span className="text-sm text-[#c9a961] font-medium">
                  {typeof product.category === 'string' ? product.category : product.category.name}
                </span>
              </div>
            )}

            {product.productNumber && (
              <div className="mb-2">
                <span className="text-xs text-gray-500">
                  SKU: {product.productNumber}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.averageRating || 0)
                        ? "text-[#c9a961] fill-[#c9a961]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.averageRating?.toFixed(1) || "0.0"} ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <h1 className="text-4xl font-bold text-[#1a3a2e] mb-4">
              {product.name}
            </h1>

            <div className="mb-4">
              {availablePrices.length > 1 ? (
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-[#c9a961]">
                    {formatUGX(selectedPrice)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availablePrices.map((price, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPrice(price)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedPrice === price
                            ? "border-[#c9a961] bg-[#c9a961]/10 text-[#c9a961] font-semibold"
                            : "border-gray-300 hover:border-[#c9a961]"
                        }`}
                      >
                        {formatUGX(price)}
                        {availableSizes && availableSizes[index] && ` - ${availableSizes[index]}`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-3xl font-bold text-[#c9a961]">
                  {formatUGX(product.price)}
                </p>
              )}
            </div>

            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {stockStatus}
              </span>
            </div>

            {product.description && (
              <p className="text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {availableSizes && availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#1a3a2e] mb-3">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSize(size);
                        if (availablePrices[index]) {
                          setSelectedPrice(availablePrices[index]);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? "border-[#c9a961] bg-[#c9a961]/10 text-[#c9a961] font-semibold"
                          : "border-gray-300 hover:border-[#c9a961]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors font-medium"
                  disabled={!inStock}
                >
                  -
                </button>
                <span className="font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors font-medium"
                  disabled={!inStock || quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 py-6 text-lg ${
                  !inStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : addedToCart
                    ? "bg-primary hover:bg-primary"
                    : "bg-[#c9a961] hover:bg-[#b89851]"
                } text-white`}
              >
                {!inStock
                  ? "Out of Stock"
                  : addedToCart
                  ? "Added to Cart!"
                  : "Add to Cart"}
              </Button>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1a3a2e]">Free delivery</p>
                  <p className="text-sm text-gray-600">On orders over UGX 100,000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1a3a2e]">30-day guarantee</p>
                  <p className="text-sm text-gray-600">Money-back guarantee</p>
                </div>
              </div>
              {product.category && typeof product.category === 'object' && (
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1a3a2e]">Category</p>
                    <p className="text-sm text-gray-600">{product.category.name}</p>
                    {product.category.description && (
                      <p className="text-xs text-gray-500 mt-1">{product.category.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-8 bg-white">
          <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">
            Customer Reviews ({product.reviewCount || 0})
          </h2>
          
          {reviewsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading reviews...</div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? "text-[#c9a961] fill-[#c9a961]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-[#1a3a2e]">
                      {review.user?.name || review.user?.email || "Anonymous"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
