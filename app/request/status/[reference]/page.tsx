"use client"

import { useEffect, useState } from "react"
import { getDocumentRequest } from "@/lib/supabase/document-requests"
import type { DocumentRequest } from "@/lib/supabase/types"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status/status-badge"
import { RequestStatusSkeleton } from "@/components/skeletons/request-status-skeleton"
import { PageLayout } from "@/components/layout/page-layout"

export default function RequestStatusPage({
  params,
}: {
  params: { reference: string }
}) {
  const [request, setRequest] = useState<DocumentRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRequest() {
      try {
        const data = await getDocumentRequest(params.reference)
        setRequest(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load request")
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [params.reference])

  if (loading) {
    return <RequestStatusSkeleton />
  }

  if (error) {
    return (
      <PageLayout>
        <PageHeader
          title="Error"
          description="Failed to load request status"
        />
        <Card className="mt-8">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </PageLayout>
    )
  }

  if (!request) {
    return (
      <PageLayout>
        <PageHeader
          title="Request Not Found"
          description="The requested document request could not be found"
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <PageHeader
        title="Request Status"
        description="Track the status of your document request"
      />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Reference: {request.reference_number}
            <StatusBadge status={request.status} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Full Name</h3>
              <p>{request.full_name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Email</h3>
              <p>{request.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">From University</h3>
              <p>{request.from_university}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Document Type</h3>
              <p>{request.document_type}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Additional Services</h3>
            <div className="flex gap-2">
              {request.needs_translation && (
                <Badge variant="secondary">Translation</Badge>
              )}
              {request.needs_apostille && (
                <Badge variant="secondary">Apostille</Badge>
              )}
            </div>
          </div>

          {request.additional_remarks && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Additional Remarks</h3>
              <p className="text-sm">{request.additional_remarks}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}