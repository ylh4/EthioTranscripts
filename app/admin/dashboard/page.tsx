"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { DocumentRequestsTable } from "@/components/admin/document-requests-table"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAdminAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Please login to access the admin dashboard")
      router.push("/admin/login")
    }
  }, [isLoading, isAuthenticated, router, toast])

  if (isLoading) {
    return (
      <PageLayout>
        <div>Loading...</div>
      </PageLayout>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <PageLayout>
      <PageHeader
        title="Admin Dashboard"
        description="Manage document requests and track their status"
      />
      <div className="mt-8">
        <DocumentRequestsTable />
      </div>
    </PageLayout>
  )
}