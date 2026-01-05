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
import { useAuth } from "@/lib/hooks/useAuth";
import { useCart } from "@/lib/hooks/useCart";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, LogIn, Menu, Search, X, User, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { usePathname, useRouter } from "next/navigation";


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
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-12 sm:h-14 lg:h-16 items-center justify-between gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 -ml-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="p-0 w-[320px] sm:w-[360px] bg-background/95 backdrop-blur-lg"
            >
              {/* Branded header */}
              <div className="flex items-center justify-between px-6 py-6 border-b">
                <Link
                  href="/"
                  aria-label="Go to home"
                >
                  <Logo />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              {/* Optional search */}
              <div className="px-6 pt-6 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 h-11 bg-muted/50 border-transparent focus:bg-background transition-all"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-4 px-3">
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className={[
                          "group flex items-center justify-between rounded-xl px-4 py-3.5",
                          "text-sm font-medium transition-all",
                          isActive(category.href)
                            ? "bg-primary/5 text-primary"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground",
                        ].join(" ")}
                      >
                        <span className="truncate">{category.name}</span>
                        <ChevronRight
                          className={[
                            "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                            isActive(category.href)
                              ? "text-primary"
                              : "text-muted-foreground",
                          ].join(" ")}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Divider + Account */}
                <div className="my-6 border-t border-muted" />
                <div className="space-y-1">
                  {mounted && user ? (
                    <>
                      <div className="px-4 py-3 mb-2 bg-muted/30 rounded-xl">
                        <p className="text-sm font-semibold text-foreground">{user.name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account/orders"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all"
                      >
                        <User className="h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Account / Sign In</span>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Bottom actions */}
              <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-6 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
                <div className="flex gap-3">
                  <Link href="/cart" className="flex-1">
                    <Button variant="outline" className="w-full h-11 rounded-xl">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/shop" className="flex-1">
                    <Button className="w-full h-11 rounded-xl shadow-lg shadow-primary/20">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <Logo />
          </Link>

          {/* Desktop Search - Centered */}
          <div className="hidden lg:flex flex-1 justify-center items-center px-8 lg:px-12">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Search premium botanicals..."
                className="pl-9 h-9 bg-muted/30 border-transparent rounded-xl focus:bg-background focus:ring-primary/5 transition-all text-[12px]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 font-medium">
            {mounted && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden lg:flex items-center gap-2 text-sm rounded-full px-4 hover:bg-primary/5 hover:text-primary transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span className="max-w-[100px] truncate">{user.name || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-muted shadow-xl">
                  <DropdownMenuLabel className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="font-bold text-foreground">{user.name || "User"}</p>
                      <p className="text-xs text-muted-foreground font-normal truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="mx-2" />
                  <DropdownMenuItem asChild className="rounded-xl px-4 py-2.5 cursor-pointer">
                    <Link href="/account/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="mx-2" />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl px-4 py-2.5 text-destructive focus:bg-destructive/5 focus:text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-2 text-sm rounded-full px-5 py-2 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full hover:bg-primary/5 hover:text-primary transition-all"
                aria-label="Shopping cart"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-in zoom-in-50">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - Outside the header row */}
        <div className="lg:hidden pb-3 px-1">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-9 h-9 bg-muted/40 border-transparent rounded-lg focus:bg-background transition-all text-xs"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
