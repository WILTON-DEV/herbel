"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Image from "next/image";
import Link from "next/link";

function AuthLayout({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname?.startsWith("/auth")) {
      const timer = setTimeout(() => {
        router.replace("/");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Brand Imagery & Branding (Desktop) */}
      <div className="relative hidden lg:block overflow-hidden bg-[#1a3a2e]">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/botanical-ingredients-and-essential-oil.jpg"
            alt="Botanical Ingredients"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2e] via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder-logo.svg"
              alt="Herbel Logo"
              width={40}
              height={40}
              className="brightness-200"
            />
            <span className="text-2xl font-bold tracking-tight">The Organic Plug</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-light leading-tight">
              Nature’s <span className="font-semibold italic text-[#4CAF50]">Purity</span>,
              <br />Bottled for Your Wellness.
            </h1>
            <p className="text-lg text-gray-300">
              Join our community of natural wellness enthusiasts and discover the power of premium, organic essential oils.
            </p>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} The Organic Plug UG. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full space-y-8">
          {/* Mobile Logo */}
          <div className="flex justify-center lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/placeholder-logo.svg"
                alt="Herbel Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-[#1a3a2e]">The Organic Plug</span>
            </Link>
          </div>

          <div className="shadow-sm max-w-[350px] mx-auto  ring-1 ring-gray-100 sm:rounded-2xl lg:p-0 lg:shadow-none lg:ring-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
