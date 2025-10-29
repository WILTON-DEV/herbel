"use client";

import type React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { formatUGX } from "@/lib/inventory";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckIcon, MapPinIcon, StoreIcon } from "lucide-react";

const branches = [
  {
    id: 1,
    name: "Main Branch - Kampala",
    address: "Kampala Road, Kampala",
    phone: "0200 804 020",
  },
  {
    id: 2,
    name: "Entebbe Branch",
    address: "Entebbe Road, Entebbe",
    phone: "0200 804 020",
  },
  {
    id: 3,
    name: "Ntinda Branch",
    address: "Ntinda Shopping Center, Ntinda",
    phone: "0200 804 020",
  },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [selectedBranch, setSelectedBranch] = useState<number>(1);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    router.push("/order-confirmation");
  };

  const deliveryCost = deliveryMethod === "delivery" ? 5000 : 0;
  const finalTotal = totalPrice + deliveryCost;

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <h1 className="text-2xl lg:text-4xl font-bold text-[#4CAF50] mb-6 lg:mb-12">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Method Selection */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-[#4CAF50] mb-6">
                Choose Delivery Method
              </h2>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) =>
                  setDeliveryMethod(value as "pickup" | "delivery")
                }
              >
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border-2 border-[#1a3a2e] rounded-lg hover:bg-[#f5f1e8] transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="pickup"
                      id="pickup"
                      className="mt-1"
                    />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <StoreIcon className="w-5 h-5 text-[#c9a961]" />
                        <span className="font-semibold text-lg">
                          Pickup from Store
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        Free pickup from any of our branches
                      </span>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border-2 border-gray-300 rounded-lg hover:bg-[#f5f1e8] transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="delivery"
                      id="delivery"
                      className="mt-1"
                    />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPinIcon className="w-5 h-5 text-[#c9a961]" />
                        <span className="font-semibold text-lg">
                          Home Delivery
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        Delivery fee UGX 5,000 (Covered by buyer)
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Branch Selection - Only show if pickup */}
              {deliveryMethod === "pickup" && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-[#4CAF50] text-lg">
                    Select Branch
                  </h3>
                  {branches.map((branch) => (
                    <div
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedBranch === branch.id
                          ? "border-[#c9a961] bg-[#f5f1e8]"
                          : "border-gray-200 hover:border-[#c9a961]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                            selectedBranch === branch.id
                              ? "border-[#c9a961] bg-[#c9a961]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedBranch === branch.id && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#4CAF50]">
                            {branch.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {branch.address}
                          </div>
                          <div className="text-sm text-gray-600">
                            Phone: {branch.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Location Input - Only show if delivery */}
              {deliveryMethod === "delivery" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label className="text-[#4CAF50] font-semibold mb-2 block">
                      Delivery Location
                    </Label>
                    <Input
                      placeholder="Enter your delivery address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="bg-white border-2 border-[#1a3a2e] py-6 text-base"
                    />
                    <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                      <span className="font-medium text-[#4CAF50]">Note:</span>
                      Delivery cost is covered by buyer. We'll contact you to
                      confirm your location.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-[#4CAF50] mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white border-2 border-gray-300 py-5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    placeholder="e.g. 0700 000 000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-white border-2 border-gray-300 py-5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email (Optional)
                  </Label>
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-2 border-gray-300 py-5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl lg:rounded-2xl p-6 sticky top-20">
              <h2 className="text-xl lg:text-2xl font-bold text-[#4CAF50] mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 flex-1">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium ml-2">
                      {formatUGX(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatUGX(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
                    </span>
                    <span className="font-medium">
                      {formatUGX(deliveryCost)}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold text-[#4CAF50]">
                      Total
                    </span>
                    <span className="text-lg font-bold text-[#4CAF50]">
                      {formatUGX(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#1a3a2e] hover:bg-[#0f2419] text-white py-6 text-base lg:text-lg"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
