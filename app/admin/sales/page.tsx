"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import type { SalesRecord, Order } from "@/lib/types";
import { salesApi, ordersApi } from "@/lib/mockApi";
import { formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";
import { StoreIcon, TruckIcon } from "@/components/icons";

export default function SalesPage() {
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filterDate]);

  const loadData = async () => {
    try {
      // Calculate date range based on filter
      let dateFrom: Date | undefined;
      const now = new Date();

      if (filterDate === "today") {
        dateFrom = new Date(now.setHours(0, 0, 0, 0));
      } else if (filterDate === "week") {
        dateFrom = new Date(now.setDate(now.getDate() - 7));
      } else if (filterDate === "month") {
        dateFrom = new Date(now.setMonth(now.getMonth() - 1));
      }

      const [salesData, ordersData] = await Promise.all([
        salesApi.getSales({
          dateFrom,
        }),
        ordersApi.getOrders(),
      ]);

      setSalesRecords(salesData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Failed to load sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = salesRecords.filter((sale) => {
    if (filterBranch !== "all" && sale.branch !== filterBranch) return false;
    return true;
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);

  const cashReceived = filteredSales
    .filter((s) => s.status === "cash-received")
    .reduce((sum, s) => sum + s.amount, 0);

  const mobileMoneyReceived = filteredSales
    .filter((s) => s.status === "mobile-money-sent")
    .reduce((sum, s) => sum + s.amount, 0);

  // Group sales by branch
  const salesByBranch = branches.map((branch) => {
    const branchSales = filteredSales.filter((s) => s.branch === branch.id);
    const total = branchSales.reduce((sum, s) => sum + s.amount, 0);
    const cash = branchSales
      .filter((s) => s.status === "cash-received")
      .reduce((sum, s) => sum + s.amount, 0);
    const momo = branchSales
      .filter((s) => s.status === "mobile-money-sent")
      .reduce((sum, s) => sum + s.amount, 0);

    return {
      branch,
      total,
      cash,
      momo,
      count: branchSales.length,
    };
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#1a3a2e]">Sales Records</h1>
        <p className="text-muted-foreground">Loading sales data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Sales Records</h1>
          <p className="text-muted-foreground">
            Track daily sales by branch with payment details
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>Date Range</Label>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {formatUGX(totalSales)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredSales.length} sale(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cash Received (Sin)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-primary">
              {formatUGX(cashReceived)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">At shop</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mobile Money (Mum)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-accent">
              {formatUGX(mobileMoneyReceived)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Sent to boss</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Branch */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Sales by Branch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesByBranch.map((item) => (
              <div
                key={item.branch.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.branch.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.count} sale(s)
                    </p>
                  </div>
                  <div className="text-right">
            <div className="text-2xl font-semibold tracking-tight">
                      {formatUGX(item.total)}
                    </div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1 font-medium">
                      Cash (Sin)
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      {formatUGX(item.cash)}
                    </div>
                  </div>
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1 font-medium">
                      MoMo (Mum)
                    </div>
                    <div className="text-lg font-semibold text-accent">
                      {formatUGX(item.momo)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Sales Records */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Detailed Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Order #
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Branch</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Payment</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Recorded By
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      No sales records found
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => {
                    const order = orders.find((o) => o.id === sale.orderId);
                  return (
                    <tr key={sale.id} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {sale.date.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {order?.orderNumber || sale.orderId}
                      </td>
                      <td className="py-3 px-4">
                        {branches.find((b) => b.id === sale.branch)?.name ||
                          sale.branch}
                      </td>
                      <td className="py-3 px-4">
                        {sale.deliveryMethod === "pickup" ? (
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
                      <td className="py-3 px-4 font-medium">
                        {formatUGX(sale.amount)}
                      </td>
                      <td className="py-3 px-4">
                        {sale.status === "cash-received" ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            Cash (Sin)
                          </Badge>
                        ) : sale.status === "mobile-money-sent" ? (
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                            MoMo (Mum)
                          </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-muted text-muted-foreground">
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {sale.recordedBy}
                      </td>
                    </tr>
                  );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-muted/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span className="text-lg">ℹ️</span>
            How Sales Recording Works
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Sin (Cash Received):</strong> Payment collected as cash at
            the shop. Cash is held at the branch.
          </p>
          <p>
            <strong>Mum (Mobile Money):</strong> Payment sent directly to the
            boss via mobile money transfer.
          </p>
          <p>
            <strong>Recording:</strong> Sales are automatically recorded when
            orders are marked as paid in the Orders page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
