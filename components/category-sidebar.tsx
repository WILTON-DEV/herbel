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
    <div className=" overflow-hidden">
      <div className="bg-primary/10 text-primary px-4 py-3 font-semibold">
        Shop by Category
      </div>
      <nav className="py-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors group"
            >
              <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
