"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"
import { AUTH_ROUTES } from "@/lib/admin/config/constants"

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAdminAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace(AUTH_ROUTES.LOGIN)
      } else {
        router.replace(AUTH_ROUTES.DASHBOARD)
      }
    }
  }, [isLoading, isAuthenticated, router])

  return null
}