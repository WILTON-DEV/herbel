import { Button } from "@/components/ui/button"
import { LeafIcon, DropletIcon } from "@/components/icons"
import Image from "next/image"

export function ProductShowcase() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Product image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image src="/golden-essential-oil-bottle-with-decorative-botani.jpg" alt="Essential oil bottle" fill className="object-contain" />
              {/* 100% Pure badge */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-[#c9a961] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xs font-bold">100%</div>
                  <div className="text-white text-xs font-bold">Pure</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[#c9a961] text-sm font-medium tracking-wide">PREMIUM QUALITY</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a3a2e] leading-tight text-balance">
                Pure essence precise drops ultimate care always
              </h2>
            </div>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a961] flex items-center justify-center flex-shrink-0">
                  <LeafIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a3a2e] mb-1">100% Natural Ingredient</h3>
                  <p className="text-[#1a3a2e]/70 text-sm leading-relaxed">
                    Sourced from the finest organic farms, our oils are completely natural and free from synthetic
                    additives.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a961] flex items-center justify-center flex-shrink-0">
                  <DropletIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a3a2e] mb-1">100% Pure & Best</h3>
                  <p className="text-[#1a3a2e]/70 text-sm leading-relaxed">
                    Every drop is carefully extracted and tested to ensure the highest quality and therapeutic benefits.
                  </p>
                </div>
              </div>
            </div>

            <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6">Learn More</Button>

            {/* Small product showcase */}
            <div className="pt-4">
              <Image
                src="/small-essential-oil-bottles-arrangement.jpg"
                alt="Product showcase"
                width={200}
                height={120}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
