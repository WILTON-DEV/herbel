import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <div className="container mx-auto px-4 lg:px-8 py-6 sm:py-12 lg:py-16 ">
        <div className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4CAF50] mb-2 sm:mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
            Your order has been received and is being processed.
          </p>

          {/* Important Message */}
          <div className="bg-[#fff4e6] border-2 border-[#c9a961] rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a961]" />
              <h2 className="text-base sm:text-lg font-bold text-[#4CAF50]">
                Next Steps
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 text-left">
              <strong>We will contact you</strong> via phone to confirm your
              order and arrange delivery/pickup.
            </p>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#c9a961]/30">
              <p className="text-xs sm:text-sm text-gray-600 text-left">
                Order Number:{" "}
                <span className="font-mono font-semibold text-[#4CAF50]">
                  #ORD-{Math.floor(Math.random() * 100000)}
                </span>
              </p>
            </div>
          </div>

          <div className="/50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-left">
            <h3 className="text-sm sm:text-base font-semibold text-[#4CAF50] mb-3 sm:mb-4">
              What happens next?
            </h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  1
                </div>
                <p>We'll call you within 24 hours to confirm</p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  2
                </div>
                <p>We'll arrange delivery/pickup time</p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#c9a961] text-white rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                  3
                </div>
                <p>Your products will be ready</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Link href="/account/orders" className="w-full sm:w-auto">
              <Button className="w-full bg-primary hover:bg-primary text-white px-6 py-2.5 sm:py-3 text-sm sm:text-base">
                View Orders
              </Button>
            </Link>
            <Link href="/shop" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-2 border-[#1a3a2e] text-[#4CAF50] px-6 py-2.5 sm:py-3 hover:bg-[#f5f1e8] text-sm sm:text-base"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
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
    </div>
  );
}
