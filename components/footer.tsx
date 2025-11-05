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

export function Footer() {
  // No client-only branching, no random, no dates => hydration-safe
  const year = 2025; // keep static or pass as prop to avoid Date() at render

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-12">
          {/* Company */}
          <div className="space-y-4">
            <Link href="/" aria-label="Go to home">
              <Logo variant="white" />
            </Link>
            <p className="text-white/75 text-sm leading-relaxed mt-2">
              Premium organic products for your wellness journey. Pure, natural,
              and effective.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full /10 hover:bg-[#c9a961] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full /10 hover:bg-[#c9a961] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="w-11 h-11 rounded-full /10 hover:bg-[#c9a961] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full /10 hover:bg-[#c9a961] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <YoutubeIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {/* Quick Links */}
            <nav className="space-y-4" aria-label="Quick Links">
              <h3 className="text-base sm:text-lg font-semibold">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Support */}
            <nav className="space-y-4" aria-label="Support">
              <h3 className="text-base sm:text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-[#c9a961] text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Newsletter</h3>
            <p className="text-white/75 text-sm">
              Subscribe to get special offers and updates
            </p>

            {/* Stack on mobile, row on >=sm */}
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                inputMode="email"
                placeholder="Your email"
                className="/10 border-white/20 text-white placeholder:text-white/60 w-full"
                aria-label="Email address"
                required
              />
              <Button
                type="submit"
                className="bg-[#c9a961] hover:bg-[#b89851] text-white w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 text-center text-white/70 text-xs sm:text-sm">
          <p className="px-4">
            © {year} The Organic Plug UG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
