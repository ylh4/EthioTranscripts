"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { createClient } from "@/lib/supabase/client"

// Dynamically import the login form with SSR disabled to prevent hydration issues
const AdminLoginForm = dynamic(
  () => import("@/components/admin/admin-login-form").then(mod => mod.AdminLoginForm),
  { ssr: false }
)

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const from = searchParams.get('from') || '/admin/dashboard'
        router.replace(from)
      }
    }
    checkSession()
  }, [router, searchParams, supabase.auth])

  return (
    <PageLayout>
      <div className="max-w-md mx-auto">
        <PageHeader
          title="Admin Login"
          description="Access the administrator dashboard"
        />
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </PageLayout>
  )
}