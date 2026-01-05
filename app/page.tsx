"use client";

import { useEffect } from "react";
import { Header } from "@/components/header";
import { CategorySidebar } from "@/components/category-sidebar";
import { PromoHero } from "@/components/promo-hero";
import { PromoBanner } from "@/components/promo-banner";
import { FlashDeals } from "@/components/flash-deals";
import { DealsGrid } from "@/components/deals-grid";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { useProducts } from "@/lib/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { products, loading, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts({ limit: 20 });
  }, [loadProducts]);
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-5 sm:py-8 px-4 md:px-8 max-w-7xl">
        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mb-8 lg:mb-14">
          <div className="hidden lg:block lg:col-span-3">
            <CategorySidebar />
          </div>

          <div className="lg:col-span-6">
            <PromoHero />
          </div>

          <div className="lg:col-span-3">
            <div className="group bg-primary rounded-2xl p-5 sm:p-6 lg:p-7 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl transition-transform duration-700 group-hover:scale-150" />

              <div className="flex-1 space-y-3.5 sm:space-y-4 lg:space-y-5 relative z-10">
                <div className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
                  PREMIUM QUALITY
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-tight">
                  Natural Botanical Wellness
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-medium">
                  Experience the power of nature with our carefully curated
                  selection of organic essential oils and botanical extracts.
                </p>
                <Link href="/shop" className="inline-block pt-1">
                  <Button className="h-9 sm:h-10 px-4 sm:px-5 bg-white/10 hover:bg-white text-white hover:text-primary border border-white/20 text-[10px] sm:text-xs font-bold transition-all rounded-lg">
                    Explore Collection
                  </Button>
                </Link>
              </div>

              <div className="mt-5 sm:mt-6 relative h-36 sm:h-40 lg:h-44 rounded-xl overflow-hidden   transition-colors">
                <Image
                  src="https://res.cloudinary.com/dkz73xkbr/image/upload/v1761716224/freepik__create-a-bright-modern-and-highenergy-ecommerce-ad__86227_l895hl.png"
                  alt="Botanical wellness collection"
                  className="object-contain object-bottom transition-transform duration-700 group-hover:scale-110 rounded-xl"
                  fill
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="mb-8 lg:mb-14">
          <FlashDeals />
        </div>

        {/* Promo Banner 1 */}
        <div className="mb-8 lg:mb-14">
          <PromoBanner
            title="Special Offers"
            subtitle="Wellness Collection"
            description="Pure, natural supplements for your holistic health journey."
            price="UGX 249,999"
            oldPrice="UGX 350,000"
            discount="30% OFF"
            image="https://res.cloudinary.com/dkz73xkbr/image/upload/v1765174961/removed_zpg6yr.png"
            ctaText="Shop Now"
            ctaLink="/shop"
          />
        </div>

        {/* Top Selling Products */}
        <div className="mb-8 lg:mb-14">
          <div className="bg-card rounded-2xl overflow-hidden border border-muted shadow-sm">
            <div className="bg-primary px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/10">
              <div>
                <h2 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider">
                  🔥 Best Sellers
                </h2>
                <p className="text-[8px] sm:text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mt-0.5">Our most loved botanicals</p>
              </div>
              <Link href="/shop" className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-5 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all">
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6">
              {loading ? (
                <div className="col-span-full text-center py-20 font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-20 font-bold text-muted-foreground uppercase tracking-widest">
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
        <div className="mb-8 lg:mb-14">
          <PromoBanner
            title="Limited Time"
            subtitle="Shop & Win Big!"
            description="Experience nature's premium extracts and win amazing prizes on every purchase."
            price="From UGX 30,000"
            ctaText="Explore Now"
            ctaLink="/shop"
            bgColor="bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500"
            image="https://res.cloudinary.com/dkz73xkbr/image/upload/v1765174961/rm_xzed3w.png"
          />
        </div>

        {/* New Arrivals */}
        <div className="mb-8 lg:mb-14">
          <div className="bg-card rounded-2xl overflow-hidden border border-muted shadow-sm">
            <div className="bg-[#c5a059] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/10">
              <div>
                <h2 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider">
                  ✨ New Arrivals
                </h2>
                <p className="text-[8px] sm:text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mt-0.5">Fresh from the harvest</p>
              </div>
              <Link href="/shop" className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-5 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all">
                Explore All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 p-4 sm:p-6">
              {loading ? (
                <div className="col-span-full text-center py-20 font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-20 font-bold text-muted-foreground uppercase tracking-widest">
                  No products available
                </div>
              ) : (
                products.slice(6, 12).map((product) => {
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
