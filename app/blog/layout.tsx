import { Navigation } from "@/components/layout/navigation"
import { BlogCategories } from "@/components/blog/blog-categories"

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
        <div className="container py-4">
          <Navigation />
        </div>
      </header>

      {/* Fixed blog title */}
      <div className="fixed top-[84px] left-0 right-0 bg-background z-40 border-b shadow-sm">
        <div className="container py-10 text-center">
          <h1 className="text-4xl font-bold text-[#1B4332] mb-4">
            Empowering Ethiopian Students to Achieve Their Dreams
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights, stories, and resources to help Ethiopian students succeed in their academic journey
          </p>
        </div>
      </div>

      {/* Main content with fixed sidebar */}
      <main className="flex-1 container pt-[300px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative px-4 md:px-6 lg:px-8">
          {/* Scrollable main content */}
          <div className="lg:col-span-3 min-h-[calc(100vh-6rem)]">
            <div className="max-w-3xl mx-auto">
              {children}
            </div>
          </div>

          {/* Fixed sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[300px]">
              <BlogCategories />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 