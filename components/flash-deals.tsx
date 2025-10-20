"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Lavender Essential Oil",
    price: 45000,
    oldPrice: 75000,
    discount: 40,
    image: "/lavender-essential-oil-bottle.jpg",
    stock: 12,
  },
  {
    id: 2,
    name: "CBD Pain Relief Cream",
    price: 89000,
    oldPrice: 150000,
    discount: 41,
    image: "/cbd-pain-relief-cream-jar.jpg",
    stock: 8,
  },
  {
    id: 3,
    name: "Peppermint Oil Set",
    price: 55000,
    oldPrice: 95000,
    discount: 42,
    image: "/peppermint-essential-oil.jpg",
    stock: 15,
  },
  {
    id: 4,
    name: "Full Spectrum CBD Oil",
    price: 299000,
    oldPrice: 450000,
    discount: 34,
    image: "/cbd-oil-dropper-bottle.jpg",
    stock: 5,
  },
  {
    id: 5,
    name: "Tea Tree Oil",
    price: 38000,
    oldPrice: 60000,
    discount: 37,
    image: "/tea-tree-essential-oil.jpg",
    stock: 20,
  },
  {
    id: 6,
    name: "CBD Gummies 30ct",
    price: 125000,
    oldPrice: 180000,
    discount: 31,
    image: "/cbd-gummies-bottle.jpg",
    stock: 10,
  },
];

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
        {products.map((product) => (
          <div key={product.id} className="group">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative bg-muted rounded-lg overflow-hidden mb-3 aspect-square">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                  -{product.discount}%
                </div>
              </div>
            </Link>
            <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-primary">
                UGX {product.price.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground line-through mb-2">
              UGX {product.oldPrice.toLocaleString()}
            </div>
            <div className="text-xs text-orange-600 mb-2">
              {product.stock} items left
            </div>
            <Button
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  typeof (window as any).addToCart === "function"
                ) {
                  (window as any).addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
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
        ))}
      </div>
    </div>
  );
}
