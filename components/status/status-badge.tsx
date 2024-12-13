import { Badge } from "@/components/ui/badge"
import { DocumentRequest } from "@/lib/supabase/types"

interface StatusBadgeProps {
  status: DocumentRequest["status"]
}

const variants = {
  pending: "default",
  processing: "warning",
  completed: "success",
  rejected: "destructive",
} as const

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}