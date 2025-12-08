"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { inventory } from "@/lib/inventory";
import { ProductCard } from "@/components/product-card";
import { Zap } from "lucide-react";

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 23,
    seconds: 45,
  });

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

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-red-500 text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-t-lg flex items-center justify-between flex-wrap gap-2">
        {/* Left: Flash Sales with icon */}
        <div className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <h2 className="text-base lg:text-lg font-bold">Flash Sales</h2>
        </div>

        {/* Center: Time Left with countdown boxes */}
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm">Time left</span>
          <div className="flex gap-1.5">
            {/* Hours Box */}
            <div className="bg-red-600 rounded-md px-2 py-1.5 text-center min-w-[50px]">
              <div className="text-sm lg:text-base font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-[10px] lg:text-xs">Hours</div>
            </div>
            {/* Minutes Box */}
            <div className="bg-red-600 rounded-md px-2 py-1.5 text-center min-w-[50px]">
              <div className="text-sm lg:text-base font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-[10px] lg:text-xs">Mins</div>
            </div>
            {/* Seconds Box */}
            <div className="bg-red-600 rounded-md px-2 py-1.5 text-center min-w-[50px]">
              <div className="text-sm lg:text-base font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-[10px] lg:text-xs">Secs</div>
            </div>
          </div>
        </div>

        {/* Right: See All */}
        <Link
          href="/shop?filter=flash-deals"
          className="text-white hover:text-yellow-200 text-xs lg:text-sm font-medium transition-colors"
        >
          See All &gt;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 p-3 sm:p-6">
        {inventory.slice(0, 12).map((item) => {
          const price = item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0;
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={price}
              image={item.image || "/placeholder.svg"}
              rating={4.5}
              reviews={Math.floor(Math.random() * 100) + 50}
              showSaleTag={true}
              isFlashSale={true}
            />
          );
        })}
      </div>
    </div>
  );
}
