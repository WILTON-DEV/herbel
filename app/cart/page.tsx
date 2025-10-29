"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { TrashIcon } from "@/components/icons";
import Link from "next/link";
import { formatUGX } from "@/lib/inventory";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-24  flex items-center justify-center min-h-[65vh]">
          <div className="max-w-6xl  mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#1a3a2e] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some products to get started
            </p>
            <Link href="/shop">
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <h1 className="text-4xl font-bold text-[#1a3a2e] mb-12">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className=" rounded-2xl p-6 flex gap-6 overflow-hidden"
              >
                <div className="w-24 h-24 bg-[#f5f1e8] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1a3a2e] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-[#1a3a2e]">
                    {formatUGX(item.price)}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className=" rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatUGX(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{formatUGX(5000)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-xl font-bold text-[#1a3a2e]">
                    Total
                  </span>
                  <span className="text-xl font-bold text-[#1a3a2e]">
                    {formatUGX(totalPrice + 5000)}
                  </span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white py-6 text-lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-[#1a3a2e] text-[#1a3a2e] bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
