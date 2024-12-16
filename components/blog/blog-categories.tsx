import { getStaticCategories } from "@/lib/blog/static-data"
import { BlogCategoryLinks } from "./blog-category-links"
import type { BlogCategory } from "@/lib/blog/schemas"

async function getCategories() {
  return getStaticCategories()
}

export async function BlogCategories() {
  const categories = await getCategories()

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-[#1B4332] mb-4">Categories</h2>
      <BlogCategoryLinks categories={categories} />
    </div>
  )
} 