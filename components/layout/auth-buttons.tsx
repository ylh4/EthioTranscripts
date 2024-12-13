"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  const pathname = usePathname()
  const isHome = pathname === "/"

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