"use client"

import { Navigation } from "./navigation"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={cn("container mx-auto px-4 py-8", className)}>
        <Navigation />
        {children}
      </div>
    </div>
  )
}