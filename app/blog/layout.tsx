import { Navigation } from "@/components/layout/navigation"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="container py-4 border-b">
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  )
} 