"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authService } from "../services/auth-service"
import { AUTH_ROUTES } from "../config/constants"

export function useAdminLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await authService.login(email, password)
      
      if (result.success) {
        toast.success("Successfully logged in")
        router.push(AUTH_ROUTES.DASHBOARD)
      } else {
        toast.error(result.error || "Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    isLoading
  }
}