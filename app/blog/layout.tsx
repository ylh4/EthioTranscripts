import { Navigation } from "@/components/layout/navigation"
import { BlogCategories } from "@/components/blog/blog-categories"

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="container py-4 border-b">
        <Navigation />
      </header>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {children}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogCategories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 