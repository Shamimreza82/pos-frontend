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
import { usePOSStore, Order } from "@/lib/store"
import { History, Eye } from "lucide-react"
import { Separator } from "../ui/separator"

function OrderDetails({ order }: { order: Order }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(order.date).toLocaleString()}
          </p>
        </DialogHeader>
        <div className="space-y-2 my-4">
          {order.items.map((item) => (
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
          <span>৳ {order.total}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function OrderHistoryDialog() {
  const orderHistory = usePOSStore((s) => s.orderHistory)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <History className="mr-2 h-4 w-4" /> Order History (
          {orderHistory.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order History</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {orderHistory.length === 0 && (
            <p className="text-muted-foreground">No past orders.</p>
          )}
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <div>
                <p>
                  {new Date(order.date).toLocaleDateString()} -{" "}
                  {new Date(order.date).toLocaleTimeString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} items
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg">৳ {order.total}</p>
                <OrderDetails order={order} />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
