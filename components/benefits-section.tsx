import {
  SparklesIcon,
  ShieldIcon,
  HeartIcon,
  LeafIcon,
  DropletIcon,
  AwardIcon,
} from "@/components/icons";

const benefits = [
  {
    Icon: SparklesIcon,
    title: "Premium Quality",
    description:
      "Sourced from the finest organic farms worldwide for exceptional purity",
  },
  {
    Icon: ShieldIcon,
    title: "Lab Tested Safety",
    description:
      "Rigorously tested by third-party laboratories to ensure quality standards",
  },
  {
    Icon: HeartIcon,
    title: "Wellness Benefits",
    description:
      "Promotes relaxation, reduces stress, and supports overall wellbeing",
  },
  {
    Icon: LeafIcon,
    title: "100% Natural",
    description:
      "Pure botanical extracts with no synthetic additives or chemicals",
  },
  {
    Icon: DropletIcon,
    title: "Pure & Best Extracts",
    description:
      "Carefully extracted to preserve maximum therapeutic properties",
  },
  {
    Icon: AwardIcon,
    title: "Award Winning Quality",
    description: "Recognized by industry experts for excellence and innovation",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <p className="text-[#c9a961] text-sm font-medium tracking-wide">
            AMAZING BENEFITS
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1a3a2e] text-balance">
            Unlock nature's power amazing benefits of our oil
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className=" p-8 rounded-lg space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-[#c9a961] flex items-center justify-center">
                <benefit.Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a3a2e]">
                {benefit.title}
              </h3>
              <p className="text-[#1a3a2e]/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
