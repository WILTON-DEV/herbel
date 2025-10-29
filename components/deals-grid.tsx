"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { inventory, formatUGX } from "@/lib/inventory";
import Link from "next/link";

const products = inventory.slice(12, 18).map((item, idx) => ({
  id: idx + 1,
  name: item.name,
  price: item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0,
  oldPrice:
    Math.round((item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0) * 1.3) ||
    undefined,
  discount: 25,
  image: "/amber-essential-oil-dropper-bottle.jpg",
  rating: 4.6,
  reviews: 200,
}));

export function DealsGrid() {
  const { addToCart } = useCart();

  return (
    <div className=" rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#f5f1e8] px-6 py-4 flex items-center justify-between border-b">
        <h2 className="text-xl font-bold text-[#1a3a2e]">Top Selling Items</h2>
        <Link href="/shop">
          <Button variant="ghost" className="text-[#1a3a2e] hover:">
            See All →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-3 aspect-square">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-[#c9a961] text-white px-2 py-1 rounded text-xs font-bold">
                  -{product.discount}%
                </div>
              </div>
            </Link>
            <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-[#c9a961]"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-[#1a3a2e]">
                {formatUGX(product.price)}
              </span>
            </div>
            {product.oldPrice && (
              <div className="text-xs text-gray-500 line-through mb-2">
                {formatUGX(product.oldPrice)}
              </div>
            )}
            <Button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
              className="w-full bg-primary hover:bg-primary text-white text-sm py-2"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
