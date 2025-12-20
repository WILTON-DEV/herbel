"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { CategorySidebar } from "@/components/category-sidebar";
import { PromoHero } from "@/components/promo-hero";
import { PromoBanner } from "@/components/promo-banner";
import { FlashDeals } from "@/components/flash-deals";
import { DealsGrid } from "@/components/deals-grid";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { productsApi } from "@/lib/api-client";
import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productsApi.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-2 sm:py-3 lg:py-5 px-2 sm:px-3 lg:px-4 ">
        {/* Desktop: Grid with sidebars, Mobile: Full width hero only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-5">
          <div className="hidden lg:block lg:col-span-2">
            <CategorySidebar />
          </div>

          <div className="lg:col-span-6">
            <PromoHero />
          </div>

          <div className="lg:col-span-4">
            <div className="bg-primary rounded-xl lg:rounded-2xl p-6 lg:p-8 h-full flex flex-col">
              <div className="flex-1 space-y-5">
                <div className="text-xs lg:text-sm font-semibold text-white/90 uppercase tracking-wide">
                  PREMIUM QUALITY
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                  Natural Botanical Wellness Collection
                </h3>
                <p className="text-xs lg:text-sm text-white/80 leading-relaxed">
                  Experience the power of nature with our carefully curated
                  selection of organic essential oils and botanical extracts.
                  Sustainably sourced and ethically produced.
                </p>
                <Link href="/shop" className="inline-block mt-2">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-3 py-2 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold transition-colors">
                    Explore Collection
                  </Button>
                </Link>
              </div>
              <div className="mt-8 relative h-36 lg:h-44 rounded-lg overflow-hidden bg-white/5">
                <Image
                  src="https://res.cloudinary.com/dkz73xkbr/image/upload/v1761716224/freepik__create-a-bright-modern-and-highenergy-ecommerce-ad__86227_l895hl.png"
                  alt="Botanical wellness collection"
                  className="object-contain object-bottom"
                  fill
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <FlashDeals />
        </div>

        {/* Promo Banner 1 */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <PromoBanner
            title="Special Offers"
            subtitle="Wellness Collection"
            description="Natural supplements for your health journey"
            price="UGX 249,999"
            oldPrice="UGX 350,000"
            discount="30% OFF"
            image="https://res.cloudinary.com/dkz73xkbr/image/upload/v1765174961/removed_zpg6yr.png"
            ctaText="Shop Now"
            ctaLink="/shop"
          />
        </div>

        {/* Top Selling Products */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <div className=" rounded-lg overflow-hidden border">
            <div className="bg-primary text-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 flex items-center justify-between">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold">
                🔥 Top Selling
              </h2>
              <a href="/shop" className="text-xs sm:text-sm hover:underline">
                See All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4">
              {loading ? (
                <div className="col-span-full text-center py-4 text-muted-foreground">
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-4 text-muted-foreground">
                  No products available
                </div>
              ) : (
                products.slice(0, 6).map((product) => {
                  const price = product.priceOptions.length > 0 
                    ? product.priceOptions[0] 
                    : product.price;
                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={price}
                      image={product.image || product.images[0] || "/placeholder.svg"}
                      rating={product.averageRating || 0}
                      reviews={product.reviewCount || 0}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Promo Banner 2 */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <PromoBanner
            title="Limited Time"
            subtitle="Shop & Win Big!"
            description="Spend over UGX 100,000 and win prizes"
            price="From UGX 30,000"
            ctaText="Learn More"
            ctaLink="/shop"
            bgColor="bg-gradient-to-r from-purple-600 to-pink-600"
            image="https://res.cloudinary.com/dkz73xkbr/image/upload/v1765174961/rm_xzed3w.png"
          />
        </div>

        {/* Deals Grid */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <DealsGrid />
        </div>

        {/* New Arrivals */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <div className=" rounded-lg overflow-hidden border">
            <div className="bg-[#c9a961] text-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 flex items-center justify-between">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold">
                ✨ New Arrivals
              </h2>
              <a href="/shop" className="text-xs sm:text-sm hover:underline">
                See All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4">
              {loading ? (
                <div className="col-span-full text-center py-4 text-muted-foreground">
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-4 text-muted-foreground">
                  No products available
                </div>
              ) : (
                products.slice(12, 18).map((product) => {
                  const price = product.priceOptions.length > 0 
                    ? product.priceOptions[0] 
                    : product.price;
                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={price}
                      image={product.image || product.images[0] || "/placeholder.svg"}
                      rating={product.averageRating || 0}
                      reviews={product.reviewCount || 0}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
