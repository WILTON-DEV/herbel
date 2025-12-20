"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { formatUGX } from "@/lib/inventory";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckIcon, MapPinIcon, StoreIcon, AlertCircle } from "lucide-react";
import { ordersApi } from "@/lib/api-client";
import type { Order, OrderItem, PaymentMethod } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getBranches, type Branch } from "@/lib/branches-api";
import { useEffect } from "react";
import { CreditCardIcon, WalletIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pending");

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !user) {
      router.push(`/login?returnUrl=${encodeURIComponent("/checkout")}`);
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && mounted) {
      if (user.name && !name) setName(user.name);
      if (user.email && !email) setEmail(user.email);
    }
  }, [user, mounted, name, email]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const fetchedBranches = await getBranches();
        setBranches(Array.isArray(fetchedBranches) ? fetchedBranches : []);
        if (Array.isArray(fetchedBranches) && fetchedBranches.length > 0 && !selectedBranch) {
          setSelectedBranch(fetchedBranches[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch branches:", err);
          setBranches([]); 
        setError("Failed to load branches. Please refresh the page.");
      } finally {
        setBranchesLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty. Please add items before checkout.");
      return;
    }

    if (deliveryMethod === "delivery" && !location.trim()) {
      setError("Please enter a delivery location.");
      return;
    }

    if (deliveryMethod === "pickup" && !selectedBranch) {
      setError("Please select a pickup branch.");
      return;
    }

    setIsProcessing(true);

    try {
      if (
        items.some(
          (item) => !item.id || !item.name || !item.price || item.quantity <= 0
        )
      ) {
        setError("Invalid cart items detected. Please refresh and try again.");
        setIsProcessing(false);
        return;
      }

      const orderItems = items.map((item) => {
        if (!item.price || item.price <= 0) {
          throw new Error(`Invalid price for ${item.name}`);
        }
        if (!item.quantity || item.quantity <= 0) {
          throw new Error(`Invalid quantity for ${item.name}`);
        }
        return {
          productId: String(item.id),
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        };
      });

      const calculatedSubtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (Math.abs(calculatedSubtotal - totalPrice) > 1) {
        console.warn("Subtotal mismatch, using calculated value", {
          cartTotal: totalPrice,
          calculated: calculatedSubtotal,
        });
      }

      const deliveryCost = deliveryMethod === "delivery" ? 5000 : 0;
      const subtotal = calculatedSubtotal;
      const total = subtotal + deliveryCost;

      if (subtotal <= 0) {
        throw new Error("Order subtotal must be greater than zero");
      }
      if (total <= 0) {
        throw new Error("Order total must be greater than zero");
      }

      const orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt" | "items" | "status"> & {
        items: Omit<OrderItem, "id" | "orderId">[];
      } = {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || null,
        items: orderItems,
        subtotal,
        deliveryFee: deliveryCost,
        total,
        deliveryMethod,
        branchId: deliveryMethod === "pickup" ? selectedBranch || null : null,
        location: deliveryMethod === "delivery" ? location.trim() || null : null,
        paymentMethod: paymentMethod,
        source: "website" as const,
        notes: null,
        createdById: null,
      };

      const createdOrder = await ordersApi.createOrder(orderData);

      if (typeof window !== "undefined") {
        localStorage.setItem("customer_phone", phone.trim());
      }

      clearCart();

      router.push(
        `/order-confirmation?orderNumber=${encodeURIComponent(
          createdOrder.orderNumber
        )}`
      );
    } catch (err: any) {
      console.error("Failed to create order:", err);
      setError(err.message || "Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  const deliveryCost = 0; 
  const finalTotal = totalPrice + deliveryCost;

  if (authLoading || !mounted || !user) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-10 lg:py-14">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#4CAF50] mb-8 sm:mb-10 tracking-tight">
          Checkout
        </h1>

        {error && (
          <Alert variant="destructive" className="mb-4 sm:mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-6 sm:gap-8"
        >
              <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl sm:text-2xl font-medium text-[#4CAF50] mb-8 tracking-tight">
                Choose Delivery Method
              </h2>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) =>
                  setDeliveryMethod(value as "pickup" | "delivery")
                }
              >
                <div className="space-y-3">
                  <div className={`group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 ease-out cursor-pointer ${
                    deliveryMethod === "pickup"
                      ? "border-[#4CAF50]/30 bg-[#f7fdf8]"
                      : "border-gray-200/80 bg-white hover:border-[#4CAF50]/20 hover:bg-gray-50/50"
                  }`}>
                    <RadioGroupItem
                      value="pickup"
                      id="pickup"
                      className="mt-1"
                    />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <StoreIcon className="w-5 h-5 text-[#4CAF50]" />
                        <span className="font-medium text-base sm:text-lg text-gray-900">
                          Pickup from Store
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 leading-relaxed">
                        Free pickup from any branch
                      </span>
                    </Label>
                  </div>

                  <div className={`group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 ease-out cursor-pointer ${
                    deliveryMethod === "delivery"
                      ? "border-[#4CAF50]/30 bg-[#f7fdf8]"
                      : "border-gray-200/80 bg-white hover:border-[#4CAF50]/20 hover:bg-gray-50/50"
                  }`}>
                    <RadioGroupItem
                      value="delivery"
                      id="delivery"
                      className="mt-1"
                    />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPinIcon className="w-5 h-5 text-[#4CAF50]" />
                        <span className="font-medium text-base sm:text-lg text-gray-900">
                          Home Delivery
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 leading-relaxed">
                        Free delivery
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {deliveryMethod === "pickup" && (
                <div className="mt-8 space-y-4">
                  <h3 className="font-medium text-[#4CAF50] text-lg tracking-tight">
                    Select Branch
                  </h3>
                  {branchesLoading ? (
                    <div className="text-center py-4 text-gray-500">
                      Loading branches...
                    </div>
                  ) : !Array.isArray(branches) || branches.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No branches available
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {branches.map((branch) => (
                      <div
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch.id)}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ease-out ${
                          selectedBranch === branch.id
                            ? "border-[#4CAF50]/30 bg-[#f7fdf8]"
                            : "border-gray-200/80 bg-white hover:border-[#4CAF50]/20 hover:bg-gray-50/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 transition-all duration-300 ${
                              selectedBranch === branch.id
                                ? "border-[#4CAF50] bg-[#4CAF50]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {selectedBranch === branch.id && (
                              <CheckIcon className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#4CAF50] text-base sm:text-lg mb-2">
                              {branch.name}
                            </div>
                            <div className="text-sm text-gray-500 mb-1 leading-relaxed">
                              {branch.address}
                            </div>
                            <div className="text-sm text-gray-500 leading-relaxed">
                              {branch.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {deliveryMethod === "delivery" && (
                <div className="mt-8 space-y-5">
                  <div>
                    <Label className="text-[#4CAF50] font-medium mb-4 block text-lg tracking-tight">
                      Delivery Location
                    </Label>
                    <Input
                      placeholder="Enter your delivery address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="border border-gray-200 rounded-xl py-4 text-base focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]/10 transition-all duration-300 ease-out"
                    />
                    <p className="text-sm text-gray-500 mt-4 flex items-start gap-2 leading-relaxed">
                      <span className="font-medium text-[#4CAF50] flex-shrink-0">
                        Note:
                      </span>
                      <span>
                        Free delivery. We'll confirm location.
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl sm:text-2xl font-medium text-[#4CAF50] mb-8 tracking-tight">
                Payment Method
              </h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as PaymentMethod)
                }
              >
                <div className="space-y-3">
                  <div className={`group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 ease-out cursor-pointer ${
                    paymentMethod === "pending"
                      ? "border-[#4CAF50]/30 bg-[#f7fdf8]"
                      : "border-gray-200/80 bg-white hover:border-[#4CAF50]/20 hover:bg-gray-50/50"
                  }`}>
                    <RadioGroupItem
                      value="pending"
                      id="payment-pending"
                      className="mt-1"
                    />
                    <Label htmlFor="payment-pending" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCardIcon className="w-5 h-5 text-[#4CAF50]" />
                        <span className="font-medium text-base sm:text-lg text-gray-900">
                          Pay Later
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 leading-relaxed">
                        Pay when you receive your order
                      </span>
                    </Label>
                  </div>

                  <div className={`group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 ease-out cursor-pointer ${
                    paymentMethod === "cash"
                      ? "border-[#4CAF50]/30 bg-[#f7fdf8]"
                      : "border-gray-200/80 bg-white hover:border-[#4CAF50]/20 hover:bg-gray-50/50"
                  }`}>
                    <RadioGroupItem
                      value="cash"
                      id="payment-cash"
                      className="mt-1"
                    />
                    <Label htmlFor="payment-cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <WalletIcon className="w-5 h-5 text-[#4CAF50]" />
                        <span className="font-medium text-base sm:text-lg text-gray-900">
                          Cash on Delivery
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 leading-relaxed">
                        Pay with cash when you receive your order
                      </span>
                    </Label>
                  </div>

                  <div className={`group flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 ease-out cursor-pointer ${
                    paymentMethod === "mobile-money"
                      ? "border-[#4CAF50]/30 bg-[#f7fdf8]"
                      : "border-gray-200/80 bg-white hover:border-[#4CAF50]/20 hover:bg-gray-50/50"
                  }`}>
                    <RadioGroupItem
                      value="mobile-money"
                      id="payment-momo"
                      className="mt-1"
                    />
                    <Label htmlFor="payment-momo" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCardIcon className="w-5 h-5 text-[#4CAF50]" />
                        <span className="font-medium text-base sm:text-lg text-gray-900">
                          Mobile Money
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 leading-relaxed">
                        Pay via Mobile Money (MTN/Airtel)
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl sm:text-2xl font-medium text-[#4CAF50] mb-8 tracking-tight">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-3 block tracking-tight">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-200 rounded-xl py-4 text-base focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]/10 transition-all duration-300 ease-out"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-3 block tracking-tight">
                    Phone Number
                  </Label>
                  <Input
                    placeholder="e.g. 0700 000 000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border border-gray-200 rounded-xl py-4 text-base focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]/10 transition-all duration-300 ease-out"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-3 block tracking-tight">
                    Email (Optional)
                  </Label>
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-200 rounded-xl py-4 text-base focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]/10 transition-all duration-300 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sticky top-28">
              <h2 className="text-xl sm:text-2xl font-medium text-[#4CAF50] mb-8 tracking-tight">
                Order Summary
              </h2>
              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  {mounted && items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start text-base"
                      >
                        <span className="text-gray-700 flex-1 line-clamp-2 pr-4 leading-relaxed">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900 flex-shrink-0">
                          {formatUGX(item.price * item.quantity)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      {mounted ? "Your cart is empty" : "Loading..."}
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {mounted ? formatUGX(totalPrice) : "UGX 0"}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-semibold text-[#4CAF50] tracking-tight">
                      Total
                    </span>
                    <span className="text-lg sm:text-xl font-semibold text-[#4CAF50] tracking-tight">
                      {mounted ? formatUGX(finalTotal) : "UGX 0"}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-5 text-lg font-medium rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Processing Order...
                  </span>
                ) : (
                  "Complete Order"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
