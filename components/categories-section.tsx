import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Essential Oils",
    count: 24,
    image: "/amber-essential-oil-dropper-bottle.jpg",
    href: "/shop?category=essential-oils",
  },
  {
    name: "CBD Products",
    count: 18,
    image: "/blue-essential-oil-dropper-bottle.jpg",
    href: "/shop?category=cbd",
  },
  {
    name: "Aromatherapy",
    count: 32,
    image: "/yellow-essential-oil-dropper-bottle.jpg",
    href: "/shop?category=aromatherapy",
  },
  {
    name: "Wellness Blends",
    count: 15,
    image: "/green-essential-oil-dropper-bottle.jpg",
    href: "/shop?category=wellness",
  },
]

export function CategoriesSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a961] text-sm font-medium tracking-wide mb-2">EXPLORE</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a3a2e]">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-[#f5f1e8]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#1a3a2e] group-hover:text-[#c9a961] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{category.count} Products</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
