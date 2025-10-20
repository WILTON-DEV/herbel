"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { inventory, formatUGX } from "@/lib/inventory";

export function FlashDeals() {
  const cart = useCart();
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
    <div className="bg-card rounded-lg shadow-soft border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">⚡ Flash Sales</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Time Left:</span>
          <div className="flex gap-1">
            <div className="bg-white text-red-600 px-2 py-1 rounded-md font-bold text-sm">
              {String(timeLeft.hours).padStart(2, "0")}h
            </div>
            <div className="bg-white text-red-600 px-2 py-1 rounded-md font-bold text-sm">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </div>
            <div className="bg-white text-red-600 px-2 py-1 rounded-md font-bold text-sm">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </div>
          </div>
        </div>
        <Link href="/shop?filter=flash-deals">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            See All →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
        {inventory.slice(0, 12).map((item) => {
          const price = item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0;
          return (
            <div key={item.id} className="group">
              <Link href={`/product/${item.id}`} className="block">
                <div className="relative bg-muted rounded-lg overflow-hidden mb-3 aspect-square">
                  <Image
                    src="/placeholder.svg"
                    alt={item.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Example discount badge. If discounts are added later, compute here. */}
                </div>
              </Link>
              <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2 min-h-[40px]">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-primary">
                  {formatUGX(price)}
                </span>
                {item.priceOptionsUGX && item.priceOptionsUGX.length > 1 ? (
                  <span className="text-xs text-muted-foreground">from</span>
                ) : null}
              </div>
              <Button
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    typeof (window as any).addToCart === "function"
                  ) {
                    (window as any).addToCart({
                      id: item.id,
                      name: item.name,
                      price,
                      image: "/placeholder.svg",
                    });
                  } else {
                    console.error("addToCart is not defined");
                  }
                }}
                className="w-full bg-accent hover:bg-accent-hover text-white text-sm py-2 transition-colors"
              >
                Add to Cart
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
