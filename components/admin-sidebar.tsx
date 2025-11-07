"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  BarChartIcon,
  SettingsIcon,
  FileTextIcon,
  TagIcon,
  DollarSignIcon,
} from "@/components/icons";
import { Package, Receipt, X, UserCog } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboardIcon },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCartIcon },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Products", href: "/admin/products", icon: PackageIcon },
  { name: "Sales Records", href: "/admin/sales", icon: Receipt },
  { name: "Expenses", href: "/admin/expenses", icon: DollarSignIcon },
  { name: "Customers", href: "/admin/customers", icon: UsersIcon },
  { name: "Users", href: "/admin/users", icon: UserCog },
  { name: "Analytics", href: "/admin/analytics", icon: BarChartIcon },
  { name: "Categories", href: "/admin/categories", icon: TagIcon },
  { name: "Reviews", href: "/admin/reviews", icon: FileTextIcon },
  { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export function AdminSidebar({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:flex md:flex-col",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-semibold text-sm">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-sidebar-foreground">Herbel</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </Link>
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-sidebar-accent"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
        >
          <span>← Back to Website</span>
        </Link>
      </div>
    </div>
  );
}
