import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSignIcon, ShoppingCartIcon, UsersIcon, PackageIcon } from "@/components/icons"

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSignIcon,
  },
  {
    name: "Orders",
    value: "2,350",
    change: "+180 from last month",
    icon: ShoppingCartIcon,
  },
  {
    name: "Customers",
    value: "1,234",
    change: "+19% from last month",
    icon: UsersIcon,
  },
  {
    name: "Products",
    value: "89",
    change: "+4 new this month",
    icon: PackageIcon,
  },
]

const recentOrders = [
  { id: "#3210", customer: "John Doe", product: "Pure Essence Oil", amount: "$49.99", status: "Completed" },
  { id: "#3209", customer: "Jane Smith", product: "CBD Dropper 30ml", amount: "$79.99", status: "Processing" },
  { id: "#3208", customer: "Mike Johnson", product: "Essential Oil Set", amount: "$129.99", status: "Completed" },
  { id: "#3207", customer: "Sarah Williams", product: "Lavender Oil", amount: "$39.99", status: "Shipped" },
  { id: "#3206", customer: "Tom Brown", product: "Peppermint Oil", amount: "$44.99", status: "Completed" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a3a2e]">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1a3a2e]">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.product}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <p
                      className={`text-xs ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Processing"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Pure Essence Oil", sales: 234, revenue: "$11,696" },
                { name: "CBD Dropper 30ml", sales: 189, revenue: "$15,111" },
                { name: "Essential Oil Set", sales: 156, revenue: "$20,274" },
                { name: "Lavender Oil", sales: 142, revenue: "$5,676" },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <p className="text-sm font-medium">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
