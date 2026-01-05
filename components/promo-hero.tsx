"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function PromoHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "WELLNESS SALE",
      subtitle: "Premium CBD Oil Collection",
      description: "Full Spectrum CBD Oil 1000mg",
      price: "UGX 299,999",
      oldPrice: "UGX 450,000",
      image: "/premium-cbd-oil-bottle-with-dropper-on-natural-bac.jpg",
      badge: "50% OFF",
    },
    {
      title: "NEW ARRIVAL",
      subtitle: "Organic Essential Oils",
      description: "Lavender Essential Oil Set",
      price: "UGX 149,999",
      oldPrice: "UGX 200,000",
      image: "/lavender-essential-oil-bottles-with-flowers.jpg",
      badge: "25% OFF",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative rounded-xl overflow-hidden min-h-[340px] lg:min-h-[460px] bg-card border border-muted shadow-sm group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute h-full w-full inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 "
            }`}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image with gradient overlay */}
            <div className="relative h-full hidden lg:block overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.description}
                fill
                className="object-cover transition-transform duration-[5000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50" />
            </div>

            {/* Right: Content */}
            <div className="relative z-10 flex flex-col justify-center px-6 sm:px-8 lg:px-12 h-full">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black tracking-[0.1em] uppercase mb-4 w-fit border border-primary/20">
                {slide.title}
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-[1.1] mb-3 tracking-tight">
                {slide.subtitle}
              </h2>
              <p className="text-[13px] sm:text-sm lg:text-[14.5px] text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-primary">
                      {slide.price}
                    </span>
                    {slide.oldPrice && (
                      <span className="text-sm sm:text-base font-medium text-muted-foreground/50 line-through">
                        {slide.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-auto lg:ml-6">
                  <span className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black shadow-lg shadow-destructive/20 animate-pulse">
                    {slide.badge}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-11 sm:h-12 px-8 text-xs sm:text-sm font-black rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                    Shop Collection
                  </Button>
                </Link>
                <div className="flex items-center gap-2.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-success ring-4 ring-success/10" />
                  Free delivery over UGX 50k
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}


    </div>
  );
}
