"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLinks() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div className="hidden md:flex space-x-6">
      {!isHome && (
        <Link href="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
      )}
      <Link href="/about" className="text-muted-foreground hover:text-primary">About</Link>
      <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">How it Works</Link>
      <Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link>
      <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
    </div>
  )
}