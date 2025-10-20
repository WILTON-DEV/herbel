import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, EditIcon, TrashIcon } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Pure Essence Oil",
    category: "Essential Oils",
    price: "$49.99",
    stock: 45,
    status: "Active",
    image: "/amber-essential-oil-dropper-bottle.jpg",
  },
  {
    id: 2,
    name: "CBD Dropper 30ml",
    category: "CBD Products",
    price: "$79.99",
    stock: 32,
    status: "Active",
    image: "/blue-essential-oil-dropper-bottle.jpg",
  },
  {
    id: 3,
    name: "Lavender Oil",
    category: "Essential Oils",
    price: "$39.99",
    stock: 67,
    status: "Active",
    image: "/yellow-essential-oil-dropper-bottle.jpg",
  },
  {
    id: 4,
    name: "Peppermint Oil",
    category: "Essential Oils",
    price: "$44.99",
    stock: 23,
    status: "Active",
    image: "/green-essential-oil-dropper-bottle.jpg",
  },
  {
    id: 5,
    name: "Essential Oil Set",
    category: "Gift Sets",
    price: "$129.99",
    stock: 15,
    status: "Active",
    image: "/amber-essential-oil-dropper-bottle.jpg",
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-[#d4a574] hover:bg-[#d4a574]/90 text-[#1a3a2e]">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                    <td className="py-3 px-4 font-medium">{product.price}</td>
                    <td className="py-3 px-4">
                      <span className={product.stock < 30 ? "text-red-600" : "text-green-600"}>{product.stock}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {product.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="h-4 w-4 text-red-600" />
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
