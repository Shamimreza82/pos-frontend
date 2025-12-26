// app/pos/page.tsx
import ProductGrid from "@/components/pos/ProductGrid"
import CartPanel from "@/components/pos/CartPanel"
import HeaderBar from "@/components/pos/HeaderBar"
import { Card } from "@/components/ui/card"

export default function POSPage() {
  return (
    <div className="h-screen flex flex-col bg-muted/40">

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        <div className="flex-1 overflow-y-auto">
          <ProductGrid />
        </div>

        <Card className="w-[400px] flex flex-col">
          <CartPanel />
        </Card>
      </div>
    </div>
  )
}
