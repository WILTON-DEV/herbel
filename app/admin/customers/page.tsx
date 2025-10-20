import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "@/components/icons"

const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: "$1,234.56", joined: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: "$892.34", joined: "2023-07-22" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 15, spent: "$2,145.78", joined: "2023-05-10" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", orders: 6, spent: "$567.89", joined: "2023-08-03" },
  { id: 5, name: "Tom Brown", email: "tom@example.com", orders: 10, spent: "$1,456.23", joined: "2023-06-28" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", orders: 4, spent: "$345.67", joined: "2023-09-12" },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a3a2e]">Customers</h1>
        <p className="text-muted-foreground">View and manage customer information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Orders</th>
                  <th className="text-left py-3 px-4 font-medium">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.email}</td>
                    <td className="py-3 px-4">{customer.orders}</td>
                    <td className="py-3 px-4 font-medium">{customer.spent}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.joined}</td>
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
