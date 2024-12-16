import { AdminNavigation } from "@/components/layout/admin-navigation"
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="container py-4 border-b">
        <AdminNavigation />
      </header>
      <main>{children}</main>
    </>
  )
} 