// components/pos/HeaderBar.tsx
import { Badge } from "@/components/ui/badge"
import HeldOrdersDialog from "./HeldOrdersDialog"
import OrderHistoryDialog from "./OrderHistoryDialog"
import { ThemeToggle } from "./ThemeToggle"

export default function HeaderBar() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <h1 className="font-bold text-lg">POS Terminal</h1>

      <div className="flex items-center gap-4">
        <Badge variant="outline">Offline Ready</Badge>
        <HeldOrdersDialog />
        <OrderHistoryDialog />
        <ThemeToggle />
      </div>
    </header>
  )
}
