"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
    router.push("/order-confirmation")
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <h1 className="text-4xl font-bold text-[#1a3a2e] mb-12">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">Shipping Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" required className="bg-[#f5f1e8]" />
                <Input placeholder="Last Name" required className="bg-[#f5f1e8]" />
                <Input placeholder="Email" type="email" required className="bg-[#f5f1e8] sm:col-span-2" />
                <Input placeholder="Phone" type="tel" required className="bg-[#f5f1e8] sm:col-span-2" />
                <Input placeholder="Address" required className="bg-[#f5f1e8] sm:col-span-2" />
                <Input placeholder="City" required className="bg-[#f5f1e8]" />
                <Input placeholder="ZIP Code" required className="bg-[#f5f1e8]" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">Payment Information</h2>
              <div className="space-y-4">
                <Input placeholder="Card Number" required className="bg-[#f5f1e8]" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" required className="bg-[#f5f1e8]" />
                  <Input placeholder="CVV" required className="bg-[#f5f1e8]" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#1a3a2e] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-xl font-bold text-[#1a3a2e]">Total</span>
                    <span className="text-xl font-bold text-[#1a3a2e]">${(totalPrice + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white py-6 text-lg"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
