"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getDocumentRequest } from "@/lib/supabase/document-requests"
import { formatDate } from "@/lib/utils"
import type { DocumentRequest } from "@/lib/supabase/types"
import type { UniversityLocation } from "@/lib/supabase/types"

interface DocumentRequestDetailsProps {
  referenceNumber: string
}

type RequestWithLocation = DocumentRequest & { location: UniversityLocation }

export function DocumentRequestDetails({ referenceNumber }: DocumentRequestDetailsProps) {
  const [request, setRequest] = useState<RequestWithLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRequest() {
      try {
        const data = await getDocumentRequest(referenceNumber)
        setRequest(data)
      } catch (err) {
        console.error('Error loading request:', err)
        setError('Failed to load request details')
      } finally {
        setLoading(false)
      }
    }

    loadRequest()
  }, [referenceNumber])

  if (loading) {
    return <div>Loading request details...</div>
  }

  if (error || !request) {
    return <div className="text-red-500">{error || 'Request not found'}</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Request Details</CardTitle>
            <Badge variant={
              request.status === 'completed' ? 'success' :
              request.status === 'rejected' ? 'destructive' :
              request.status === 'processing' ? 'warning' :
              'secondary'
            }>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reference Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Reference Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Reference Number</div>
                <div>{request.reference_number}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Submission Date</div>
                <div>{formatDate(request.created_at)}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Full Name</div>
                <div>{request.full_name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{request.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div>{request.phone}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Document Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Document Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">From University</div>
                <div>{request.from_university}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Document Type</div>
                <div>{request.document_type}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Translation Required</div>
                <div>{request.needs_translation ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Authentication Required</div>
                <div>{request.needs_authentication ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Destination Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Destination Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">To University</div>
                <div>{request.to_university}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Country</div>
                <div>{request.location.country}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">City</div>
                <div>{request.location.city}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Address</div>
                <div>{request.location.address}</div>
              </div>
            </div>
          </div>

          {request.additional_remarks && (
            <>
              <Separator />
              {/* Additional Remarks */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Additional Remarks</h3>
                <div className="text-sm">{request.additional_remarks}</div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 