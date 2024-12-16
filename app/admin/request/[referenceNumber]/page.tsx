"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"
import { createClient } from "@/lib/supabase/client"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestStatusForm } from "@/components/request/request-status-form"

interface Request {
  id: string
  reference_number: string
  full_name: string
  email: string
  status: "pending" | "processing" | "completed" | "rejected"
  created_at: string
  updated_at: string
  notes?: string
}

interface RequestDetailsPageProps {
  params: {
    referenceNumber: string
  }
}

export default function RequestDetailsPage({ params }: RequestDetailsPageProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [request, setRequest] = useState<Request | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    async function fetchRequest() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .eq("reference_number", params.referenceNumber)
          .single()

        if (error) throw error
        setRequest(data)
      } catch (error) {
        console.error("Error fetching request:", error)
        router.push("/admin/request")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchRequest()
    }
  }, [isAuthenticated, params.referenceNumber, router])

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg font-medium">Loading...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !request) {
    return null
  }

  return (
    <>
      <PageHeader
        title={`Request ${request.reference_number}`}
        description="View and manage request details"
      />
      <div className="mt-8 grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Reference Number
                </div>
                <div>{request.reference_number}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Status
                </div>
                <Badge variant="outline">{request.status}</Badge>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Full Name
                </div>
                <div>{request.full_name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Email
                </div>
                <div>{request.email}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Created At
                </div>
                <div>{format(new Date(request.created_at), "PPP")}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Updated At
                </div>
                <div>{format(new Date(request.updated_at), "PPP")}</div>
              </div>
            </div>
            {request.notes && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Notes
                </div>
                <div className="whitespace-pre-wrap">{request.notes}</div>
              </div>
            )}
          </CardContent>
        </Card>
        <RequestStatusForm request={request} />
      </div>
    </>
  )
} 