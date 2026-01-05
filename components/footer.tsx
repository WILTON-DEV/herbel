"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";

import { BackgroundDecoration } from "@/components/background-decoration";

export function Footer() {
  const year = 2025;

  return (
    <footer className="relative bg-gray-50 border-t border-border overflow-hidden">
      <BackgroundDecoration type="dots" position="bottom-left" opacity={0.02} />

      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 sm:mb-20">

          {/* Brand & Mission - High density */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <Link href="/" aria-label="Go to home" className="inline-block transition-opacity hover:opacity-90">
              <Logo />
            </Link>
            <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed">
              The Organic Plug UG is dedicated to crafting premium organic solutions for your botanical wellness journey. Sustainably sourced, scientifically formulated, and purely effective.
            </p>

            {/* Socials - More compact */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: TwitterIcon, label: "Twitter" },
                { icon: YoutubeIcon, label: "YouTube" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white border border-border hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center shadow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Shop
            </h3>
            <ul className="space-y-4">
              {["Best Sellers", "New Arrivals", "Flash Deals", "Bundles", "Organic Kits"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium decoration-primary/30 underline-offset-4 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Service
            </h3>
            <ul className="space-y-4">
              {["Help Center", "Order Tracking", "Delivery Info", "Returns Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium decoration-primary/30 underline-offset-4 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - More clinical & professional */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Stay Connected</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Join 5,000+ wellness seekers receiving exclusive botanical insights.
            </p>

            <form
              className="group"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex items-center bg-white border border-border rounded-xl p-1.5 shadow-sm focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                <Input
                  type="email"
                  inputMode="email"
                  placeholder="Enter your email"
                  className="h-9 border-none bg-transparent text-[13px] placeholder:text-muted-foreground/50 focus-visible:ring-0 shadow-none px-4 flex-1"
                  aria-label="Email address"
                  required
                />
                <Button
                  type="submit"
                  className="h-9 px-5 bg-primary hover:bg-primary/95 text-white text-[11px] font-bold rounded-lg shadow-md shadow-primary/10 transition-all active:scale-95 shrink-0"
                >
                  Join
                </Button>
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground/60 italic">
                Sustainably focused. No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Ultra clean */}
        <div className="pt-10 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
          <p>© {year} THE ORGANIC PLUG UG. CRAFTED FOR WELLNESS.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
