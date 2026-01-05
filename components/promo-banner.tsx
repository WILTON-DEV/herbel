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
  bgColor = "bg-primary",
  textColor = "text-white",
}: PromoBannerProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-muted shadow-sm group`}>
      <div className={`absolute inset-0 ${bgColor} opacity-95 group-hover:scale-105 transition-transform duration-700`} />

      {/* Abstract Background Decoration */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/5 rounded-full blur-3xl" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12 items-center">
        {/* Left: Content */}
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 mb-4 sm:mb-6 w-fit border border-white/10">
            {title}
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-5xl font-black ${textColor} mb-3 sm:mb-4 leading-tight`}>
            {subtitle}
          </h2>
          {description && (
            <p className={`text-sm sm:text-base lg:text-lg ${textColor}/80 mb-6 sm:mb-8 leading-relaxed`}>
              {description}
            </p>
          )}

          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-black ${textColor}`}>
              {price}
            </span>
            {oldPrice && (
              <span className={`text-base sm:text-lg lg:text-xl font-medium ${textColor}/40 line-through`}>
                {oldPrice}
              </span>
            )}
            {discount && (
              <span className="bg-destructive text-destructive-foreground px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black shadow-lg shadow-destructive/20">
                {discount}
              </span>
            )}
          </div>

          <Link href={ctaLink} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 bg-white text-primary hover:bg-white/90 text-sm sm:text-base font-bold rounded-xl shadow-xl shadow-black/10 transition-all active:scale-95">
              {ctaText}
            </Button>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:block relative h-72 lg:h-96">
          <img
            src={image || "/placeholder.svg"}
            alt={subtitle}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}
