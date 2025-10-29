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
} from "@/components/icons";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboardIcon },
  { name: "Products", href: "/admin/products", icon: PackageIcon },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCartIcon },
  { name: "Customers", href: "/admin/customers", icon: UsersIcon },
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
        "fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white transform transition-transform duration-200 md:static md:translate-x-0 md:flex md:flex-col",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-[#d4a574] flex items-center justify-center">
            <span className="text-[#1a3a2e] font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-lg">Admin Panel</span>
        </Link>
        <button
          className="ml-auto md:hidden text-white/70 hover:text-white"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#d4a574] text-[#1a3a2e]"
                  : "text-white/80 hover:/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:/10 hover:text-white transition-colors"
        >
          <span>← Back to Website</span>
        </Link>
      </div>
    </div>
  );
}
