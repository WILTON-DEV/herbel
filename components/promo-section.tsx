import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PromoSection() {
  return (
    <section className="bg-[#1a3a2e] text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[#c9a961] text-sm font-medium tracking-wide">LIMITED TIME OFFER</p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">Get 50% off Premium oil</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Don't miss this exclusive opportunity to experience our premium essential oils at an unbeatable price.
                Limited stock available.
              </p>
            </div>
            <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6 text-base">Shop Now</Button>
          </div>

          {/* Right - Product image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image src="/premium-essential-oil-bottle-on-circular-platform-.jpg" alt="Premium oil offer" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
