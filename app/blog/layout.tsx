import { Navigation } from "@/components/layout/navigation"
import { BlogCategories } from "@/components/blog/blog-categories"

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
        <div className="container py-2">
          <Navigation />
        </div>
      </header>

      {/* Main content with sidebar */}
      <main className="container" style={{ marginTop: "80px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6 px-4 md:px-6 lg:px-8">
          {/* Main content */}
          <div className="w-full">
            {children}
          </div>

          {/* Sidebar */}
          <aside className="w-full">
            <div className="lg:sticky" style={{ top: "90px" }}>
              <div className="bg-card p-4 sm:p-6 rounded-lg space-y-2 mb-6">
                <h1 className="text-xl font-bold text-[#1B4332] leading-tight">
                  Empowering Ethiopian Students to Achieve Their Dreams
                </h1>
                <p className="text-sm text-muted-foreground">
                  Insights, stories, and resources to help Ethiopian students succeed in their academic journey
                </p>
              </div>
              <BlogCategories />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
} 