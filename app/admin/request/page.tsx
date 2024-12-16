"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/admin/hooks/use-admin-auth"
import { createClient } from "@/lib/supabase/client"
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

interface Request {
  id: string
  reference_number: string
  full_name: string
  email: string
  status: "pending" | "processing" | "completed" | "rejected"
  created_at: string
  updated_at: string
}

export default function RequestPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    async function fetchRequests() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        setRequests(data || [])
      } catch (error) {
        console.error("Error fetching requests:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchRequests()
    }
  }, [isAuthenticated])

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

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <PageHeader
        title="Request Management"
        description="Manage transcript requests"
      />
      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.reference_number}</TableCell>
                <TableCell>{request.full_name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{request.status}</Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(request.created_at), "PPP")}
                </TableCell>
                <TableCell>
                  {format(new Date(request.updated_at), "PPP")}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/request/${request.reference_number}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
} 