"use client"

import { Logo } from "./logo"
import { AdminNavLinks } from "./admin-nav-links"
import { AuthButtons } from "./auth-buttons"

export function AdminNavigation() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Logo />
        <AdminNavLinks />
      </div>
      <AuthButtons />
    </nav>
  )
} 