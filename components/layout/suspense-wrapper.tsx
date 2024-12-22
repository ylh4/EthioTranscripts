import { Suspense } from 'react'

interface SuspenseWrapperProps {
  children: React.ReactNode
}

export default function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
} 