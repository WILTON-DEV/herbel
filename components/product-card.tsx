"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import { formatUGX } from "@/lib/inventory";
import { StarIcon } from "@/components/icons";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
}

export function ProductCard({
  id,
  name,
  price,
  image = "/placeholder.svg",
  rating = 4.5,
  reviews = 0,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className=" rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100">
      <Link href={`/product/${id}`} className="block">
        <div className="relative aspect-square bg-[#f5f1e8] p-2">
          <Image src={image} alt={name} fill className="object-cover rounded" />
        </div>
      </Link>

      <div className="p-2 flex-1 flex flex-col">
        <Link href={`/product/${id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 mb-1 hover:text-[#c9a961] transition-colors leading-tight">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                i < Math.floor(rating)
                  ? "text-[#c9a961] fill-[#c9a961]"
                  : "text-gray-300"
              }`}
            />
          ))}
          {reviews > 0 && (
            <span className="text-[10px] sm:text-xs text-gray-500 ml-1">
              ({reviews})
            </span>
          )}
        </div>

        <div className="mt-auto">
          <div className="text-sm sm:text-base font-bold text-primary mb-2">
            {formatUGX(price)}
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`w-full text-[11px] sm:text-xs py-1.5 sm:py-2 h-auto ${
              added
                ? "bg-primary hover:bg-primary"
                : "bg-primary hover:bg-primary"
            } text-white transition-colors`}
          >
            {added ? "Added!" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
