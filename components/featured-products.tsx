"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCartIcon, HeartIcon, EyeIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { inventory, formatUGX } from "@/lib/inventory";

const products = inventory.slice(0, 8).map((item, idx) => ({
  id: String(idx + 1),
  name: item.name,
  priceUGX: item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0,
  image: "/amber-essential-oil-dropper-bottle.jpg",
  rating: 4.8,
  reviews: 124,
}));

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div className="space-y-2">
            <p className="text-[#c9a961] text-sm font-medium tracking-wide">
              SHOP NOW
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a3a2e]">
              Featured Essential Oils
            </h2>
            <p className="text-gray-600 mt-2">
              Handpicked premium selections for your wellness journey
            </p>
          </div>
          <Link href="/shop">
            <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white">
              View All Products
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Badge */}
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      product.badge === "Sale"
                        ? "bg-red-500"
                        : product.badge === "New"
                        ? "bg-green-500"
                        : product.badge === "Best Seller"
                        ? "bg-[#c9a961]"
                        : "bg-primary"
                    }`}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10  rounded-full flex items-center justify-center shadow-lg hover:bg-[#c9a961] hover:text-white transition-colors">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <Link href={`/product/${product.id}`}>
                    <button className="w-10 h-10  rounded-full flex items-center justify-center shadow-lg hover:bg-[#c9a961] hover:text-white transition-colors">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </Link>
                </div>

                {/* Discount Badge */}
                {/* Optional discount badge removed for cleanliness */}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-[#1a3a2e] hover:text-[#c9a961] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-[#c9a961]"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1a3a2e]">
                    {formatUGX(product.priceUGX)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full ${
                    addedToCart === product.id
                      ? "bg-green-500 hover:bg-primary"
                      : "bg-primary hover:bg-[#2a4a3e]"
                  } text-white transition-colors`}
                >
                  {addedToCart === product.id ? (
                    <>Added to Cart!</>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
