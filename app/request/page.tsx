"use client"

import { DocumentRequestForm } from "@/components/forms/document-request-form"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"

export default function RequestPage() {
  return (
    <PageLayout>
      <PageHeader 
        title="Request Documents"
        description="Fill out the form below to request your academic documents. We'll guide you through the process."
      />
      <div className="max-w-2xl mx-auto mt-8">
        <DocumentRequestForm />
      </div>
    </PageLayout>
  )
}