import { CheckCircleIcon, ShieldIcon, TruckIcon, HeartIcon } from "@/components/icons"

const features = [
  {
    icon: CheckCircleIcon,
    title: "100% Pure & Natural",
    description: "Certified organic ingredients with no additives or fillers",
  },
  {
    icon: ShieldIcon,
    title: "Quality Guaranteed",
    description: "Third-party tested for purity and potency",
  },
  {
    icon: TruckIcon,
    title: "Free Shipping",
    description: "On orders over $50 with fast delivery",
  },
  {
    icon: HeartIcon,
    title: "Customer Love",
    description: "Join 10,000+ satisfied customers worldwide",
  },
]

export function TrustSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c9a961]/10 rounded-full">
                <feature.icon className="w-8 h-8 text-[#c9a961]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a3a2e]">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
