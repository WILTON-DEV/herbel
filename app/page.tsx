import { Header } from "@/components/header";
import { CategorySidebar } from "@/components/category-sidebar";
import { PromoHero } from "@/components/promo-hero";
import { PromoBanner } from "@/components/promo-banner";
import { FlashDeals } from "@/components/flash-deals";
import { DealsGrid } from "@/components/deals-grid";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { inventory } from "@/lib/inventory";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-2 sm:py-3 lg:py-5 px-2 sm:px-3 lg:px-4 ">
        {/* Desktop: Grid with sidebars, Mobile: Full width hero only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-5">
          <div className="hidden lg:block lg:col-span-2">
            <CategorySidebar />
          </div>

          <div className="lg:col-span-8">
            <PromoHero />
          </div>

          <div className="lg:col-span-2 relative bg-primary">
            <Image
              src="https://res.cloudinary.com/dkz73xkbr/image/upload/v1761716224/freepik__create-a-bright-modern-and-highenergy-ecommerce-ad__86227_l895hl.png"
              alt="adds images"
              className="object-center object-contain"
              fill
            />
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <FlashDeals />
        </div>

        {/* Promo Banner 1 */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <PromoBanner
            title="Special Offers"
            subtitle="Wellness Collection"
            description="Natural supplements for your health journey"
            price="UGX 249,999"
            oldPrice="UGX 350,000"
            discount="30% OFF"
            image="/premium-essential-oil-bottle-and-packaging-box-gold.jpg"
            ctaText="Shop Now"
            ctaLink="/shop"
          />
        </div>

        {/* Top Selling Products */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <div className=" rounded-lg overflow-hidden border">
            <div className="bg-primary text-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 flex items-center justify-between">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold">
                🔥 Top Selling
              </h2>
              <a href="/shop" className="text-xs sm:text-sm hover:underline">
                See All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4">
              {inventory.slice(0, 6).map((item) => {
                const price = item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0;
                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={price}
                    image={item.image || "/placeholder.svg"}
                    rating={4.8}
                    reviews={Math.floor(Math.random() * 200) + 100}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Promo Banner 2 */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <PromoBanner
            title="Limited Time"
            subtitle="Shop & Win Big!"
            description="Spend over UGX 100,000 and win prizes"
            price="From UGX 30,000"
            ctaText="Learn More"
            ctaLink="/shop"
            bgColor="bg-gradient-to-r from-purple-600 to-pink-600"
            image="/essential-oil-bottles-with-botanical-ingredients-a.jpg"
          />
        </div>

        {/* Deals Grid */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <DealsGrid />
        </div>

        {/* New Arrivals */}
        <div className="mt-3 sm:mt-4 lg:mt-5">
          <div className=" rounded-lg overflow-hidden border">
            <div className="bg-[#c9a961] text-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 flex items-center justify-between">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold">
                ✨ New Arrivals
              </h2>
              <a href="/shop" className="text-xs sm:text-sm hover:underline">
                See All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4">
              {inventory.slice(12, 18).map((item) => {
                const price = item.priceUGX ?? item.priceOptionsUGX?.[0] ?? 0;
                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={price}
                    image={item.image || "/placeholder.svg"}
                    rating={4.6}
                    reviews={Math.floor(Math.random() * 50) + 20}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
