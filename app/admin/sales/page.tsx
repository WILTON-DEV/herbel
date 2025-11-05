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
import { useState } from "react";
import type { SalesRecord } from "@/lib/types";
import { mockSalesRecords, mockOrders } from "@/lib/mock-data";
import { formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";
import { StoreIcon, TruckIcon } from "@/components/icons";

export default function SalesPage() {
  const [salesRecords] = useState<SalesRecord[]>(mockSalesRecords);
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("today");

  const filteredSales = salesRecords.filter((sale) => {
    if (filterBranch !== "all" && sale.branch !== filterBranch) return false;
    // Date filtering logic would go here
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Sales Records</h1>
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
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1a3a2e]">
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
            <div className="text-2xl font-bold text-green-600">
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
            <div className="text-2xl font-bold text-purple-600">
              {formatUGX(mobileMoneyReceived)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Sent to boss</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Branch */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Branch</CardTitle>
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
                    <div className="text-2xl font-bold text-[#1a3a2e]">
                      {formatUGX(item.total)}
                    </div>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <div className="text-xs text-green-700 mb-1">
                      Cash (Sin)
                    </div>
                    <div className="text-lg font-semibold text-green-900">
                      {formatUGX(item.cash)}
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded p-3">
                    <div className="text-xs text-purple-700 mb-1">
                      MoMo (Mum)
                    </div>
                    <div className="text-lg font-semibold text-purple-900">
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
      <Card>
        <CardHeader>
          <CardTitle>Detailed Sales Records</CardTitle>
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
                {filteredSales.map((sale) => {
                  const order = mockOrders.find((o) => o.id === sale.orderId);
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
                          <Badge className="bg-green-100 text-green-800">
                            Cash (Sin)
                          </Badge>
                        ) : sale.status === "mobile-money-sent" ? (
                          <Badge className="bg-purple-100 text-purple-800">
                            MoMo (Mum)
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {sale.recordedBy}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">
            ℹ️ How Sales Recording Works
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
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

