"use client";

import Link from "next/link";
import {
  PackageIcon,
  ShoppingBagIcon,
  HeartIcon,
  SparklesIcon,
  LeafIcon,
  DropletIcon,
} from "@/components/icons";

const categories = [
  { name: "All Products", icon: PackageIcon, href: "/shop" },
  {
    name: "Essential Oils",
    icon: DropletIcon,
    href: "/shop?category=essential-oils",
  },
  { name: "CBD Products", icon: LeafIcon, href: "/shop?category=cbd" },
  { name: "Wellness", icon: HeartIcon, href: "/shop?category=wellness" },
  { name: "Skincare", icon: SparklesIcon, href: "/shop?category=skincare" },
  {
    name: "Bundles & Sets",
    icon: ShoppingBagIcon,
    href: "/shop?category=bundles",
  },
];

export function CategorySidebar() {
  return (
    <div className="bg-card rounded-2xl border border-muted shadow-sm overflow-hidden">
      <div className="bg-primary px-5 py-4 font-bold text-primary-foreground text-sm uppercase tracking-wider">
        Shop by Category
      </div>
      <nav className="py-3 px-2 space-y-1">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 transition-all group"
            >
              <Icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
