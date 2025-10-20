import { SparklesIcon, ShieldIcon, AwardIcon, HeartIcon } from "@/components/icons"
import Image from "next/image"

const leftFeatures = [
  {
    Icon: SparklesIcon,
    title: "Premium Quality",
    description: "Only the finest ingredients",
  },
  {
    Icon: ShieldIcon,
    title: "Lab Tested",
    description: "Rigorous quality control",
  },
]

const rightFeatures = [
  {
    Icon: AwardIcon,
    title: "Award Winning",
    description: "Industry recognized excellence",
  },
  {
    Icon: HeartIcon,
    title: "Customer Loved",
    description: "Trusted by thousands",
  },
]

export function QualitySection() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#c9a961] text-sm font-medium tracking-wide">SUPERIOR DESIGN</p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a3a2e] text-balance">
            Superior design, precision drop lasting quality
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left features */}
          <div className="space-y-8">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#c9a961] flex items-center justify-center flex-shrink-0">
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-[#1a3a2e] mb-1">{feature.title}</h3>
                  <p className="text-[#1a3a2e]/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Product image */}
          <div className="relative">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
              <Image src="/premium-essential-oil-bottle-and-packaging-box-gol.jpg" alt="Premium product packaging" fill className="object-contain" />
            </div>
          </div>

          {/* Right features */}
          <div className="space-y-8">
            {rightFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#c9a961] flex items-center justify-center flex-shrink-0">
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-[#1a3a2e] mb-1">{feature.title}</h3>
                  <p className="text-[#1a3a2e]/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
