import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { PageLayout } from "@/components/layout/page-layout"

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team for support and inquiries"
      />
      <div className="max-w-2xl mx-auto mt-8">
        <ContactForm />
      </div>
    </PageLayout>
  )
}