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
    <div className=" rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <Link href={`/product/${id}`} className="block">
        <div className="relative aspect-square bg-[#f5f1e8] p-4">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-3 flex-1 flex flex-col">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 hover:text-[#c9a961] transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(rating)
                  ? "text-[#c9a961] fill-[#c9a961]"
                  : "text-gray-300"
              }`}
            />
          ))}
          {reviews > 0 && (
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          )}
        </div>

        <div className="mt-auto">
          <div className="text-lg font-bold text-primary mb-3">
            {formatUGX(price)}
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`w-full text-sm py-2 ${
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
