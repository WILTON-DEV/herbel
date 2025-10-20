import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { LeafIcon, DropletIcon, CheckCircleIcon } from "@/components/icons"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#1a3a2e] text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a961] text-sm font-medium mb-4">About Our Company</p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Pure drops perfect precision care you can trust</h1>
            <p className="text-lg text-white/80 mb-8">
              We are dedicated to providing the highest quality essential oils and natural products, crafted with
              precision and care for your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/essential-oil-production-facility-with-botanical-p.jpg" alt="Our facility" className="rounded-2xl w-full h-auto" />
            </div>
            <div>
              <p className="text-[#c9a961] text-sm font-medium mb-4">Our Story</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#1a3a2e] mb-6">Crafting excellence since 2010</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our journey began with a simple mission: to bring the purest, most effective essential oils to people
                seeking natural wellness solutions. Over the years, we've perfected our extraction and bottling
                processes to ensure every drop meets our exacting standards.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Today, we're proud to serve thousands of customers worldwide, helping them discover the transformative
                power of nature's finest ingredients.
              </p>
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c9a961] text-sm font-medium mb-4">Our Values</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1a3a2e] mb-6">What we stand for</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#c9a961]/10 flex items-center justify-center mx-auto mb-6">
                <LeafIcon className="w-10 h-10 text-[#c9a961]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a2e] mb-4">100% Natural</h3>
              <p className="text-gray-700 leading-relaxed">
                We source only the finest organic ingredients, ensuring purity in every bottle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#c9a961]/10 flex items-center justify-center mx-auto mb-6">
                <DropletIcon className="w-10 h-10 text-[#c9a961]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a2e] mb-4">Precision Crafted</h3>
              <p className="text-gray-700 leading-relaxed">
                Every drop is carefully extracted and bottled with meticulous attention to detail.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#c9a961]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-10 h-10 text-[#c9a961]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a2e] mb-4">Quality Assured</h3>
              <p className="text-gray-700 leading-relaxed">
                Rigorous testing and quality control ensure you receive only the best products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c9a961] text-sm font-medium mb-4">Our Team</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1a3a2e] mb-6">Meet the experts</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={`/professional-team-member-.jpg?height=400&width=400&query=professional team member ${i}`}
                  alt={`Team member ${i}`}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#1a3a2e] mb-2">Team Member {i}</h3>
                  <p className="text-[#c9a961] text-sm">Position Title</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
