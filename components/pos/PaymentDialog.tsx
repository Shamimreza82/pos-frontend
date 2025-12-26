// components/pos/PaymentDialog.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { usePOSStore } from "@/lib/store"
import { Separator } from "../ui/separator"

export default function PaymentDialog({ total }: { total: number }) {
  const [paymentStatus, setPaymentStatus] = useState("pending")
  const [open, setOpen] = useState(false)
  const cart = usePOSStore((s) => s.cart)
  const clearCart = usePOSStore((s) => s.clearCart)
  const addOrderToHistory = usePOSStore((s) => s.addOrderToHistory)

  const handlePayment = () => {
    // Simulate payment processing
    addOrderToHistory()
    setTimeout(() => {
      setPaymentStatus("completed")
    }, 1000)
  }

  const handleNewOrder = () => {
    clearCart()
    setPaymentStatus("pending")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={cart.length === 0}>
          Pay
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {paymentStatus === "pending" ? "Payment" : "Receipt"}
          </DialogTitle>
        </DialogHeader>

        {paymentStatus === "pending" ? (
          <div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePayment}
              >
                Cash
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePayment}
              >
                bKash
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handlePayment}
              >
                Card
              </Button>
            </div>
            <div className="font-bold mt-4 text-lg text-center">
              Payable: ৳ {total}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center my-4">
              <h3 className="text-2xl font-bold text-green-500">
                Payment Successful!
              </h3>
              <p className="text-muted-foreground">
                Thank you for your purchase.
              </p>
            </div>
            <Separator />
            <div className="space-y-2 my-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span>৳ {item.price * (item.qty ?? 0)}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg my-4">
              <span>Total Paid:</span>
              <span>৳ {total}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.print()}
              >
                Print Receipt
              </Button>
              <Button className="w-full" onClick={handleNewOrder}>
                New Order
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
