"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isAuthPage = pathname?.startsWith("/auth") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-email" ||
    pathname?.startsWith("/admin/auth");

  if (isAdminPage || isAuthPage) {
    // Admin and Auth pages don't need storefront header/footer
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto">{children}</div>
      <Footer />
    </>
  );
}

