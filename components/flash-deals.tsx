"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import { ProductCard } from "@/components/product-card";
import { BackgroundDecoration } from "@/components/background-decoration";
import { Zap } from "lucide-react";

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 23,
    seconds: 45,
  });
  const { products, loading, loadProducts } = useProducts();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadProducts({ limit: 12 });
  }, [loadProducts]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-card border border-muted shadow-sm group">
      <BackgroundDecoration type="organic" position="top-right" opacity={0.02} />
      <BackgroundDecoration type="dots" position="bottom-left" opacity={0.015} />

      <div className="relative z-10 bg-destructive text-destructive-foreground px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between flex-wrap gap-3 sm:gap-5">
        {/* Left: Flash Sales with icon */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
          </div>
          <div>
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-wider leading-none mb-0.5">Flash Sales</h2>
            <p className="text-[8px] sm:text-[9px] font-bold opacity-70 uppercase tracking-[0.2em]">Limited time offers</p>
          </div>
        </div>

        {/* Center: Time Left with countdown boxes */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-black/10 px-3 sm:px-5 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
          <span className="hidden xs:inline text-[9px] sm:text-[10px] font-bold uppercase tracking-widest opacity-80">Ending In</span>
          <div className="flex gap-2.5 sm:gap-3 items-center">
            {/* Hours Box */}
            <div className="text-center">
              <div className="text-sm sm:text-base font-black tabular-nums">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-tighter opacity-60">Hrs</div>
            </div>
            <div className="text-sm sm:text-base font-black opacity-30">:</div>
            {/* Minutes Box */}
            <div className="text-center">
              <div className="text-sm sm:text-base font-black tabular-nums">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-tighter opacity-60">Min</div>
            </div>
            <div className="text-sm sm:text-base font-black opacity-30">:</div>
            {/* Seconds Box */}
            <div className="text-center">
              <div className="text-sm sm:text-base font-black tabular-nums text-yellow-400">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-tighter opacity-60">Sec</div>
            </div>
          </div>
        </div>

        {/* Right: See All */}
        <Link
          href="/shop?filter=flash-deals"
          className="bg-white/10 hover:bg-white/20 px-3 sm:px-5 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all text-center flex-1 sm:flex-none"
        >
          View All deals
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6">
        {loading ? (
          <div className="col-span-full text-center py-20 font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
            Loading flash deals...
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image || product.images?.[0] || "/placeholder.svg"}
              rating={product.averageRating || 0}
              reviews={product.reviewCount || 0}
              showSaleTag={true}
              isFlashSale={true}
            />
          ))
        )}
      </div>
    </div>
  );
}
