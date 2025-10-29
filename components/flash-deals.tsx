"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { inventory } from "@/lib/inventory";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

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
    <div className=" rounded-lg  overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg lg:text-xl font-bold">⚡ Flash Sales</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm">Time Left:</span>
          <div className="flex gap-1">
            <div className=" text-red-600 px-2 py-1 rounded-md font-bold text-xs lg:text-sm">
              {String(timeLeft.hours).padStart(2, "0")}h
            </div>
            <div className=" text-red-600 px-2 py-1 rounded-md font-bold text-xs lg:text-sm">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </div>
            <div className=" text-red-600 px-2 py-1 rounded-md font-bold text-xs lg:text-sm">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </div>
          </div>
        </div>
        <Link href="/shop?filter=flash-deals">
          <Button
            variant="ghost"
            className="text-white hover:/20 text-xs lg:text-sm"
          >
            See All →
          </Button>
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
            />
          );
        })}
      </div>
    </div>
  );
}
