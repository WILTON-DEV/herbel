"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, LogIn, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className=" border-b  top-0 z-50  max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="p-0 w-[320px] sm:w-[360px] /95 backdrop-blur supports-[backdrop-filter]:/80"
            >
              {/* Branded header */}
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <Link
                  href="/"
                  // onClick={() => setOpen(false)}
                  aria-label="Go to home"
                >
                  <Logo variant="default" />
                </Link>
              </div>

              {/* Optional search */}
              <div className="px-4 pt-4 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products"
                    className="min-w-[200px]"
                    // no onSubmit here; wire up when ready
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-2">
                <ul className="px-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        // onClick={() => setOpen(false)}
                        className={[
                          "group flex items-center justify-between rounded-lg px-3 py-3",
                          "text-sm font-medium",
                          "transition-colors",
                          isActive(category.href)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                        ].join(" ")}
                      >
                        <span className="truncate">{category.name}</span>
                        <ChevronRight
                          className={[
                            "h-4 w-4",
                            isActive(category.href)
                              ? "text-gray-700"
                              : "text-gray-400 group-hover:text-gray-500",
                          ].join(" ")}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Divider + Account */}
                <div className="my-4 border-t" />
                <div className="px-2 pb-2">
                  <Link
                    href="/login"
                    // onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Account / Sign In</span>
                  </Link>
                </div>
              </nav>

              {/* Bottom actions (safe area) */}
              <div className="mt-2 border-t px-4 py-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
                <div className="flex gap-3">
                  <Link
                    href="/cart"
                    // onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                  <Link
                    href="/products"
                    // onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Search - Centered */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <InputGroup className="w-full max-w-lg min-w-[300px]">
              <InputGroupAddon align="inline-start">
                <Search className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupInput type="search" placeholder="Search products..." />
            </InputGroup>
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
