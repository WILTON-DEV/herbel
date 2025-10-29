"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  description?: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
}

export function PromoBanner({
  title,
  subtitle,
  description,
  price,
  oldPrice,
  discount,
  image,
  ctaText = "Shop Now",
  ctaLink = "/shop",
  bgColor = "bg-[#1a3a2e]",
  textColor = "text-white",
}: PromoBannerProps) {
  return (
    <div className={`${bgColor} rounded-xl lg:rounded-2xl overflow-hidden`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8 items-center">
        {/* Left: Content */}
        <div className="flex flex-col">
          <div className="text-xs lg:text-sm font-semibold text-yellow-400 mb-2 uppercase tracking-wide">
            {title}
          </div>
          <h2 className={`text-2xl lg:text-4xl font-bold ${textColor} mb-3`}>
            {subtitle}
          </h2>
          {description && (
            <p className={`text-sm lg:text-base ${textColor}/80 mb-4`}>
              {description}
            </p>
          )}

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xl lg:text-3xl font-bold ${textColor}`}>
              {price}
            </span>
            {oldPrice && (
              <span
                className={`text-sm lg:text-base ${textColor}/60 line-through`}
              >
                {oldPrice}
              </span>
            )}
            {discount && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                {discount}
              </span>
            )}
          </div>

          <Link href={ctaLink}>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-[#1a3a2e] px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-base font-semibold">
              {ctaText}
            </Button>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:block relative h-64 lg:h-80">
          <img
            src={image || "/placeholder.svg"}
            alt={subtitle}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
