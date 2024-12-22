"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParamsWrapperProps {
  children: (searchParams: URLSearchParams) => React.ReactNode
}

function SearchParamsContent({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams()
  return children(searchParams)
}

export function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  return (
    <Suspense>
      <SearchParamsContent children={children} />
    </Suspense>
  )
} 