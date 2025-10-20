"use client"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/components/icons"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-[#1a3a2e] text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <p className="text-[#c9a961] text-sm font-medium tracking-wide">100% Pure Organic Ingredients</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance">
              Pure drops perfect precision care you can trust
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-xl">
              Experience the power of nature with our premium essential oils. Carefully crafted for your wellness
              journey with uncompromising quality and purity.
            </p>
            <div className="flex gap-4">
              <Link href="/shop">
                <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6 text-base">
                  Shop Now
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1a3a2e] px-8 py-6 text-base bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Product image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <img
                src="/premium-essential-oil-dropper-bottle-with-green-bo.jpg"
                alt="Premium essential oil bottle with botanical elements"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
