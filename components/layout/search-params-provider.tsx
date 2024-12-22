"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParamsProviderProps {
  children: React.ReactNode
}

function SearchParamsContent({ children }: SearchParamsProviderProps) {
  useSearchParams()
  return <>{children}</>
}

export function SearchParamsProvider({ children }: SearchParamsProviderProps) {
  return (
    <Suspense fallback={null}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  )
} 