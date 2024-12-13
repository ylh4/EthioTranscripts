"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AUTH_ROUTES } from "@/lib/admin/config/constants"

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.replace(AUTH_ROUTES.LOGIN)
          return
        }

        // Verify admin status
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', session.user.email)
          .single()

        if (!adminUser) {
          await supabase.auth.signOut()
          router.replace(AUTH_ROUTES.LOGIN)
          return
        }

        router.replace(AUTH_ROUTES.DASHBOARD)
      } catch (error) {
        console.error('Admin page error:', error)
        router.replace(AUTH_ROUTES.LOGIN)
      }
    }

    checkAuth()
  }, [router, supabase])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we verify your credentials.</p>
      </div>
    </div>
  )
}