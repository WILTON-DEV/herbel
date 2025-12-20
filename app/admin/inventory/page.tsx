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
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MinusIcon } from "@/components/icons";
import { useState, useEffect } from "react";
import { inventoryApi, productsApi } from "@/lib/api-client";
import type { InventoryItem, Product } from "@/lib/types";
import { formatUGX } from "@/lib/inventory";
import { branches } from "@/lib/types";
import Image from "next/image";

export default function InventoryPage() {
  const [inventoryStock, setInventoryStock] = useState<InventoryItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [filterProduct, setFilterProduct] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [inventoryData, productsData] = await Promise.all([
        inventoryApi.getInventory(),
        productsApi.getProducts(),
      ]);
      setInventoryStock(inventoryData);
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to load inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustStock = async (
    productId: string,
    branch: string,
    adjustment: number
  ) => {
    try {
      const updated = await inventoryApi.adjustInventory(
        productId,
        branch,
        adjustment
      );
    setInventoryStock((prev) =>
      prev.map((stock) =>
        stock.productId === productId && stock.branch === branch
            ? updated
          : stock
      )
    );
    } catch (error) {
      console.error("Failed to adjust inventory:", error);
      alert("Failed to adjust inventory. Please try again.");
    }
  };

  const filteredInventory = inventoryStock.filter((stock) => {
    if (filterBranch !== "all" && stock.branch !== filterBranch) return false;
    const product = products.find((p) => p.id === stock.productId);
    if (
      filterProduct &&
      !product?.name.toLowerCase().includes(filterProduct.toLowerCase())
    )
      return false;
    return true;
  });

  // Group by product for better display
  const groupedInventory = filteredInventory.reduce(
    (acc, stock) => {
      if (!acc[stock.productId]) {
        const product = products.find((p) => p.id === stock.productId);
        if (!product) return acc;

        acc[stock.productId] = {
          productName: product.name,
          product,
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
        product: Product;
        stocks: InventoryItem[];
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

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#1a3a2e]">Inventory</h1>
        <p className="text-muted-foreground">Loading inventory data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Track product stock across all branches
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {products.length}
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
            <div className="text-2xl font-semibold tracking-tight text-destructive">
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
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Stock Levels ({Object.keys(groupedInventory).length} products)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.keys(groupedInventory).length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No products found matching your filters
              </p>
            ) : (
              Object.entries(groupedInventory).map(
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
                            <div className="text-2xl font-semibold tracking-tight">
                              {totalStock}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Total Stock
                            </p>
                            {totalStock < 10 && (
                              <Badge
                                variant="outline"
                                className="bg-destructive/10 text-destructive border-destructive/20 mt-1"
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
                                className="border rounded p-3"
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
                                      disabled={stock.quantity === 0}
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
              )
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span className="text-lg">ℹ️</span>
            Automatic Inventory Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
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
