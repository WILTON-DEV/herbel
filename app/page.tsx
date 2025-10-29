import { Header } from "@/components/header";
import { CategorySidebar } from "@/components/category-sidebar";
import { PromoHero } from "@/components/promo-hero";
import { PromoBanner } from "@/components/promo-banner";
import { QuickLinks } from "@/components/quick-links";
import { FlashDeals } from "@/components/flash-deals";
import { DealsGrid } from "@/components/deals-grid";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { inventory } from "@/lib/inventory";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Header />

      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-3 lg:py-6">
        {/* Desktop: Grid with sidebars, Mobile: Full width hero only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="hidden lg:block lg:col-span-2">
            <CategorySidebar />
          </div>

          <div className="lg:col-span-10">
            <PromoHero />
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="mt-6">
          <FlashDeals />
        </div>

        {/* Promo Banner 1 */}
        <div className="mt-6">
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
        <div className="mt-6">
          <div className=" rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-bold">
                🔥 Top Selling Products
              </h2>
              <a href="/shop" className="text-sm hover:underline">
                See All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 p-3 sm:p-6">
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
        <div className="mt-6">
          <PromoBanner
            title="Limited Time"
            subtitle="Shop & Win Big!"
            description="Spend over UGX 100,000 and get a chance to win amazing prizes"
            price="From UGX 30,000"
            ctaText="Learn More"
            ctaLink="/shop"
            bgColor="bg-gradient-to-r from-purple-600 to-pink-600"
            image="/essential-oil-bottles-with-botanical-ingredients-a.jpg"
          />
        </div>

        {/* Deals Grid */}
        <div className="mt-6">
          <DealsGrid />
        </div>

        {/* New Arrivals */}
        <div className="mt-6">
          <div className=" rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#c9a961] text-white px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-bold">✨ New Arrivals</h2>
              <a href="/shop" className="text-sm hover:underline">
                See All →
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 p-3 sm:p-6">
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

      <Footer />
    </main>
  );
}
