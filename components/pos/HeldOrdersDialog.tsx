"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { usePOSStore } from "@/lib/store"
import { Hand, TrashIcon } from "lucide-react"

export default function HeldOrdersDialog() {
  const heldOrders = usePOSStore((s) => s.heldOrders)
  const restoreOrder = usePOSStore((s) => s.restoreOrder)
  const deleteHeldOrder = usePOSStore((s) => s.deleteHeldOrder)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Hand className="mr-2 h-4 w-4" /> Held Orders ({heldOrders.length})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Held Orders</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {heldOrders.length === 0 && (
            <p className="text-muted-foreground">No held orders.</p>
          )}
          {heldOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <div>
                <p>
                  {new Date(order.date).toLocaleTimeString()} - {order.items.length}{" "}
                  items
                </p>
                <p className="font-bold">৳ {order.total}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => restoreOrder(order.id)}>Restore</Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteHeldOrder(order.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
