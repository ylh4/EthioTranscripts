import * as z from "zod"

export const requestStatusSchema = z.object({
  referenceNumber: z.string().min(1, "Reference number is required")
})

export type RequestStatusFormData = z.infer<typeof requestStatusSchema>