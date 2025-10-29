import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/">
              <Logo variant="white" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mt-4">
              Premium organic products for your wellness journey. Pure, natural,
              and effective.
            </p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9a961] flex items-center justify-center transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9a961] flex items-center justify-center transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9a961] flex items-center justify-center transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9a961] flex items-center justify-center transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-[#c9a961] text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-white/70 text-sm">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white flex-shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>© 2025 The Organic Plug UG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
