import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PromoBanner() {
  return (
    <section className="bg-gradient-to-r from-[#c9a961] to-[#d4b574] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Limited Time Offer: Get 50% Off Your First Order
            </h3>
            <p className="text-white/90">Use code FIRST50 at checkout. Valid for new customers only.</p>
          </div>
          <Link href="/shop">
            <Button className="bg-[#1a3a2e] hover:bg-[#2a4a3e] text-white px-8 py-6 text-base whitespace-nowrap">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
