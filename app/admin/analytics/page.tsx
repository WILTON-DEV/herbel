import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div>Analytics page coming soon</div>
    // <div className="space-y-6">
    //   <div>
    //     <h1 className="text-3xl font-bold text-[#1a3a2e]">Analytics</h1>
    //     <p className="text-muted-foreground">Track your business performance</p>
    //   </div>

    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-[#1a3a2e]">$45,231.89</div>
    //         <p className="text-xs text-green-600">+20.1% from last month</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="text-sm font-medium">Orders This Month</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-[#1a3a2e]">2,350</div>
    //         <p className="text-xs text-green-600">+180 from last month</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-[#1a3a2e]">$89.45</div>
    //         <p className="text-xs text-green-600">+5.2% from last month</p>
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-2xl font-bold text-[#1a3a2e]">3.24%</div>
    //         <p className="text-xs text-green-600">+0.5% from last month</p>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Sales Overview</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="h-80 flex items-center justify-center text-muted-foreground">
    //         Chart visualization would go here
    //       </div>
    //     </CardContent>
    //   </Card>

    //   <div className="grid gap-4 md:grid-cols-2">
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Top Selling Products</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="space-y-4">
    //           {[
    //             { name: "Pure Essence Oil", sales: 234, revenue: "$11,696" },
    //             { name: "CBD Dropper 30ml", sales: 189, revenue: "$15,111" },
    //             { name: "Essential Oil Set", sales: 156, revenue: "$20,274" },
    //             { name: "Lavender Oil", sales: 142, revenue: "$5,676" },
    //           ].map((product) => (
    //             <div key={product.name} className="flex items-center justify-between border-b pb-3 last:border-0">
    //               <div>
    //                 <p className="font-medium">{product.name}</p>
    //                 <p className="text-sm text-muted-foreground">{product.sales} sales</p>
    //               </div>
    //               <p className="font-medium">{product.revenue}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </CardContent>
    //     </Card>

    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Traffic Sources</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="space-y-4">
    //           {[
    //             { source: "Direct", visitors: "12,345", percentage: "45%" },
    //             { source: "Organic Search", visitors: "8,234", percentage: "30%" },
    //             { source: "Social Media", visitors: "4,567", percentage: "17%" },
    //             { source: "Referral", visitors: "2,189", percentage: "8%" },
    //           ].map((source) => (
    //             <div key={source.source} className="flex items-center justify-between border-b pb-3 last:border-0">
    //               <div>
    //                 <p className="font-medium">{source.source}</p>
    //                 <p className="text-sm text-muted-foreground">{source.visitors} visitors</p>
    //               </div>
    //               <p className="font-medium">{source.percentage}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
  )
}
