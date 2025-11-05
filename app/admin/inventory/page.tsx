"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MinusIcon, PackageIcon } from "@/components/icons";
import { useState } from "react";
import { inventory, formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";
import Image from "next/image";

type InventoryStock = {
  productId: string;
  productName: string;
  branch: string;
  quantity: number;
  lastUpdated: Date;
};

// Mock initial inventory data
const initialInventory: InventoryStock[] = inventory.flatMap((product) =>
  branches.map((branch) => ({
    productId: product.id,
    productName: product.name,
    branch: branch.id,
    quantity: product.stockQuantity || 0,
    lastUpdated: new Date(),
  }))
);

export default function InventoryPage() {
  const [inventoryStock, setInventoryStock] =
    useState<InventoryStock[]>(initialInventory);
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterProduct, setFilterProduct] = useState<string>("");
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<InventoryStock | null>(
    null
  );

  const handleAdjustStock = (
    productId: string,
    branch: string,
    adjustment: number
  ) => {
    setInventoryStock((prev) =>
      prev.map((stock) =>
        stock.productId === productId && stock.branch === branch
          ? {
              ...stock,
              quantity: Math.max(0, stock.quantity + adjustment),
              lastUpdated: new Date(),
            }
          : stock
      )
    );
  };

  const filteredInventory = inventoryStock.filter((stock) => {
    if (filterBranch !== "all" && stock.branch !== filterBranch) return false;
    if (
      filterProduct &&
      !stock.productName.toLowerCase().includes(filterProduct.toLowerCase())
    )
      return false;
    return true;
  });

  // Group by product for better display
  const groupedInventory = filteredInventory.reduce(
    (acc, stock) => {
      if (!acc[stock.productId]) {
        acc[stock.productId] = {
          productName: stock.productName,
          product: inventory.find((p) => p.id === stock.productId)!,
          stocks: [],
        };
      }
      acc[stock.productId].stocks.push(stock);
      return acc;
    },
    {} as Record<
      string,
      {
        productName: string;
        product: (typeof inventory)[0];
        stocks: InventoryStock[];
      }
    >
  );

  const getTotalStock = (productId: string) => {
    return inventoryStock
      .filter((s) => s.productId === productId)
      .reduce((sum, s) => sum + s.quantity, 0);
  };

  const getLowStockCount = () => {
    const productStocks = Object.values(groupedInventory);
    return productStocks.filter((item) => {
      const total = item.stocks.reduce((sum, s) => sum + s.quantity, 0);
      return total < 10;
    }).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Inventory</h1>
          <p className="text-muted-foreground">
            Track product stock across all branches
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1a3a2e]">
              {inventory.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {getLowStockCount()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Below 10 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Filter Branch
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Search Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Product name..."
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Stock Levels ({Object.keys(groupedInventory).length} products)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(groupedInventory).map(
              ([productId, { productName, product, stocks }]) => {
                const totalStock = getTotalStock(productId);
                const price =
                  product.priceUGX ?? product.priceOptionsUGX?.[0] ?? 0;

                return (
                  <div
                    key={productId}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={productName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {productName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {formatUGX(price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#1a3a2e]">
                              {totalStock}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Total Stock
                            </p>
                            {totalStock < 10 && (
                              <Badge
                                variant="outline"
                                className="bg-orange-50 text-orange-700 mt-1"
                              >
                                Low Stock
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {stocks.map((stock) => (
                            <div
                              key={`${stock.productId}-${stock.branch}`}
                              className=" border rounded p-3"
                            >
                              <div className="text-xs text-muted-foreground mb-1">
                                {branches.find((b) => b.id === stock.branch)
                                  ?.name || stock.branch}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">
                                  {stock.quantity}
                                </span>
                                <div className="flex gap-1">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() =>
                                      handleAdjustStock(
                                        stock.productId,
                                        stock.branch,
                                        -1
                                      )
                                    }
                                  >
                                    <MinusIcon className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() =>
                                      handleAdjustStock(
                                        stock.productId,
                                        stock.branch,
                                        1
                                      )
                                    }
                                  >
                                    <PlusIcon className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">
            ℹ️ Automatic Inventory Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800">
          <p>
            <strong>Note:</strong> Inventory is automatically reduced when
            orders are marked as "Cash Received (Sin)" or "Mobile Money Received
            (Mum)" in the Orders page. This ensures accurate stock tracking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
