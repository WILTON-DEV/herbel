import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, PhoneIcon } from "@/components/icons";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#4CAF50] mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-base lg:text-lg text-gray-700 mb-8">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          {/* Important Message */}
          <div className="bg-[#fff4e6] border-2 border-[#c9a961] rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <PhoneIcon className="w-6 h-6 text-[#c9a961]" />
              <h2 className="text-lg font-bold text-[#4CAF50]">Next Steps</h2>
            </div>
            <p className="text-gray-700 text-left">
              <strong>We will contact you soon</strong> via phone to confirm
              your order details and arrange delivery/pickup. Please keep your
              phone nearby.
            </p>
            <div className="mt-4 pt-4 border-t border-[#c9a961]/30">
              <p className="text-sm text-gray-600 text-left">
                Order Number:{" "}
                <span className="font-mono font-semibold text-[#4CAF50]">
                  #ORD-{Math.floor(Math.random() * 100000)}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 lg:p-8 mb-8 text-left">
            <h3 className="font-semibold text-[#4CAF50] mb-4">
              What happens next?
            </h3>
            <div className="space-y-3 text-sm lg:text-base text-gray-700">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <p>We'll call you within 24 hours to confirm your order</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <p>If you selected delivery, we'll arrange a convenient time</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <p>Your products will be prepared and ready</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/orders">
              <Button className="bg-[#1a3a2e] hover:bg-[#0f2419] text-white px-8 py-6">
                View Orders
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="outline"
                className="border-2 border-[#1a3a2e] text-[#4CAF50] px-8 py-6 bg-white hover:bg-[#f5f1e8]"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>
              Questions? Call us at{" "}
              <a
                href="tel:+256200804020"
                className="text-[#c9a961] font-semibold"
              >
                0200 804 020
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
