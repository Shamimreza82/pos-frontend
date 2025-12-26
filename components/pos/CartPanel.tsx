// components/pos/CartPanel.tsx
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePOSStore } from "@/lib/store"
import PaymentDialog from "./PaymentDialog"
import { Hand, TrashIcon } from "lucide-react"
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"

export default function CartPanel() {
  const cart = usePOSStore((s) => s.cart)
  const updateQuantity = usePOSStore((s) => s.updateQuantity)
  const removeFromCart = usePOSStore((s) => s.removeFromCart)
  const clearCart = usePOSStore((s) => s.clearCart)
  const holdOrder = usePOSStore((s) => s.holdOrder)

  const total = cart.reduce((sum, p) => sum + p.price * (p?.qty ?? 0), 0)

  return (
    <>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Cart</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCart}
          disabled={cart.length === 0}
        >
          Clear Cart
        </Button>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
        {cart.length === 0 && (
          <div className="text-center text-muted-foreground">
            Your cart is empty.
          </div>
        )}
        {cart.map((p) => (
          <div key={p.id} className="flex items-center gap-4">
            <Image
              src={p.image ?? ""}
              alt={p.name}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                ৳ {p.price}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateQuantity(p.id, (p.qty ?? 0) - 1)}
              >
                -
              </Button>
              <span>{p.qty}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateQuantity(p.id, (p.qty ?? 0) + 1)}
              >
                +
              </Button>
            </div>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => removeFromCart(p.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex-col gap-4 mt-auto p-4">
        <Separator />
        <div className="flex justify-between w-full font-bold text-lg">
          <span>Total:</span>
          <span>৳ {total}</span>
        </div>
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={holdOrder}
            disabled={cart.length === 0}
          >
            <Hand className="mr-2 h-4 w-4" /> Hold
          </Button>
          <PaymentDialog total={total} />
        </div>
      </CardFooter>
    </>
  )
}
