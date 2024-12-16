import { AdminNavigation } from "@/components/layout/admin-navigation"

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