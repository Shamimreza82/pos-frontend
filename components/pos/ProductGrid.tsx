/* eslint-disable @typescript-eslint/no-explicit-any */
// components/pos/ProductGrid.tsx

"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePOSStore } from "@/lib/store"
import { Button } from "../ui/button"

const products = [
  { id: "1", name: "Paracetamol", price: 10, category: "Medicine", image: "https://placehold.co/300x300/F87171/FFFFFF?text=Paracetamol" },
  { id: "2", name: "Burger", price: 250, category: "Food", image: "https://placehold.co/300x300/FB923C/FFFFFF?text=Burger" },
  { id: "3", name: "Coffee", price: 120, category: "Beverage", image: "https://placehold.co/300x300/A3E635/FFFFFF?text=Coffee" },
  { id: "4", name: "Tea", price: 50, category: "Beverage", image: "https://placehold.co/300x300/34D399/FFFFFF?text=Tea" },
  { id: "5", name: "Water Bottle", price: 20, category: "Beverage", image: "https://placehold.co/300x300/60A5FA/FFFFFF?text=Water" },
  { id: "6", name: "Laptop", price: 55000, category: "Electronics", image: "https://placehold.co/300x300/C084FC/FFFFFF?text=Laptop" },
  { id: "7", name: "Mouse", price: 800, category: "Electronics", image: "https://placehold.co/300x300/F472B6/FFFFFF?text=Mouse" },
  { id: "8", name: "T-Shirt", price: 500, category: "Apparel", image: "https://placehold.co/300x300/FBBF24/FFFFFF?text=T-Shirt" },
]

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

export default function ProductGrid() {
  const addToCart = usePOSStore((s: any) => s.addToCart)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products
    .filter(
      (p) =>
        selectedCategory === "All" || p.category === selectedCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <Card
            key={p.id}
            className="cursor-pointer hover:ring-2 overflow-hidden"
            onClick={() => addToCart(p)}
          >
            <CardContent className="p-0 text-center">
              <Image
                src={p.image}
                alt={p.name}
                width={300}
                height={300}
                className="aspect-square object-cover"
              />
              <div className="p-4">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  ৳ {p.price}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
