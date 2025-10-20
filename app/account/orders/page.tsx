import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-12345",
      date: "Dec 15, 2024",
      total: 79.97,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-12344",
      date: "Dec 10, 2024",
      total: 54.98,
      status: "In Transit",
      items: 2,
    },
    {
      id: "ORD-12343",
      date: "Dec 5, 2024",
      total: 24.99,
      status: "Delivered",
      items: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1a3a2e] mb-12">My Orders</h1>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order {order.id}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#1a3a2e]">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{order.items} items</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <Button variant="outline" className="border-[#1a3a2e] text-[#1a3a2e] bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
