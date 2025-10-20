import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a3a2e]">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="Pure Essence Oils" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input id="storeEmail" type="email" defaultValue="info@pureessence.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storePhone">Phone Number</Label>
              <Input id="storePhone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeAddress">Address</Label>
              <Textarea id="storeAddress" defaultValue="123 Main Street, Suite 100, New York, NY 10001" />
            </div>
            <Button className="bg-[#d4a574] hover:bg-[#d4a574]/90 text-[#1a3a2e]">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="USD" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input id="taxRate" type="number" defaultValue="8.5" />
            </div>
            <Button className="bg-[#d4a574] hover:bg-[#d4a574]/90 text-[#1a3a2e]">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shippingFee">Standard Shipping Fee</Label>
              <Input id="shippingFee" type="number" defaultValue="9.99" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="freeShipping">Free Shipping Threshold</Label>
              <Input id="freeShipping" type="number" defaultValue="50.00" />
            </div>
            <Button className="bg-[#d4a574] hover:bg-[#d4a574]/90 text-[#1a3a2e]">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
