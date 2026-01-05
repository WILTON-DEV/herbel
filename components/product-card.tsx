"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/useCart";
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
  showSaleTag?: boolean;
  isFlashSale?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  image = "/placeholder.svg",
  rating = 4.5,
  reviews = 0,
  showSaleTag = false,
  isFlashSale = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    await addItem(id, 1, price, name, image);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`group rounded-xl overflow-hidden flex flex-col h-full bg-card border border-muted transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1`}
    >
      <Link href={`/product/${id}`} className="block relative overflow-hidden">
        <div className="relative aspect-square bg-[#f8f9fa] transition-transform duration-700 group-hover:scale-105">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>

        {showSaleTag && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
            SALE
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors duration-500" />
      </Link>

      <div className="p-2 sm:p-2.5 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-2 h-2 sm:w-2.2 sm:h-2.2 ${i < Math.floor(rating)
                ? "text-accent fill-accent"
                : "text-muted"
                }`}
            />
          ))}
          {reviews > 0 && (
            <span className="text-[7.5px] sm:text-[8.5px] text-muted-foreground font-semibold ml-0.5">
              ({reviews})
            </span>
          )}
        </div>

        <Link href={`/product/${id}`}>
          <h3 className="text-[10px] sm:text-[12px] font-bold text-foreground line-clamp-2 mb-1 hover:text-primary transition-colors leading-tight tracking-tight">
            {name}
          </h3>
        </Link>

        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-1.5 mb-1.5 sm:mb-2">
            <span className="text-[13px] sm:text-[14.5px] font-black text-primary">
              {formatUGX(price)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            className={`w-full rounded-md sm:rounded-lg h-7 sm:h-8 px-2 text-[9px] sm:text-[10px] font-black transition-all duration-300 ${added
              ? "bg-success hover:bg-success text-white scale-[1.02]"
              : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              }`}
          >
            {added ? "Added" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
