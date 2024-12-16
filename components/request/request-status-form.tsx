"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const statusUpdateSchema = z.object({
  status: z.enum(["pending", "processing", "completed", "rejected"]),
  notes: z.string().optional(),
})

type StatusUpdateData = z.infer<typeof statusUpdateSchema>

interface RequestStatusFormProps {
  request: {
    id: string
    reference_number: string
    status: string
  }
}

export function RequestStatusForm({ request }: RequestStatusFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<StatusUpdateData>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      status: request.status as StatusUpdateData["status"],
      notes: "",
    },
  })

  const onSubmit = useCallback(async (data: StatusUpdateData) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/request/${request.reference_number}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      toast.success("Status updated successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setIsLoading(false)
    }
  }, [request.reference_number, router])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about this status update"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Status"}
        </Button>
      </form>
    </Form>
  )
} 