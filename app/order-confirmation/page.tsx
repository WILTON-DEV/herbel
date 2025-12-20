"use client";

import { Button } from "@/components/ui/button";
import { CheckCircleIcon, PhoneIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ordersApi } from "@/lib/api-client";
import { formatUGX } from "@/lib/inventory";
import type { Order } from "@/lib/types";
import { branches } from "@/lib/types";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        setError("Order number is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orders = await ordersApi.getOrders();
        const foundOrder = orders.find(
          (o) =>
            o.orderNumber === orderNumber || o.orderNumber === `#${orderNumber}`
        );

        if (!foundOrder) {
          setError(`Order ${orderNumber} not found`);
        } else {
          setOrder(foundOrder);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#4CAF50] mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f5f1e8]">
        <div className="container mx-auto px-4 lg:px-8 py-6 sm:py-12 lg:py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-700 font-semibold mb-2">Order Not Found</p>
              <p className="text-sm text-red-600">
                {error || "The order you're looking for doesn't exist."}
              </p>
            </div>
            <Link href="/account/orders">
              <Button className="bg-primary hover:bg-primary text-white">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <div className="container mx-auto px-4 lg:px-8 py-6 sm:py-12 lg:py-16">
        <div className="text-center  mx-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4CAF50] mb-2 sm:mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
            Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-left border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-[#4CAF50] mb-4">
              Order Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-mono font-semibold text-[#4CAF50]">
                  {order.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">{formatUGX(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Method:</span>
                <span className="font-medium capitalize">
                  {order.deliveryMethod}
                </span>
              </div>
              {order.deliveryMethod === "pickup" && order.branch && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Branch:</span>
                  <span className="font-medium">
                    {branches.find((b) => b.id === order.branch)?.name ||
                      order.branch}
                  </span>
                </div>
              )}
              {order.deliveryMethod === "delivery" && order.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Location:</span>
                  <span className="font-medium">{order.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Important Message */}
          <div className="bg-[#fff4e6] border-2 border-[#c9a961] rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a961]" />
              <h2 className="text-base sm:text-lg font-bold text-[#4CAF50]">
                Next Steps
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 text-left">
              <strong>We will contact you</strong> via phone to confirm your
              order and arrange delivery/pickup.
            </p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-left border border-gray-200">
            <h3 className="text-sm sm:text-base font-semibold text-[#4CAF50] mb-3 sm:mb-4">
              What happens next?
            </h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  1
                </div>
                <p>We'll call you within 24 hours to confirm</p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  2
                </div>
                <p>We'll arrange delivery/pickup time</p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  3
                </div>
                <p>Your products will be ready</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Link href="/account/orders" className="w-full sm:w-auto">
              <Button className="w-full bg-primary hover:bg-primary text-white px-6 py-2.5 sm:py-3 text-sm sm:text-base">
                View Orders
              </Button>
            </Link>
            <Link href="/shop" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-2 border-[#1a3a2e] text-[#4CAF50] px-6 py-2.5 sm:py-3 hover:bg-[#f5f1e8] text-sm sm:text-base"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
            <p>
              Questions? Call us at{" "}
              <a
                href="tel:+256200804020"
                className="text-[#c9a961] font-semibold"
              >
                0200 804 020
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#4CAF50] mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
