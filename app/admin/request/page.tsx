import { Metadata } from "next"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { format } from "date-fns"
import { PageHeader } from "@/components/page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Request Management",
  description: "Manage transcript requests",
}

interface Request {
  id: string
  reference_number: string
  full_name: string
  email: string
  status: "pending" | "processing" | "completed" | "rejected"
  created_at: string
  updated_at: string
}

export default async function RequestManagementPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: requests } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        heading="Request Management"
        text="View and manage transcript requests"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request: Request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.reference_number}
                </TableCell>
                <TableCell>{request.full_name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  {format(new Date(request.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link href={`/admin/request/${request.reference_number}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!requests || requests.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 