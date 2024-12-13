"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"
import { DocumentRequestDetails } from "./document-request-details"

interface RequestDetailsWrapperProps {
  referenceNumber: string
}

export function RequestDetailsWrapper({ referenceNumber }: RequestDetailsWrapperProps) {
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
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg font-medium">Loading...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <DocumentRequestDetails referenceNumber={referenceNumber} />
} 