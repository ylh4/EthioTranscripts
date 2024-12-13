"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useDocumentRequest } from "@/hooks/use-document-request"
import { useRouter } from "next/navigation"
import { documentRequestSchema, type DocumentRequestFormData } from "./schemas/document-request-schema"
import { DocumentRequestFields } from "./fields/document-request-fields"

export function DocumentRequestForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { submitRequest, isSubmitting } = useDocumentRequest()

  const form = useForm<DocumentRequestFormData>({
    resolver: zodResolver(documentRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      fromUniversity: "",
      otherUniversity: "",
      toUniversity: {
        name: "",
        location: {
          country: "",
          otherCountry: "",
          city: "",
          address: ""
        }
      },
      documentType: "",
      additionalRemarks: "",
      needsTranslation: false,
      needsApostille: false,
    }
  })

  const onSubmit = async (values: DocumentRequestFormData) => {
    try {
      const universityName = values.fromUniversity === "other" 
        ? values.otherUniversity 
        : values.fromUniversity

      if (!universityName) {
        toast.error("University name is required")
        return
      }

      const country = values.toUniversity.location.country === "other"
        ? values.toUniversity.location.otherCountry
        : values.toUniversity.location.country

      if (!country) {
        toast.error("Destination country is required")
        return
      }

      const result = await submitRequest({
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        from_university: universityName,
        to_university: values.toUniversity.name,
        to_university_location: {
          country,
          city: values.toUniversity.location.city,
          address: values.toUniversity.location.address
        },
        document_type: values.documentType,
        needs_translation: values.needsTranslation,
        needs_apostille: values.needsApostille,
        additional_remarks: values.additionalRemarks || undefined,
      })

      if (result.success && result.referenceNumber) {
        toast.success("Request submitted successfully")
        form.reset()
        router.push(`/request/status/${result.referenceNumber}`)
      } else if (result.error) {
        toast.error(result.error)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error("Failed to submit request. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DocumentRequestFields form={form} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Form>
  )
}