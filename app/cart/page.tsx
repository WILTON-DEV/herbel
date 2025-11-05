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
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a3a2e] mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Add some products to get started
          </p>
          <Link href="/shop">
            <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-6 py-2.5 text-sm sm:text-base">
              Continue Shopping
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] flex flex-col">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a3a2e] mb-4 sm:mb-6 text-center sm:text-left">
          Shopping Cart
        </h1>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className=" border rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-sm"
              >
                {/* Product Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f5f1e8] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain p-1 sm:p-2"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a3a2e] mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-[#1a3a2e]">
                    {formatUGX(item.price)}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-2 items-end flex-shrink-0">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 hover:bg-red-50 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </button>

                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 hover:bg-gray-100 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="px-2 font-medium text-xs sm:text-sm min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100 transition-colors text-sm"
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
            <div className=" border rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm sticky top-20">
              <h2 className="text-lg sm:text-xl font-bold text-[#1a3a2e] mb-4 sm:mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4 sm:mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatUGX(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">{formatUGX(5000)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base sm:text-lg font-bold text-[#1a3a2e]">
                  <span>Total</span>
                  <span>{formatUGX(totalPrice + 5000)}</span>
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <Link href="/checkout">
                  <Button className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white py-2.5 sm:py-3 text-sm sm:text-base">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="w-full border-primary border text-primary hover:bg-primary/5 text-sm"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
