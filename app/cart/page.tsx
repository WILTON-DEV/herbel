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
      <div className="min-h-screen bg-[#f5f1e8] flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a2e] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to get started
          </p>
          <Link href="/shop">
            <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-3 text-sm sm:text-base">
              Continue Shopping
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a3a2e] mb-8 sm:mb-12 text-center sm:text-left">
          Shopping Cart
        </h1>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 shadow-sm"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-[#f5f1e8] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#1a3a2e] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xl font-semibold text-[#1a3a2e]">
                    {formatUGX(item.price)}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center sm:flex-col gap-3 sm:gap-4 justify-center sm:justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-3 font-medium text-sm">
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

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <div className="border rounded-2xl p-6 shadow-sm sticky top-8">
              <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6 text-center sm:text-left">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatUGX(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Delivering</span>
                  <span className="font-medium">{formatUGX(5000)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-base sm:text-lg font-bold text-[#1a3a2e]">
                  <span>Total</span>
                  <span>{formatUGX(totalPrice + 5000)}</span>
                </div>
              </div>

              <div className="space-y-4 flex flex-col gap-2">
                <Link href="/checkout">
                  <Button className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white py-5 text-base">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="w-full border-primary border text-primary hover:bg-primary/5"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
