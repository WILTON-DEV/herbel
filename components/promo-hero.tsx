"use client";

import { Button } from "@/components/ui/button";
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
    <div className="relative rounded-2xl overflow-hidden h-[460px]  border-0 bg-transparent rounded-6xl">
      {/* subtle backdrop texture */}
      <div className="pointer-events-none absolute inset-0 " />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto  h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-2">
            {/* Left copy */}
            <div className="relative z-10  p-4">
              <div className="inline-flex items-center gap-2 bg-[#1a3a2e]/10 text-[#1a3a2e] px-4 py-1 rounded-full text-xs tracking-wide uppercase mb-4 shadow-sm">
                {slide.title}
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-[#1a3a2e] leading-tight mb-3">
                {slide.subtitle}
              </h2>
              <p className="text-lg lg:text-xl text-[#1a3a2e]/80 mb-3">
                {slide.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-3xl font-extrabold text-[#1a3a2e]">
                  {slide.price}
                </span>
                <span className="text-base lg:text-lg text-[#1a3a2e]/60 line-through">
                  {slide.oldPrice}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-semibold shadow-sm">
                  {slide.badge}
                </span>
              </div>
              <Link href="/shop">
                <Button className="bg-[#1a3a2e] hover:bg-[#0f2419] text-white px-8 py-6 text-base lg:text-lg">
                  Shop Now
                </Button>
              </Link>
              <span className="ml-4 text-sm text-[#1a3a2e]/70 hidden sm:inline">
                Free delivery over UGX 50k
              </span>
            </div>
            {/* Right visual */}
            <div className="relative hidden lg:block h-full ">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.description}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Carousel indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-[#1a3a2e] w-8" : "bg-black/20 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
