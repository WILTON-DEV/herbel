import { Button } from "@/components/ui/button"
import { LeafIcon, DropletIcon } from "@/components/icons"
import Image from "next/image"

export function GallerySection() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[#c9a961] text-sm font-medium tracking-wide">PREMIUM QUALITY</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a3a2e] leading-tight text-balance">
                Premium quality precision design pure and effective
              </h2>
            </div>

            <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6">Shop Now</Button>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full">
                <div className="w-10 h-10 rounded-full bg-[#c9a961] flex items-center justify-center">
                  <LeafIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-[#1a3a2e]">100% Natural</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full">
                <div className="w-10 h-10 rounded-full bg-[#c9a961] flex items-center justify-center">
                  <DropletIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-[#1a3a2e]">Pure Extract</span>
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/essential-oil-bottle-in-nature-setting.jpg" alt="Product photo 1" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/botanical-ingredients-and-essential-oil.jpg" alt="Product photo 2" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src="/essential-oil-dropper-close-up-with-leaves.jpg" alt="Product photo 3" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right - Large product image */}
          <div className="relative">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              <Image
                src="/premium-essential-oil-bottle-with-botanical-leaves.jpg"
                alt="Premium essential oil"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
