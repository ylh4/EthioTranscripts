"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { contactFormSchema, type ContactFormData } from "./contact-form-schema"
import { ContactFormFields } from "./contact-form-fields"

export function ContactForm() {
  const { toast } = useToast()
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(values: ContactFormData) {
    try {
      // TODO: Implement contact form submission
      toast.success("Message sent successfully. We'll get back to you as soon as possible.")
      form.reset()
    } catch (error) {
      toast.error("Error sending message. Please try again later.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFormFields form={form} />
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </Form>
  )
}