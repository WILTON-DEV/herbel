"use client"

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"

export function PremiumHero() {
  return (
    <section className="relative bg-[#1a3a2e] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12 lg:py-0">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-block">
              <span className="bg-[#c9a961]/20 text-[#c9a961] px-4 py-2 rounded-full text-sm font-medium">
                100% Pure Organic Ingredients
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Pure drops perfect precision care you can trust
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              Experience the transformative power of nature with our premium essential oils. Carefully crafted for your
              wellness journey.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8">
                  Shop Now
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-gray-400 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400 text-sm">Premium Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/20 to-transparent rounded-3xl" />
            <Image
              src="/premium-essential-oil-dropper-bottle-with-green-bo.jpg"
              alt="Premium Essential Oil"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            {/* Floating Badge */}
            <div className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#c9a961] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <div className="font-bold text-[#1a3a2e]">100% Pure</div>
                  <div className="text-sm text-gray-600">Certified Organic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2a4a3e] to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#c9a961]/10 to-transparent" />
    </section>
  )
}
