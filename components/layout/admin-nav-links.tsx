"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminNavLinks() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex space-x-6">
      <Link
        href="/admin/dashboard"
        className={cn(
          "text-muted-foreground hover:text-primary",
          pathname === "/admin/dashboard" && "text-primary font-medium"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/blog"
        className={cn(
          "text-muted-foreground hover:text-primary",
          pathname.startsWith("/admin/blog") && "text-primary font-medium"
        )}
      >
        Blog
      </Link>
      <Link
        href="/admin/messages"
        className={cn(
          "text-muted-foreground hover:text-primary",
          pathname === "/admin/messages" && "text-primary font-medium"
        )}
      >
        Messages
      </Link>
    </div>
  )
} 