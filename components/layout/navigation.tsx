"use client"

import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"

export function Navigation() {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
          <div className="flex items-center justify-between w-full sm:w-auto px-4 sm:px-0">
            <Logo />
            <div className="sm:hidden">
              <AuthButtons />
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <NavLinks />
          </div>
          <div className="hidden sm:block sm:px-4">
            <AuthButtons />
          </div>
        </div>
      </nav>
    </div>
  )
}