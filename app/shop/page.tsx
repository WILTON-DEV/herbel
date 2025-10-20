"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useState } from "react";
import { inventory, formatUGX } from "@/lib/inventory";

export default function ShopPage() {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const products = inventory.slice(0, 12).map((item, idx) => ({
    id: idx + 1,
    name: item.name,
    price: item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0,
    rating: 4.8,
    reviews: 120 + idx,
    image: "/amber-essential-oil-dropper-bottle.jpg",
  }));

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] bg-pattern-dots">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a3a2e] text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto text-center">
            <p className="text-[#c9a961] text-sm font-medium mb-4">
              Our Products
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Premium droppers for pure, precise application
            </h1>
            <p className="text-lg text-white/80">
              Explore our collection of premium essential oils, each crafted
              with precision and care.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-[#1a3a2e]">
              Filter by:
            </span>
            <Button
              variant="outline"
              className="border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-white bg-transparent"
            >
              All Products
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
            >
              Essential Oils
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
            >
              CBD Oils
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent"
            >
              Blends
            </Button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="block aspect-square bg-[#f5f1e8] p-8"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="p-6">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-[#1a3a2e] mb-2 hover:text-[#c9a961] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-[#c9a961] fill-[#c9a961]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1a3a2e]">
                      {formatUGX(product.price)}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className={`${
                        addedToCart === product.id
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-[#c9a961] hover:bg-[#b89851]"
                      } text-white transition-colors`}
                    >
                      {addedToCart === product.id ? "Added!" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
