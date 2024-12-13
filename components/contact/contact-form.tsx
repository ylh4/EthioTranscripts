"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { contactFormSchema, type ContactFormData } from "./contact-form-schema"
import { ContactFormFields } from "./contact-form-fields"
import { createContactMessage } from "@/lib/supabase/contact-messages"
import { useState, useEffect } from "react"
import { trackContactForm } from "@/lib/analytics"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  async function onSubmit(values: ContactFormData) {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      console.log('Submitting contact form:', values)
      const result = await createContactMessage(values)
      console.log('Contact form submission result:', result)
      
      trackContactForm()
      toast.success("Message sent successfully. We'll get back to you as soon as possible.")
      form.reset()
    } catch (error) {
      console.error('Contact form submission error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to send message. Please try again later.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContactFormFields form={form} />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            variant="default"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  )
}