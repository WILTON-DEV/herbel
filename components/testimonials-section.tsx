import { StarIcon } from "./icons"
import Image from "next/image"

const testimonials = [
  {
    rating: 5,
    text: "These essential oils have completely transformed my daily wellness routine. The quality is exceptional and the results speak for themselves. I've tried many brands, but nothing compares to the purity and effectiveness of these oils.",
    author: "Sarah Johnson",
  },
  {
    rating: 5,
    text: "I'm amazed by the therapeutic benefits I've experienced. The precision dropper makes it easy to use, and the natural fragrance is absolutely divine. This is now an essential part of my self-care ritual.",
    author: "Michael Chen",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-[#1a3a2e] text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=600&width=500" alt="Happy customer" fill className="object-cover" />
            </div>
          </div>

          {/* Right - Testimonials */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[#c9a961] text-sm font-medium tracking-wide">TESTIMONIALS</p>
              <h2 className="text-3xl lg:text-4xl font-bold">Real reviews trusted quality happy customers</h2>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-[#c9a961] text-[#c9a961]" />
                    ))}
                  </div>
                  <p className="text-white/90 leading-relaxed">{testimonial.text}</p>
                  <p className="text-[#c9a961] font-medium">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
