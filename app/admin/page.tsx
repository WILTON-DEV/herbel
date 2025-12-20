"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  DollarSignIcon,
} from "@/components/icons";
import {
  ordersApi,
  productsApi,
  customersApi,
  salesApi,
  inventoryApi,
  expensesApi,
} from "@/lib/api-client";
import type {
  Order,
  Product,
  Customer,
  SalesRecord,
  InventoryItem,
  Expense,
} from "@/lib/types";
import { formatUGX } from "@/lib/inventory";
import { useAuth } from "@/contexts/AuthContext";
import { branches } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type StatCard = {
  name: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          ordersData,
          productsData,
          customersData,
          salesData,
          inventoryData,
          expensesData,
        ] = await Promise.all([
          ordersApi.getOrders(),
          productsApi.getProducts(),
          customersApi.getCustomers(),
          salesApi.getSales(),
          inventoryApi.getInventory(),
          expensesApi.getExpenses(),
        ]);
        setOrders(ordersData);
        setProducts(productsData);
        setCustomers(customersData);
        setSales(salesData);
        setInventory(inventoryData);
        setExpenses(expensesData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Auto-refresh dashboard every 15 seconds to catch new orders and sales
    const interval = setInterval(() => {
      loadData();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Filter data by user branch if attendant
  const filteredOrders =
    user?.role === "attendant" && user.branch
      ? orders.filter((o) => o.branch === user.branch)
      : orders;

  const filteredSales =
    user?.role === "attendant" && user.branch
      ? sales.filter((s) => s.branch === user.branch)
      : sales;

  const filteredExpenses =
    user?.role === "attendant" && user.branch
      ? expenses.filter((e) => e.branch === user.branch)
      : expenses;

  // Calculate stats
  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.amount,
    0
  );
  const pendingOrders = filteredOrders.filter(
    (o) => o.status === "pending"
  ).length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );
  const lowStockCount = inventory.filter((item) => item.quantity < 10).length;

  const stats: StatCard[] = [
    {
      name: "Total Revenue",
      value: formatUGX(totalRevenue),
      change: `${filteredSales.length} sales`,
      icon: DollarSignIcon,
    },
    {
      name: "Orders",
      value: filteredOrders.length.toString(),
      change: `${pendingOrders} pending`,
      icon: ShoppingCartIcon,
    },
    {
      name: "Products",
      value: totalProducts.toString(),
      change: `${lowStockCount} low stock`,
      icon: PackageIcon,
    },
    {
      name: "Customers",
      value: totalCustomers.toString(),
      change: "Total registered",
      icon: UsersIcon,
    },
  ];

  // Get recent orders
  const recentOrders = filteredOrders.slice(0, 5);

  // Calculate branch statistics
  const branchStats = branches.map((branch) => {
    const branchOrders = orders.filter((o) => o.branch === branch.id);
    const branchSales = sales.filter((s) => s.branch === branch.id);
    const branchRevenue = branchSales.reduce((sum, s) => sum + s.amount, 0);
    const branchInventory = inventory.filter((i) => i.branch === branch.id);
    const branchStock = branchInventory.reduce((sum, i) => sum + i.quantity, 0);

    return {
      branch: branch.name,
      orders: branchOrders.length,
      revenue: branchRevenue,
      stock: branchStock,
    };
  });

  // Calculate top products by counting items in orders
  const productSales = new Map<
    string,
    { name: string; count: number; revenue: number }
  >();
  filteredOrders.forEach((order) => {
    order.items.forEach((item) => {
      const existing = productSales.get(item.productId);
      if (existing) {
        existing.count += item.quantity;
        existing.revenue += item.price * item.quantity;
      } else {
        productSales.set(item.productId, {
          name: item.productName,
          count: item.quantity,
          revenue: item.price * item.quantity,
        });
      }
    });
  });
  const topProducts = Array.from(productSales.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "cash-received":
        return "text-primary";
      case "mobile-money-received":
        return "text-accent";
      case "pending":
        return "text-muted-foreground";
      case "confirmed":
        return "text-primary";
      case "cancelled":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pending",
      confirmed: "Confirmed",
      "cash-received": "Cash (Sin)",
      "mobile-money-received": "MoMo (Mum)",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {user?.role === "attendant" && user.branch
            ? `Welcome back! Showing data for ${
                branches.find((b) => b.id === user.branch)?.name
              } branch.`
            : "Welcome back! Here's what's happening across all branches."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="border-border/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branch Performance - Only show for admins */}
      {user?.role === "admin" && (
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Branch Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Branch
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Orders
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Revenue
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Stock Items
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {branchStats.map((stat) => (
                    <tr
                      key={stat.branch}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{stat.branch}</td>
                      <td className="py-3 px-4 text-right text-sm">
                        {stat.orders}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium">
                        {formatUGX(stat.revenue)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm">
                        {stat.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Revenue
              </span>
              <span className="text-lg font-semibold text-primary">
                {formatUGX(totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Expenses
              </span>
              <span className="text-lg font-semibold text-destructive">
                {formatUGX(totalExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-sm font-medium">Net Profit</span>
              <span className="text-lg font-semibold">
                {formatUGX(totalRevenue - totalExpenses)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Low Stock Items
              </span>
              <Badge
                variant="outline"
                className="bg-destructive/10 text-destructive border-destructive/20"
              >
                {lowStockCount} items
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Products
              </span>
              <span className="text-sm font-medium">{totalProducts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Stock Units
              </span>
              <span className="text-sm font-medium">
                {inventory.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOrderDetailsOpen(true);
                    }}
                    className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0 hover:bg-muted/30 -mx-6 px-6 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} item(s) • {order.orderNumber}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs border-border/50"
                      >
                        {order.source === "website"
                          ? "🌐 Website"
                          : "🏪 Manual"}
                      </Badge>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-semibold">
                        {formatUGX(order.total)}
                      </p>
                      <p
                        className={`text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No sales data yet
                </p>
              ) : (
                topProducts.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 hover:bg-muted/30 -mx-6 px-6 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.count} sold
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatUGX(product.revenue)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
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
                    <Label className="text-muted-foreground text-xs block">
                      Payment Method
                    </Label>
                    <Badge
                      className={`${getStatusColor(
                        selectedOrder.paymentMethod
                      )}`}
                    >
                      {getStatusLabel(selectedOrder.paymentMethod)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs block">
                      Order Status
                    </Label>
                    <Badge
                      className={`${getStatusColor(selectedOrder.status)}`}
                    >
                      {getStatusLabel(selectedOrder.status)}
                    </Badge>
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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
