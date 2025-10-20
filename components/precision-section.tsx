import { ShieldIcon, AwardIcon } from "@/components/icons"
import Image from "next/image"

export function PrecisionSection() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[#c9a961] text-sm font-medium tracking-wide">PREMIUM</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a3a2e] leading-tight text-balance">
                Precision drops, premium quality, care you trust
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#c9a961] flex items-center justify-center">
                  <ShieldIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-semibold text-[#1a3a2e]">Quality Assured</h3>
                <p className="text-[#1a3a2e]/70 text-sm leading-relaxed">
                  Rigorous testing ensures every bottle meets our high standards
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#c9a961] flex items-center justify-center">
                  <AwardIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-base font-semibold text-[#1a3a2e]">Premium Grade</h3>
                <p className="text-[#1a3a2e]/70 text-sm leading-relaxed">
                  Only the finest ingredients make it into our products
                </p>
              </div>
            </div>

            <p className="text-[#1a3a2e]/70 leading-relaxed">
              Our commitment to excellence means you receive only the purest, most effective essential oils. Each bottle
              is a testament to our dedication to your wellness and satisfaction.
            </p>
          </div>

          {/* Right - Product image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/essential-oil-bottle-with-candles-and-botanical-el.jpg"
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
