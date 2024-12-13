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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </PageLayout>
  )
}