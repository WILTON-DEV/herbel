"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { StarIcon, CheckCircleIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { useParams } from "next/navigation";
import { inventory, formatUGX } from "@/lib/inventory";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const byId = Number(params.id);
  const inv = inventory[isNaN(byId) ? 0 : (byId - 1) % inventory.length];
  const product = {
    id: byId,
    name: inv?.name ?? "Product",
    price: inv?.priceUGX ?? inv?.priceOptionsUGX?.[0] ?? 0,
    rating: 4.8,
    reviews: 124,
    image: "/amber-essential-oil-dropper-bottle.jpg",
    description:
      "Our product is crafted from the finest ingredients, carefully prepared to preserve maximum potency and purity.",
    benefits: [
      "100% Pure and Natural",
      "Organic Certified Ingredients",
      "Third-Party Lab Tested",
      "No Artificial Additives",
      "Sustainable Sourcing",
      "Premium Glass Dropper",
    ],
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl p-6 md:p-12 flex items-center justify-center overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl border"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-[#c9a961] fill-[#c9a961]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-4xl font-bold text-[#1a3a2e] mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-[#c9a961] mb-6">
              {formatUGX(product.price)}
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1a3a2e] mb-4">
                Key Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors font-medium"
                >
                  -
                </button>
                <span className="font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 transition-colors font-medium"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className={`flex-1 py-6 text-lg ${
                  addedToCart
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#c9a961] hover:bg-[#b89851]"
                } text-white`}
              >
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
            </div>

            <div className="bg-[#1a3a2e]/5 rounded-xl p-6">
              <p className="text-sm text-gray-700">
                <strong>Free shipping</strong> on orders over $50 •{" "}
                <strong>30-day</strong> money-back guarantee
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div
                key={review}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-[#c9a961] fill-[#c9a961]"
                      />
                    ))}
                  </div>
                  <span className="font-medium text-[#1a3a2e]">Sarah M.</span>
                </div>
                <p className="text-gray-700">
                  Absolutely love this oil! The quality is outstanding and the
                  dropper makes it so easy to use. Highly recommend!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
