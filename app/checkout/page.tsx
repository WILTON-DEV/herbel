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
      <div className="container mx-auto px-4 lg:px-8 py-4 sm:py-6 lg:py-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4CAF50] mb-4 sm:mb-6">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Delivery Method Selection */}
            <div className=" rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#4CAF50] mb-4 sm:mb-5">
                Choose Delivery Method
              </h2>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) =>
                  setDeliveryMethod(value as "pickup" | "delivery")
                }
              >
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border-2 border-[#1a3a2e] rounded-lg hover:bg-[#f5f1e8] transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="pickup"
                      id="pickup"
                      className="mt-0.5 sm:mt-1"
                    />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                        <StoreIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a961]" />
                        <span className="font-semibold text-sm sm:text-base">
                          Pickup from Store
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Free pickup from any branch
                      </span>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:bg-[#f5f1e8] transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="delivery"
                      id="delivery"
                      className="mt-0.5 sm:mt-1"
                    />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a961]" />
                        <span className="font-semibold text-sm sm:text-base">
                          Home Delivery
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Fee: UGX 5,000 (Covered by buyer)
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Branch Selection - Only show if pickup */}
              {deliveryMethod === "pickup" && (
                <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                  <h3 className="font-semibold text-[#4CAF50] text-sm sm:text-base">
                    Select Branch
                  </h3>
                  {branches.map((branch) => (
                    <div
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch.id)}
                      className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedBranch === branch.id
                          ? "border-[#c9a961] bg-[#f5f1e8]"
                          : "border-gray-200 hover:border-[#c9a961]"
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div
                          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            selectedBranch === branch.id
                              ? "border-[#c9a961] bg-[#c9a961]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedBranch === branch.id && (
                            <CheckIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[#4CAF50] text-sm sm:text-base">
                            {branch.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {branch.address}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {branch.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Location Input - Only show if delivery */}
              {deliveryMethod === "delivery" && (
                <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                  <div>
                    <Label className="text-[#4CAF50] font-semibold mb-2 block text-sm sm:text-base">
                      Delivery Location
                    </Label>
                    <Input
                      placeholder="Enter your delivery address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="border-2 border-[#1a3a2e] py-2.5 sm:py-3 text-sm sm:text-base"
                    />
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 flex items-start gap-1.5 sm:gap-2">
                      <span className="font-medium text-[#4CAF50] flex-shrink-0">
                        Note:
                      </span>
                      <span>
                        Delivery cost covered by buyer. We'll confirm location.
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className=" rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#4CAF50] mb-4 sm:mb-5">
                Contact Information
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-2 border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 block">
                    Phone Number
                  </Label>
                  <Input
                    placeholder="e.g. 0700 000 000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-2 border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 block">
                    Email (Optional)
                  </Label>
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-gray-300 py-2.5 sm:py-3 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className=" rounded-lg sm:rounded-xl p-4 sm:p-5 sticky top-20">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#4CAF50] mb-4 sm:mb-5">
                Order Summary
              </h2>
              <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-xs sm:text-sm"
                  >
                    <span className="text-gray-600 flex-1 line-clamp-1 pr-2">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium flex-shrink-0">
                      {formatUGX(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatUGX(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">
                      {deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
                    </span>
                    <span className="font-medium">
                      {formatUGX(deliveryCost)}
                    </span>
                  </div>
                  <div className="border-t pt-2 sm:pt-3 flex justify-between">
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-[#4CAF50]">
                      Total
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-[#4CAF50]">
                      {formatUGX(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary text-white py-2.5 sm:py-3 text-sm sm:text-base"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
