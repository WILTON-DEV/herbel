"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export function CollectionShowcase() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Large Featured Collection */}
          <Link href="/shop?collection=signature" className="group">
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-primary">
              <Image
                src="/amber-essential-oil-dropper-bottle.jpg"
                alt="Signature Collection"
                fill
                className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block bg-[#c9a961] px-4 py-1 rounded-full text-sm font-medium mb-4">
                  New Collection
                </span>
                <h3 className="text-3xl font-bold mb-2">Signature Series</h3>
                <p className="text-gray-300 mb-4">
                  Premium essential oils for discerning customers
                </p>
                <Button className=" text-[#1a3a2e] hover:bg-gray-100">
                  Explore Collection
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Link>

          {/* Two Smaller Collections */}
          <div className="space-y-8">
            <Link href="/shop?collection=wellness" className="group block">
              <div className="relative h-[240px] rounded-3xl overflow-hidden ">
                <Image
                  src="/green-essential-oil-dropper-bottle.jpg"
                  alt="Wellness Collection"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a2e]/90 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Wellness Blends</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Holistic health solutions
                  </p>
                  <div className="flex items-center text-[#c9a961] font-medium">
                    Shop Now <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/shop?collection=aromatherapy" className="group block">
              <div className="relative h-[240px] rounded-3xl overflow-hidden ">
                <Image
                  src="/yellow-essential-oil-dropper-bottle.jpg"
                  alt="Aromatherapy Collection"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a2e]/90 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Aromatherapy</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Scents for every mood
                  </p>
                  <div className="flex items-center text-[#c9a961] font-medium">
                    Shop Now <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
