"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { BlogCategory } from "@/lib/blog/schemas"

interface BlogCategoryLinksProps {
  categories: BlogCategory[]
}

export function BlogCategoryLinks({ categories }: BlogCategoryLinksProps) {
  const pathname = usePathname()

  return (
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
  )
} 