"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Messages",
    href: "/admin/messages",
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const { logout } = useAdminAuth()

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
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