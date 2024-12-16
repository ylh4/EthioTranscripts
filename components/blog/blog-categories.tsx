"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { BlogCategory } from "@/lib/blog/schemas"

export function BlogCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/blog/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-[#1B4332] mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog/category/${category.slug}`}
            className={cn(
              "block text-muted-foreground hover:text-[#1B4332] transition-colors",
              pathname === `/blog/category/${category.slug}` && "text-[#1B4332] font-medium"
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
} 