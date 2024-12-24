"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"

export function AuthButtons() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isAdmin = pathname.startsWith("/admin")
  const { logout } = useAdminAuth()

  if (isAdmin) {
    return (
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {!isHome && (
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
      )}
      <Button asChild>
        <Link href="/request">Get Started</Link>
      </Button>
    </div>
  )
}