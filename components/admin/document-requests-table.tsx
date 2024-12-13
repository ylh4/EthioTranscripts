"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getAllDocumentRequests, updateDocumentRequestStatus } from "@/lib/supabase/document-requests"
import type { DocumentRequest } from "@/lib/supabase/types"

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
] as const

type RequestStatus = typeof statusOptions[number]['value']

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function DocumentRequestsTable() {
  const { toast } = useToast()
  const [requests, setRequests] = useState<DocumentRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    loadRequests()
  }, [])

  async function loadRequests() {
    try {
      const data = await getAllDocumentRequests()
      setRequests(data)
    } catch (error) {
      console.error('Error loading requests:', error)
      toast.error("Failed to load document requests")
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusUpdate(requestId: string, newStatus: RequestStatus) {
    setUpdating(requestId)
    try {
      console.log('Attempting to update status:', { requestId, newStatus })
      await updateDocumentRequestStatus(requestId, newStatus)
      
      // Update the local state
      setRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus }
          : request
      ))
      
      toast.success(`Status updated to ${newStatus}`)
    } catch (error) {
      console.error('Status update error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update status'
      toast.error(errorMessage)
      
      // Reload the requests to ensure consistency
      console.log('Reloading requests after error...')
      await loadRequests()
    } finally {
      setUpdating(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg font-medium">Loading requests...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>From University</TableHead>
            <TableHead>To University</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center">
                No document requests found
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.reference_number}</TableCell>
                <TableCell>{formatDate(request.created_at)}</TableCell>
                <TableCell>{request.full_name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.from_university}</TableCell>
                <TableCell>{request.to_university}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{request.location.country}</div>
                    <div className="text-muted-foreground">{request.location.city}</div>
                    <div className="text-muted-foreground text-xs">{request.location.address}</div>
                  </div>
                </TableCell>
                <TableCell>{request.document_type}</TableCell>
                <TableCell>
                  <Select
                    value={request.status}
                    onValueChange={(value) => handleStatusUpdate(request.id, value as RequestStatus)}
                    disabled={updating === request.id}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/request/status/${request.reference_number}`, '_blank')}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 