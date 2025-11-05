"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  EyeIcon,
  PlusIcon,
  FilterIcon,
  PackageIcon,
  TruckIcon,
  StoreIcon,
} from "@/components/icons";
import { useState } from "react";
import type { Order, OrderStatus, PaymentMethod } from "@/lib/types";
import { mockOrders } from "@/lib/mock-data";
import { formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterBranch, setFilterBranch] = useState<string>("all");

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );
  };

  const handlePaymentChange = (
    orderId: string,
    newPaymentMethod: PaymentMethod
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              paymentMethod: newPaymentMethod,
              status:
                newPaymentMethod === "cash"
                  ? "cash-received"
                  : newPaymentMethod === "mobile-money"
                    ? "mobile-money-received"
                    : order.status,
              updatedAt: new Date(),
            }
          : order
      )
    );
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<OrderStatus, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      "cash-received": "bg-green-100 text-green-800",
      "mobile-money-received": "bg-purple-100 text-purple-800",
      completed: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const labels: Record<OrderStatus, string> = {
      pending: "Pending",
      confirmed: "Confirmed",
      "cash-received": "Cash Received (Sin)",
      "mobile-money-received": "Mobile Money (Mum)",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return (
      <Badge className={variants[status]} variant="outline">
        {labels[status]}
      </Badge>
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (filterBranch !== "all" && order.branch !== filterBranch) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Orders</h1>
          <p className="text-muted-foreground">
            Manage orders from website and shop attendants
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Manual Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Manual Order</DialogTitle>
              <DialogDescription>
                Manually record an order placed at the shop
              </DialogDescription>
            </DialogHeader>
            <ManualOrderForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cash-received">Cash Received (Sin)</SelectItem>
                  <SelectItem value="mobile-money-received">
                    Mobile Money (Mum)
                  </SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Branch</Label>
              <Select value={filterBranch} onValueChange={setFilterBranch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Order #</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Location/Branch
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Total</th>
                  <th className="text-left py-3 px-4 font-medium">Payment</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">
                      {order.orderNumber}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        {order.source === "website" ? "🌐 Website" : "🏪 Manual"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.customerPhone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {order.deliveryMethod === "pickup" ? (
                        <div className="flex items-center gap-1 text-sm">
                          <StoreIcon className="h-4 w-4 text-[#4CAF50]" />
                          <span>Pickup</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm">
                          <TruckIcon className="h-4 w-4 text-[#4CAF50]" />
                          <span>Delivery</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {order.deliveryMethod === "pickup"
                        ? branches.find((b) => b.id === order.branch)?.name ||
                          order.branch
                        : order.location}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatUGX(order.total)}
                    </td>
                    <td className="py-3 px-4">
                      <Select
                        value={order.paymentMethod}
                        onValueChange={(value) =>
                          handlePaymentChange(order.id, value as PaymentMethod)
                        }
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cash">Cash (Sin)</SelectItem>
                          <SelectItem value="mobile-money">MoMo (Mum)</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDetailsOpen(true);
                          }}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.orderNumber}</DialogTitle>
                <DialogDescription>
                  View and update order information
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Customer</Label>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.customerPhone}
                    </p>
                    {selectedOrder.customerEmail && (
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.customerEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Delivery Method</Label>
                    <p className="font-medium capitalize">
                      {selectedOrder.deliveryMethod}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.deliveryMethod === "pickup"
                        ? branches.find((b) => b.id === selectedOrder.branch)
                            ?.name
                        : selectedOrder.location}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-2 block">
                    Order Items
                  </Label>
                  <div className="border rounded-lg divide-y">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3"
                      >
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × {formatUGX(item.price)}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatUGX(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatUGX(selectedOrder.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">
                      {formatUGX(selectedOrder.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>{formatUGX(selectedOrder.total)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Payment Method</Label>
                    <Select
                      value={selectedOrder.paymentMethod}
                      onValueChange={(value) => {
                        handlePaymentChange(
                          selectedOrder.id,
                          value as PaymentMethod
                        );
                        setSelectedOrder({
                          ...selectedOrder,
                          paymentMethod: value as PaymentMethod,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cash">Cash (Sin)</SelectItem>
                        <SelectItem value="mobile-money">MoMo (Mum)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Order Status</Label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) => {
                        handleStatusChange(selectedOrder.id, value as OrderStatus);
                        setSelectedOrder({
                          ...selectedOrder,
                          status: value as OrderStatus,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cash-received">
                          Cash Received (Sin)
                        </SelectItem>
                        <SelectItem value="mobile-money-received">
                          Mobile Money (Mum)
                        </SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <Label className="text-muted-foreground">Notes</Label>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  <p>Created: {selectedOrder.createdAt.toLocaleString()}</p>
                  <p>Updated: {selectedOrder.updatedAt.toLocaleString()}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ManualOrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [branch, setBranch] = useState("kampala");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement order creation
    alert("Manual order creation will be implemented with backend");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="customerPhone">Phone Number *</Label>
          <Input
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label>Delivery Method</Label>
        <Select
          value={deliveryMethod}
          onValueChange={(value) => setDeliveryMethod(value as "pickup" | "delivery")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pickup">Pickup from Store</SelectItem>
            <SelectItem value="delivery">Home Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {deliveryMethod === "pickup" ? (
        <div>
          <Label>Pickup Branch</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div>
          <Label htmlFor="location">Delivery Location *</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      )}

      <div>
        <Label>Payment Method</Label>
        <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cash">Cash (Sin - Received at shop)</SelectItem>
            <SelectItem value="mobile-money">
              Mobile Money (Mum - Sent to boss)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
        />
      </div>

      <DialogFooter>
        <Button
          type="submit"
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
        >
          Create Order
        </Button>
      </DialogFooter>
    </form>
  );
}
