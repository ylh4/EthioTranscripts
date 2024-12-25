"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLinks() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center space-x-6 px-4 sm:px-0 py-2 min-w-max">
        {!isHome && (
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-primary whitespace-nowrap text-sm sm:text-base"
          >
            Home
          </Link>
        )}
        <Link href="/about" className="text-muted-foreground hover:text-primary whitespace-nowrap text-sm sm:text-base">About</Link>
        <Link href="/how-it-works" className="text-muted-foreground hover:text-primary whitespace-nowrap text-sm sm:text-base">How it Works</Link>
        <Link href="/services" className="text-muted-foreground hover:text-primary whitespace-nowrap text-sm sm:text-base">Services</Link>
        <Link href="/blog" className="text-muted-foreground hover:text-primary whitespace-nowrap text-sm sm:text-base">Blog</Link>
        <Link href="/contact" className="text-muted-foreground hover:text-primary whitespace-nowrap text-sm sm:text-base">Contact</Link>
      </div>
    </div>
  )
}