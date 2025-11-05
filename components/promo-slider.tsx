"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const promoSlides = [
  {
    id: 1,
    title: "New Arrivals - Premium Organic Products",
    description: "Explore our latest collection of natural wellness solutions",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&h=400&fit=crop",
    cta: "Shop Now",
    link: "/shop",
    bgColor: "from-green-600 to-green-800",
  },
  {
    id: 2,
    title: "Special Offer - Up to 20% Off",
    description: "Save on selected herbal supplements and essential oils",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&h=400&fit=crop",
    cta: "View Deals",
    link: "/shop",
    bgColor: "from-amber-600 to-amber-800",
  },
  {
    id: 3,
    title: "Free Delivery on Orders Over UGX 100,000",
    description: "Get your favorite products delivered to your doorstep",
    image:
      "https://images.unsplash.com/photo-1556228852-80a974d95fd3?w=1200&h=400&fit=crop",
    cta: "Learn More",
    link: "/shop",
    bgColor: "from-blue-600 to-blue-800",
  },
];

export function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promoSlides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full relative"
            style={{ minHeight: "300px" }}
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`}
              />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center md:justify-start min-h-[300px]">
              <div className="text-white max-w-2xl text-center md:text-left py-12 md:py-0">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 text-white/90">
                  {slide.description}
                </p>
                <Link href={slide.link}>
                  <Button
                    size="lg"
                    className=" text-[#1a3a2e] hover:bg-gray-100 font-semibold px-6 md:px-8"
                  >
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous/Next Buttons - Hidden on mobile, visible on desktop */}
      <button
        onClick={goToPrevious}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 /20 hover:/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 /20 hover:/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              currentSlide === index ? " w-6 md:w-8" : "/50 hover:/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
