"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    // Admin pages don't need storefront header/footer
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

