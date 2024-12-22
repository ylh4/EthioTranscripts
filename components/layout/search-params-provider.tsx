"use client"

import { SearchParamsWrapper } from "./search-params-wrapper"

interface SearchParamsProviderProps {
  children: React.ReactNode
}

export function SearchParamsProvider({ children }: SearchParamsProviderProps) {
  return (
    <SearchParamsWrapper>
      {() => children}
    </SearchParamsWrapper>
  )
} 