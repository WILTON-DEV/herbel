import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ConditionalLayout } from "@/components/conditional-layout";
import { AuthUIProvider, ReduxProvider } from "@/components/providers";
import { AuthSyncProvider } from "@/components/auth/AuthSyncProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Organic Plug UG | Premium Essential Oils",
  description:
    "Natural, organic wellness products crafted with purity and care.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-foreground" cz-shortcut-listen="true">
        <ReduxProvider>
          <AuthUIProvider>
            <AuthSyncProvider>
              <Suspense>
                <ConditionalLayout>{children}</ConditionalLayout>
              </Suspense>
            </AuthSyncProvider>
          </AuthUIProvider>
        </ReduxProvider>

      </body>
    </html>
  );
}
