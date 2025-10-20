"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { totalItems } = useCart();

  return (
    <>
      <div className="bg-accent text-accent-foreground py-2">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between text-sm">
          <div>Welcome to The Organic Plug UG</div>
          <div className="flex items-center gap-4">
            <span>Call For Deals: 0200 804 020</span>
          </div>
        </div>
      </div>

      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-accent" />
              </div>
              <span className="text-xl font-bold text-primary">
                The Organic Plug UG
              </span>
            </Link>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products, brands and categories"
                  className="w-full pl-4 pr-12 py-6 rounded-md border-2 border-input focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <Button className="absolute right-0 top-0 h-full px-6 bg-accent text-accent-foreground hover:bg-accent/90 rounded-l-none transition-colors">
                  <SearchIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/admin"
                className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <div>
                  <div className="text-xs text-muted-foreground">Admin</div>
                  <div className="font-semibold">Dashboard</div>
                </div>
              </Link>

              <Link
                href="/login"
                className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <div className="text-xs text-muted-foreground">Account</div>
                  <div className="font-semibold">Sign In</div>
                </div>
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="relative">
                  <ShoppingCartIcon className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full text-xs flex items-center justify-center text-white font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block">
                  <div className="text-xs text-muted-foreground">Cart</div>
                  <div className="font-semibold">{totalItems} items</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
