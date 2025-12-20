"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatUGX } from "@/lib/utils";
import { productsApi } from "@/lib/api-client";
import { Product } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";

export function DealsGrid() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getProducts({ limit: 6, offset: 0 });
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className=" rounded-lg  border border-gray-200 overflow-hidden">
      <div className="bg-[#f5f1e8] px-6 py-4 flex items-center justify-between border-b">
        <h2 className="text-xl font-bold text-[#1a3a2e]">Top Selling Items</h2>
        <Link href="/shop">
          <Button variant="ghost" className="text-[#1a3a2e] hover:">
            See All →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading deals...</div>
        ) : (
          products.map((product) => {
            const oldPrice = product.priceOptions && product.priceOptions.length > 0
              ? Math.max(...product.priceOptions)
              : Math.round(product.price * 1.3);
            const discount = oldPrice > product.price
              ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
              : 0;

            return (
              <div key={product.id} className="group">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-3 aspect-square">
                    <img
                      src={product.image || product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {discount > 0 && (
                      <div className="absolute top-2 left-2 bg-[#c9a961] text-white px-2 py-1 rounded text-xs font-bold">
                        -{discount}%
                      </div>
                    )}
                  </div>
                </Link>
                <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.averageRating || 0)
                            ? "text-[#c9a961]"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviewCount || 0})</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-[#1a3a2e]">
                    {formatUGX(product.price)}
                  </span>
                </div>
                {oldPrice > product.price && (
                  <div className="text-xs text-gray-500 line-through mb-2">
                    {formatUGX(oldPrice)}
                  </div>
                )}
                <Button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image || product.images?.[0] || "/placeholder.svg",
                    })
                  }
                  className="w-full bg-primary hover:bg-primary text-white text-sm py-2"
                >
                  Add to Cart
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
