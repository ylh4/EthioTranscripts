"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { RequestStatusFormFields } from "./fields/request-status-form-fields"
import { requestStatusSchema } from "./schemas/request-status-schema"

interface RequestStatusFormProps {
  onSubmit: (referenceNumber: string) => Promise<void>
  isSubmitting: boolean
}

export function RequestStatusForm({ onSubmit, isSubmitting }: RequestStatusFormProps) {
  const form = useForm<z.infer<typeof requestStatusSchema>>({
    resolver: zodResolver(requestStatusSchema),
    defaultValues: {
      referenceNumber: ""
    }
  })

  const handleSubmit = async (values: z.infer<typeof requestStatusSchema>) => {
    await onSubmit(values.referenceNumber)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <RequestStatusFormFields form={form} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Track Request"}
        </Button>
      </form>
    </Form>
  )
}