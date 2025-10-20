import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/icons";
import Image from "next/image";
import { inventory, formatUGX } from "@/lib/inventory";

const products = inventory.slice(0, 4).map((item) => ({
  name: item.name,
  price: item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0,
  image: "/amber-essential-oil-dropper-bottle.jpg",
}));

export function ProductGrid() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div className="space-y-2">
            <p className="text-[#c9a961] text-sm font-medium tracking-wide">
              FEATURED PRODUCTS
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a3a2e]">
              Premium droppers for pure, precise application
            </h2>
          </div>
          <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white">
            View All
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-[#1a3a2e]">
                  {product.name}
                </h3>
                <p className="text-[#c9a961] font-bold text-xl">
                  {formatUGX(product.price)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
