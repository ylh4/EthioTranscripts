import { Metadata } from "next"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestStatusForm } from "@/components/request/request-status-form"

interface RequestPageProps {
  params: {
    referenceNumber: string
  }
}

export async function generateMetadata({ params }: RequestPageProps): Promise<Metadata> {
  return {
    title: `Request ${params.referenceNumber}`,
    description: "View request details",
  }
}

export default async function RequestPage({ params }: RequestPageProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data: request } = await supabase
    .from("requests")
    .select("*")
    .eq("reference_number", params.referenceNumber)
    .single()

  if (!request) {
    notFound()
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        heading={`Request ${request.reference_number}`}
        text="View and manage request details"
      >
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              request.status === "completed"
                ? "success"
                : request.status === "processing"
                ? "warning"
                : request.status === "rejected"
                ? "destructive"
                : "secondary"
            }
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
        </div>
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Reference Number
              </div>
              <div>{request.reference_number}</div>
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
                Submitted On
              </div>
              <div>{format(new Date(request.created_at), "MMMM d, yyyy")}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Status</CardTitle>
          </CardHeader>
          <CardContent>
            <RequestStatusForm request={request} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 