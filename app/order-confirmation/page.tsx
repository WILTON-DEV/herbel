import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from "@/components/icons"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-[#1a3a2e] mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-white rounded-2xl p-8 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-2xl font-bold text-[#1a3a2e] mb-6">#ORD-{Math.floor(Math.random() * 100000)}</p>
            <p className="text-gray-700">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/account/orders">
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8">View Orders</Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="border-[#1a3a2e] text-[#1a3a2e] px-8 bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
