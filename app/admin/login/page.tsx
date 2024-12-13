"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { createClient } from "@/lib/supabase/client"

// Dynamically import the login form with SSR disabled to prevent hydration issues
const AdminLoginForm = dynamic(
  () => import("@/components/admin/admin-login-form"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg font-medium">Loading login form...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    )
  }
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
          <Suspense fallback={
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-lg font-medium">Loading login form...</div>
                <div className="text-sm text-muted-foreground">Please wait</div>
              </div>
            </div>
          }>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  )
}