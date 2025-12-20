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
  TruckIcon,
  StoreIcon,
} from "@/components/icons";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { Order, OrderStatus, PaymentMethod, Product } from "@/lib/types";
import { ordersApi, productsApi } from "@/lib/api-client";
import { formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
    loadProducts();

    // Auto-refresh orders every 10 seconds to catch new website orders
    const interval = setInterval(() => {
      loadOrders(true); // Silent refresh
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadOrders = async (silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    try {
      const data = await ordersApi.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productsApi.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const updated = await ordersApi.updateOrder(
        orderId,
        { status: newStatus },
        user || undefined
      );
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }

      // Show success notification
      toast.success("Order status updated", {
        description: `Order ${updated.orderNumber} status changed to ${newStatus}.`,
      });
    } catch (error: any) {
      toast.error("Failed to update status", {
        description: error.message || "Failed to update order status",
      });
      console.error("Failed to update order:", error);
    }
  };

  const handlePaymentChange = async (
    orderId: string,
    newPaymentMethod: PaymentMethod
  ) => {
    try {
      const updated = await ordersApi.updateOrder(
        orderId,
        { paymentMethod: newPaymentMethod },
        user || undefined
      );
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }

      // Show success notification
      if (
        updated.status === "cash-received" ||
        updated.status === "mobile-money-received"
      ) {
        toast.success("Payment recorded!", {
          description: `Order ${updated.orderNumber} marked as paid. Sales record created and inventory updated.`,
        });
      } else {
        toast.success("Payment method updated", {
          description: `Order ${updated.orderNumber} payment method changed.`,
        });
      }
    } catch (error: any) {
      toast.error("Failed to update payment", {
        description: error.message || "Failed to update payment method",
      });
      console.error("Failed to update order:", error);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<OrderStatus, string> = {
      pending: "bg-muted text-muted-foreground border-border/50",
      confirmed: "bg-primary/10 text-primary border-primary/20",
      "cash-received": "bg-primary/10 text-primary border-primary/20",
      "mobile-money-received": "bg-accent/10 text-accent border-accent/20",
      completed: "bg-primary/10 text-primary border-primary/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
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
      <Badge className={`${variants[status]} font-medium`} variant="outline">
        {labels[status]}
      </Badge>
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (filterBranch !== "all" && order.branch !== filterBranch) return false;
    if (filterSource !== "all" && order.source !== filterSource) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.includes(query)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
            {refreshing && (
              <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin" />
            )}
          </div>
          <p className="text-muted-foreground">
            Manage orders from website and shop attendants
            {refreshing && (
              <span className="ml-2 text-xs text-primary">Refreshing...</span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadOrders()}
            disabled={refreshing || loading}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Manual Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Manual Order</DialogTitle>
                <DialogDescription>
                  Manually record an order placed at the shop
                </DialogDescription>
              </DialogHeader>
              <ManualOrderForm
                products={products}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => {
                  setIsCreateOpen(false);
                  loadOrders();
                  toast.success("Order created!", {
                    description: "Manual order has been added successfully.",
                  });
                }}
                currentUser={user}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Order #, customer, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
            <div>
              <Label>Source</Label>
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">🌐 Website</SelectItem>
                  <SelectItem value="manual">🏪 Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
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
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">
                        {order.orderNumber}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {order.source === "website"
                            ? "🌐 Website"
                            : "🏪 Manual"}
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
                        <div className="space-y-1.5">
                          <Select
                            value={order.paymentMethod}
                            onValueChange={(value) =>
                              handlePaymentChange(
                                order.id,
                                value as PaymentMethod
                              )
                            }
                          >
                            <SelectTrigger className="w-[160px] h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="cash">
                                Cash - Received
                              </SelectItem>
                              <SelectItem value="mobile-money">
                                Paid via MM
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {order.paymentMethod === "pending" && (
                            <p className="text-xs text-muted-foreground">
                              Click to mark as paid
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {getStatusBadge(order.status)}
                          {order.status === "pending" &&
                            order.paymentMethod === "pending" && (
                              <p className="text-xs text-muted-foreground">
                                Update payment above
                              </p>
                            )}
                        </div>
                      </td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-5xl p-6 sm:p-8">
          {selectedOrder && (
            <>
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl">
                  Order Details - {selectedOrder.orderNumber}
                </DialogTitle>
                <DialogDescription className="text-sm mt-2">
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
              <div className="space-y-8">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-muted/30 rounded-lg border border-border/50">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs mb-2 block">
                      Customer Name
                    </Label>
                    <p className="font-semibold text-base">
                      {selectedOrder.customerName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs mb-2 block">
                      Phone Number
                    </Label>
                    <p className="font-semibold text-base">
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                  {selectedOrder.customerEmail && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-xs mb-2 block">
                        Email
                      </Label>
                      <p className="font-semibold text-base">
                        {selectedOrder.customerEmail}
                      </p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs mb-2 block">
                      Delivery Method
                    </Label>
                    <p className="font-semibold text-base capitalize">
                      {selectedOrder.deliveryMethod}
                    </p>
                    {selectedOrder.deliveryMethod === "pickup" &&
                      selectedOrder.branch && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Pickup from:{" "}
                          {branches.find((b) => b.id === selectedOrder.branch)
                            ?.name || selectedOrder.branch}
                        </p>
                      )}
                    {selectedOrder.deliveryMethod === "delivery" &&
                      selectedOrder.location && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Deliver to: {selectedOrder.location}
                        </p>
                      )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold block">
                    Order Items ({selectedOrder.items.length})
                  </Label>
                  <div className="border rounded-lg divide-y divide-border/50">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start p-5 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <p className="font-semibold text-base mb-2">
                            {item.productName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × {formatUGX(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-base">
                            {formatUGX(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-4 p-5 bg-muted/50 rounded-lg border border-border/50">
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
                  <div className="flex justify-between text-lg font-bold border-t border-border/50 pt-4 mt-4">
                    <span>Total:</span>
                    <span className="text-primary">
                      {formatUGX(selectedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-muted/30 rounded-lg border border-border/50">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-muted-foreground text-xs block">
                        Payment Method
                      </Label>
                      {selectedOrder.paymentMethod === "pending" && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          Payment Pending
                        </Badge>
                      )}
                    </div>
                    <Select
                      value={selectedOrder.paymentMethod}
                      onValueChange={(value) => {
                        handlePaymentChange(
                          selectedOrder.id,
                          value as PaymentMethod
                        );
                      }}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          Pending
                        </SelectItem>
                        <SelectItem value="cash">
                          Cash - Received
                        </SelectItem>
                        <SelectItem value="mobile-money">
                          Paid via MM
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedOrder.paymentMethod === "pending" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        💡 Select "Cash" or "MoMo" above when payment is
                        received. Status will update automatically.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs block">
                      Order Status
                    </Label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) => {
                        handleStatusChange(
                          selectedOrder.id,
                          value as OrderStatus
                        );
                      }}
                    >
                      <SelectTrigger className="h-11">
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
                    <p className="text-xs text-muted-foreground mt-1">
                      Status updates automatically when payment method changes.
                    </p>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="p-5 bg-muted/30 rounded-lg border border-border/50">
                    <Label className="text-muted-foreground text-xs mb-2 block">
                      Notes
                    </Label>
                    <p className="text-sm leading-relaxed">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}

                <div className="text-xs text-muted-foreground pt-5 border-t border-border/50 space-y-1">
                  <p>Created: {selectedOrder.createdAt.toLocaleString()}</p>
                  {selectedOrder.updatedAt.getTime() !==
                    selectedOrder.createdAt.getTime() && (
                    <p>Updated: {selectedOrder.updatedAt.toLocaleString()}</p>
                  )}
                </div>

                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-2">
                    💡 Business Logic:
                  </p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>
                      Changing payment to "Cash" or "MoMo" auto-updates status
                      and creates sales record
                    </li>
                    <li>
                      Inventory is automatically deducted when payment is
                      received
                    </li>
                    <li>Cannot mark as paid if insufficient inventory</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ManualOrderForm({
  products,
  onClose,
  onSuccess,
  currentUser,
}: {
  products: Product[];
  onClose: () => void;
  onSuccess: () => void;
  currentUser: any;
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [branch, setBranch] = useState(currentUser?.branch || "kampala");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pending");
  const [notes, setNotes] = useState("");
  const [orderItems, setOrderItems] = useState<
    Array<{ productId: string; quantity: number }>
  >([]);
  const [submitting, setSubmitting] = useState(false);

  const addItem = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: "productId" | "quantity",
    value: string | number
  ) => {
    const updated = [...orderItems];
    updated[index] = { ...updated[index], [field]: value };
    setOrderItems(updated);
  };

  const calculateTotal = () => {
    let subtotal = 0;
    orderItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        const price = product.priceUGX || product.priceOptionsUGX?.[0] || 0;
        subtotal += price * item.quantity;
      }
    });
    const deliveryFee = deliveryMethod === "delivery" ? 5000 : 0;
    return { subtotal, deliveryFee, total: subtotal + deliveryFee };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      alert("Please add at least one item to the order");
      return;
    }

    if (orderItems.some((item) => !item.productId || item.quantity < 1)) {
      alert("Please select a product and quantity for all items");
      return;
    }

    setSubmitting(true);

    try {
      const { subtotal, deliveryFee, total } = calculateTotal();

      const items = orderItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        const price = product?.priceUGX || product?.priceOptionsUGX?.[0] || 0;
        return {
          productId: item.productId,
          productName: product?.name || "Unknown",
          quantity: item.quantity,
          price,
        };
      });

      await ordersApi.createOrder({
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        items,
        subtotal,
        deliveryFee,
        total,
        deliveryMethod,
        branch: deliveryMethod === "pickup" ? branch : undefined,
        location: deliveryMethod === "delivery" ? location : undefined,
        status: "pending",
        paymentMethod,
        notes: notes || undefined,
        source: "manual",
      });

      alert("Order created successfully!");
      onSuccess();
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const { subtotal, deliveryFee, total } = calculateTotal();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerPhone">Phone Number *</Label>
          <Input
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerEmail">Email (Optional)</Label>
        <Input
          id="customerEmail"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label>Delivery Method</Label>
        <Select
          value={deliveryMethod}
          onValueChange={(value) =>
            setDeliveryMethod(value as "pickup" | "delivery")
          }
        >
          <SelectTrigger className="h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pickup">Pickup from Store</SelectItem>
            <SelectItem value="delivery">Home Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {deliveryMethod === "pickup" ? (
        <div className="space-y-2">
          <Label>Pickup Branch</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="h-11">
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
        <div className="space-y-2">
          <Label htmlFor="location">Delivery Location *</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="h-11"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Order Items *</Label>
          <Button
            type="button"
            size="sm"
            onClick={addItem}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
        <div className="space-y-3 border border-border/50 rounded-lg p-4 bg-muted/30">
          {orderItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items added yet</p>
          ) : (
            orderItems.map((item, index) => (
              <div key={index} className="flex gap-3 items-end">
                <Select
                  value={item.productId}
                  onValueChange={(value) =>
                    updateItem(index, "productId", value)
                  }
                >
                  <SelectTrigger className="flex-1 h-11">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} -{" "}
                        {formatUGX(
                          product.priceUGX || product.priceOptionsUGX?.[0] || 0
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-24 h-11"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  ×
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {orderItems.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-border/50">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">{formatUGX(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee:</span>
            <span className="font-medium">{formatUGX(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base border-t border-border/50 pt-2 mt-2">
            <span>Total:</span>
            <span className="text-primary">{formatUGX(total)}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Payment Method</Label>
        <Select
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
        >
          <SelectTrigger className="h-11">
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

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Order"}
        </Button>
      </DialogFooter>
    </form>
  );
}
