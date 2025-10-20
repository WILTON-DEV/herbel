import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "@/components/icons"

const orders = [
  { id: "#3210", customer: "John Doe", date: "2024-01-15", total: "$49.99", status: "Completed", items: 1 },
  { id: "#3209", customer: "Jane Smith", date: "2024-01-15", total: "$79.99", status: "Processing", items: 1 },
  { id: "#3208", customer: "Mike Johnson", date: "2024-01-14", total: "$129.99", status: "Completed", items: 3 },
  { id: "#3207", customer: "Sarah Williams", date: "2024-01-14", total: "$39.99", status: "Shipped", items: 1 },
  { id: "#3206", customer: "Tom Brown", date: "2024-01-13", total: "$44.99", status: "Completed", items: 1 },
  { id: "#3205", customer: "Emily Davis", date: "2024-01-13", total: "$159.99", status: "Processing", items: 2 },
  { id: "#3204", customer: "David Wilson", date: "2024-01-12", total: "$89.99", status: "Shipped", items: 2 },
  { id: "#3203", customer: "Lisa Anderson", date: "2024-01-12", total: "$54.99", status: "Completed", items: 1 },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a3a2e]">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Items</th>
                  <th className="text-left py-3 px-4 font-medium">Total</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.items}</td>
                    <td className="py-3 px-4 font-medium">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-green-50 text-green-700"
                            : order.status === "Processing"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
