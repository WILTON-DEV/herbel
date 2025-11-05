"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { inventory } from "@/lib/inventory";
import { productCategories, type ProductCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "all"
  >("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return inventory;
    return inventory.filter(
      (product) =>
        product.category && product.category.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f5f1e8] bg-pattern-dots">
      {/* Hero Section */}
      <section className="bg-primary text-white py-6 sm:py-10 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto text-center">
            <p className="text-[#c9a961] text-xs sm:text-sm font-medium mb-2 sm:mb-3">
              Our Products
            </p>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3">
              Shop All Products
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-white/80">
              Premium organic products for your wellness
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Mobile Horizontal Scroll, Desktop Grid */}
      <section className="py-3 sm:py-4 lg:py-5 /50 backdrop-blur-sm sticky top-16 z-40 border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              onClick={() => setSelectedCategory("all")}
              variant={selectedCategory === "all" ? "default" : "outline"}
              className={`whitespace-nowrap flex-shrink-0 text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 ${
                selectedCategory === "all"
                  ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                  : ""
              }`}
            >
              All ({inventory.length})
            </Button>
            {productCategories.map((cat) => {
              const count = inventory.filter(
                (p) => p.category && p.category.includes(cat.id)
              ).length;
              return (
                <Button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className={`whitespace-nowrap flex-shrink-0 text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 ${
                    selectedCategory === cat.id
                      ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                      : ""
                  }`}
                >
                  {cat.name} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-4 sm:py-6 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#1a3a2e]">
              {selectedCategory === "all"
                ? "All Products"
                : productCategories.find((c) => c.id === selectedCategory)
                    ?.name}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {filteredProducts.length} product(s)
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
            {filteredProducts.map((product) => {
              const price =
                product.priceUGX ?? product.priceOptionsUGX?.[0] ?? 0;
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={price}
                  image={product.image || "/placeholder.svg"}
                  rating={4.5}
                  reviews={Math.floor(Math.random() * 100) + 50}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
