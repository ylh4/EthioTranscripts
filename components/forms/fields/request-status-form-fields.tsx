"use client"

import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { RequestStatusFormData } from "../schemas/request-status-schema"

interface RequestStatusFormFieldsProps {
  form: UseFormReturn<RequestStatusFormData>
}

export function RequestStatusFormFields({ form }: RequestStatusFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="referenceNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reference Number</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter your reference number (e.g., ET1ABC2D3)"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}