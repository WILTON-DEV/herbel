"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";

const categories = [
  { name: "All Products", href: "/shop" },
  {
    name: "Essential Oils & Supplements",
    href: "/shop?category=essential-oils",
  },
  { name: "Teas & Beverages", href: "/shop?category=teas" },
  { name: "Capsules & Tablets", href: "/shop?category=capsules" },
  { name: "Liquids & Extracts", href: "/shop?category=liquids" },
  { name: "Creams & Serums", href: "/shop?category=skincare" },
  { name: "Health & Wellness", href: "/shop?category=wellness" },
];

export function Header() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className=" border-b  top-0 z-50  ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Account / Sign In
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full min-w-[300px] pr-10"
              />
              {/* <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <SearchIcon className="w-5 h-5" />
              </Button> */}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 text-sm hover:text-[#c9a961] transition-colors"
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
              <span>Account</span>
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#c9a961] rounded-full text-xs flex items-center justify-center text-white font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
