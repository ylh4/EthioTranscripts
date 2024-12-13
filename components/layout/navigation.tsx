"use client"

import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"

export function Navigation() {
  return (
    <nav className="flex items-center justify-between mb-12">
      <Logo />
      <NavLinks />
      <AuthButtons />
    </nav>
  )
}