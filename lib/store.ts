// lib/store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"

// Define product type
export interface Product {
  id: string
  name: string
  price: number
  qty?: number
  image?: string
}

export interface Order {
  date: string | number | Date
  id: string
  items: Product[]
  subtotal: number
  tax: number
  total: number
  timestamp: number
}

// Define store state and actions
interface POSStore {
  cart: Product[]
  heldOrders: Order[]
  orderHistory: Order[]
  lastCompletedOrder: Order | null
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  holdOrder: () => void
  restoreOrder: (id: string) => void
  deleteHeldOrder: (id: string) => void
  addOrderToHistory: () => void
}

export const usePOSStore = create<POSStore>()(
  persist(
    (set, get) => ({
      cart: [],
      heldOrders: [],
      orderHistory: [],
      lastCompletedOrder: null,
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id)
          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, qty: (p.qty ?? 0) + 1 } : p
              ),
            }
          }
          return { cart: [...state.cart, { ...product, qty: 1 }] }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          cart: state.cart
            .map((p) => (p.id === id ? { ...p, qty } : p))
            .filter((p) => (p.qty ?? 0) > 0),
        })),
      clearCart: () => set({ cart: [] }),
      holdOrder: () => {
        const cart = get().cart
        if (cart.length === 0) return

        const subtotal = cart.reduce((sum, p) => sum + p.price * (p.qty ?? 0), 0)
        const tax = subtotal * 0.1
        const total = subtotal + tax
        const newHeldOrder: Order = {
          id: uuidv4(),
          items: cart,
          subtotal,
          tax,
          total,
          timestamp: Date.now(),
        }
        set((state) => ({
          heldOrders: [...state.heldOrders, newHeldOrder],
          cart: [],
        }))
      },
      restoreOrder: (id) => {
        const heldOrder = get().heldOrders.find((o) => o.id === id)
        if (!heldOrder) return

        set((state) => ({
          cart: heldOrder.items,
          heldOrders: state.heldOrders.filter((o) => o.id !== id),
        }))
      },
      deleteHeldOrder: (id) => {
        set((state) => ({
          heldOrders: state.heldOrders.filter((o) => o.id !== id),
        }))
      },
      addOrderToHistory: () => {
        const cart = get().cart
        const subtotal = cart.reduce((sum, p) => sum + p.price * (p.qty ?? 0), 0)
        const tax = subtotal * 0.1
        const total = subtotal + tax
        const newOrder: Order = {
          id: uuidv4(),
          items: cart,
          subtotal,
          tax,
          total,
          timestamp: Date.now(),
        }
        set((state) => ({
          orderHistory: [newOrder, ...state.orderHistory],
          lastCompletedOrder: newOrder,
        }))
      },
    }),
    {
      name: "pos-cart-storage", // name of the item in the storage (must be unique)
    }
  )
)
