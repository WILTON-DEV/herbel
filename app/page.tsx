import { Header } from "@/components/header";
import { CategorySidebar } from "@/components/category-sidebar";
import { PromoHero } from "@/components/promo-hero";
import { QuickLinks } from "@/components/quick-links";
import { FlashDeals } from "@/components/flash-deals";
import { DealsGrid } from "@/components/deals-grid";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background bg-pattern-organic">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="lg:col-span-2">
            <CategorySidebar />
          </div>

          <div className="lg:col-span-8 ">
            <PromoHero />
          </div>

          <div className="lg:col-span-2">
            <QuickLinks />
          </div>
        </div>

        <div className="mt-6">
          <FlashDeals />
        </div>

        <div className="mt-6">
          <DealsGrid />
        </div>
      </div>

      <Footer />
    </main>
  );
}
