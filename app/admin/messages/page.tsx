"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { useToast } from "@/hooks/use-toast"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"
import { ContactMessagesTable } from "@/components/admin/contact-messages-table"

export default function AdminMessagesPage() {
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
        title="Contact Messages"
        description="View and manage contact form submissions"
      />
      <div className="mt-8">
        <ContactMessagesTable />
      </div>
    </PageLayout>
  )
} 