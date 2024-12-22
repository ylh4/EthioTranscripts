"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

interface WithSearchParamsProps {
  children: React.ReactNode
}

function SearchParamsContent({ children }: WithSearchParamsProps) {
  useSearchParams()
  return <>{children}</>
}

export function withSearchParams<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithSearchParamsWrapper(props: P) {
    return (
      <Suspense fallback={null}>
        <SearchParamsContent>
          <Component {...props} />
        </SearchParamsContent>
      </Suspense>
    )
  }
} 