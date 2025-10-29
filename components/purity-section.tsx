import { CheckIcon } from "@/components/icons";
import Image from "next/image";

const features = [
  "Premium organic ingredients",
  "Third-party lab tested",
  "Sustainable sourcing practices",
  "No artificial additives",
  "Cruelty-free production",
  "Eco-friendly packaging",
];

export function PuritySection() {
  return (
    <section className="bg-primary text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Product images */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/essential-oil-bottles-with-botanical-ingredients-a.jpg"
                alt="Product collection"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[#c9a961] text-sm font-medium tracking-wide">
                OUR COMMITMENT
              </p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-balance">
                Delivering precision, purity, and care daily
              </h2>
              <p className="text-white/80 leading-relaxed">
                Every bottle represents our unwavering commitment to quality and
                your wellbeing. We source only the finest ingredients and employ
                rigorous testing protocols.
              </p>
            </div>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c9a961] flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
