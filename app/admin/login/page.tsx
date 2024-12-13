"use client"

import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"

// Dynamically import the login form with SSR disabled to prevent hydration issues
const AdminLoginForm = dynamic(
  () => import("@/components/admin/admin-login-form").then(mod => mod.AdminLoginForm),
  { ssr: false }
)

export default function AdminLoginPage() {
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