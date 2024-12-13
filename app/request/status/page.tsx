"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/page-header"
import { RequestStatusForm } from "@/components/forms/request-status-form"
import { useToast } from "@/hooks/use-toast"

export default function RequestStatusPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (referenceNumber: string) => {
    setIsSubmitting(true)
    try {
      router.push(`/request/status/${referenceNumber}`)
    } catch (error) {
      toast.error("Failed to retrieve request status")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageLayout>
      <PageHeader
        title="Track Your Request"
        description="Enter your reference number to check the status of your document request"
      />
      <div className="max-w-md mx-auto mt-8">
        <RequestStatusForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PageLayout>
  )
}