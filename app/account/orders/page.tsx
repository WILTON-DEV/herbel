"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ordersApi } from "@/lib/api-client";
import { formatUGX } from "@/lib/inventory";
import type { Order } from "@/lib/types";
import { EyeIcon } from "@/components/icons";

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    "cash-received": "Paid (Cash)",
    "mobile-money-received": "Paid (Mobile Money)",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
    confirmed: "text-blue-600 bg-blue-50 border-blue-200",
    "cash-received": "text-green-600 bg-green-50 border-green-200",
    "mobile-money-received": "text-green-600 bg-green-50 border-green-200",
    completed: "text-green-600 bg-green-50 border-green-200",
    cancelled: "text-red-600 bg-red-50 border-red-200",
  };
  return colors[status] || "text-gray-600 bg-gray-50 border-gray-200";
}

export default function OrdersPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // Backend automatically filters orders by authenticated user's ID (createdById)
      // For CUSTOMER role, only returns their own orders
      const allOrders = await ordersApi.getOrders();
      
      // Sort by date, newest first
      allOrders.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setOrders(allOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1a3a2e] mb-12">My Orders</h1>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card className="border-border/50 shadow-sm">
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 mb-4">No orders found</p>
                <Link href="/shop">
                  <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white">
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-lg font-semibold text-[#1a3a2e]">
                            Order {order.orderNumber}
                          </p>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {order.createdAt.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#1a3a2e]">
                          {formatUGX(order.total)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.deliveryMethod === "pickup"
                            ? "Pickup"
                            : "Delivery"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{order.customerName}</p>
                        <p>{order.customerPhone}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#1a3a2e] text-[#1a3a2e] bg-transparent hover:bg-[#1a3a2e] hover:text-white"
                        onClick={() => handleViewDetails(order)}
                      >
                        <EyeIcon className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Order Details - {selectedOrder.orderNumber}
                </DialogTitle>
                <DialogDescription>
                  Order placed on{" "}
                  {selectedOrder.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Customer Name
                    </p>
                    <p className="font-semibold">
                      {selectedOrder.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Phone Number
                    </p>
                    <p className="font-semibold">
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                  {selectedOrder.customerEmail && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="font-semibold">
                        {selectedOrder.customerEmail}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Delivery Method
                    </p>
                    <p className="font-semibold capitalize">
                      {selectedOrder.deliveryMethod}
                    </p>
                    {selectedOrder.deliveryMethod === "pickup" &&
                      selectedOrder.branch && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Pickup from: {selectedOrder.branch.name}
                        </p>
                      )}
                    {selectedOrder.deliveryMethod === "delivery" &&
                      selectedOrder.location && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Deliver to: {selectedOrder.location}
                        </p>
                      )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#1a3a2e]">
                    Order Items
                  </h3>
                  <div className="border rounded-lg divide-y divide-border/50">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-base mb-1">
                            {item.productName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × {formatUGX(item.price)}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold text-base">
                            {formatUGX(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">
                      {formatUGX(selectedOrder.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee:</span>
                    <span className="font-medium">
                      {formatUGX(selectedOrder.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-3 mt-2">
                    <span>Total:</span>
                    <span className="text-[#1a3a2e]">
                      {formatUGX(selectedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Payment Method
                    </p>
                    <Badge
                      className={`${getStatusColor(
                        selectedOrder.paymentMethod
                      )}`}
                    >
                      {getStatusLabel(selectedOrder.paymentMethod)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Order Status
                    </p>
                    <Badge
                      className={`${getStatusColor(selectedOrder.status)}`}
                    >
                      {getStatusLabel(selectedOrder.status)}
                    </Badge>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Notes
                    </p>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="text-xs text-muted-foreground pt-4 border-t border-border/50">
                  <p>Created: {selectedOrder.createdAt.toLocaleString()}</p>
                  {selectedOrder.updatedAt.getTime() !==
                    selectedOrder.createdAt.getTime() && (
                    <p>Updated: {selectedOrder.updatedAt.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
