"use client"

import { SearchParamsWrapper } from "./search-params-wrapper"

interface WithSearchParamsProps {
  children: (searchParams: URLSearchParams) => React.ReactNode
}

export function WithSearchParams({ children }: WithSearchParamsProps) {
  return <SearchParamsWrapper children={children} />
} 