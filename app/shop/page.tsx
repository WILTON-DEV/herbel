"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { inventory } from "@/lib/inventory";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] bg-pattern-dots">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto text-center">
            <p className="text-[#c9a961] text-sm font-medium mb-4">
              Our Products
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Shop All Products
            </h1>
            <p className="text-base lg:text-lg text-white/80">
              Explore our collection of premium organic products
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-6">
            {inventory.map((product) => {
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

      <Footer />
    </div>
  );
}
