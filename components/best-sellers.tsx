"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCartIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import { formatUGX } from "@/lib/utils";
import { productsApi } from "@/lib/api-client";
import { Product } from "@/lib/types";

export function BestSellers() {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products sorted by rating (best sellers)
        const data = await productsApi.getProducts({ limit: 4, offset: 0 });
        // Sort by averageRating descending
        const sorted = [...data].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        setProducts(sorted);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || "/placeholder.svg",
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <section className=" py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a961] text-sm font-medium tracking-wide mb-2">
            TOP RATED
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a3a2e]">
            Best Selling Products
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our most loved essential oils, trusted by thousands of
            customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading best sellers...</div>
          ) : (
            products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                <div className="relative aspect-square  overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image || product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <div className="absolute top-4 left-4 bg-[#c9a961] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Best Seller
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-[#1a3a2e] hover:text-[#c9a961] transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-[#c9a961] font-bold">
                        {product.averageRating?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-gray-600">({product.reviewCount || 0})</span>
                    </div>
                    <span className="text-gray-600">
                      {product.reviewCount && product.reviewCount > 1000
                        ? `${(product.reviewCount / 1000).toFixed(1)}k+ sold`
                        : `${product.reviewCount || 0}+ sold`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1a3a2e]">
                      {formatUGX(product.price)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className={`${
                        addedToCart === product.id
                          ? "bg-green-500 hover:bg-primary"
                          : "bg-primary hover:bg-[#2a4a3e]"
                      } text-white`}
                    >
                      {addedToCart === product.id ? (
                        "Added!"
                      ) : (
                        <ShoppingCartIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
