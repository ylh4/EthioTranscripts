"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authService } from "../services/auth-service"

export function useAdminAuth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const session = await authService.getSession()
      setIsAuthenticated(!!session)
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true)
    try {
      const result = await authService.login(email, password)
      
      if (result.success) {
        setIsAuthenticated(true)
        toast.success("Successfully logged in")
        router.push("/admin/dashboard")
        return true
      } else {
        toast.error(result.error || "Login failed")
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An unexpected error occurred")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    setIsLoading(true)
    try {
      await authService.logout()
      setIsAuthenticated(false)
      toast.success("Successfully logged out")
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Error logging out")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    logout,
    isLoading,
    isAuthenticated,
  }
}