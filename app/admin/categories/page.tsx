import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon, EditIcon, TrashIcon } from "@/components/icons"

const categories = [
  { id: 1, name: "Essential Oils", products: 45, description: "Pure essential oils for aromatherapy" },
  { id: 2, name: "CBD Products", products: 23, description: "Premium CBD oil products" },
  { id: 3, name: "Gift Sets", products: 12, description: "Curated gift sets and bundles" },
  { id: 4, name: "Accessories", products: 18, description: "Diffusers and application tools" },
]

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories</p>
        </div>
        <Button className="bg-[#d4a574] hover:bg-[#d4a574]/90 text-[#1a3a2e]">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium text-lg">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <p className="text-xs text-muted-foreground">{category.products} products</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
