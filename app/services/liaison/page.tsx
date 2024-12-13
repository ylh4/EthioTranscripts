import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/page-header"
import { LiaisonService } from "@/components/services/liaison/liaison-service"

export default function LiaisonServicePage() {
  return (
    <PageLayout>
      <PageHeader
        title="University Liaison Service"
        description="Direct coordination with Ethiopian universities for document procurement"
      />
      <LiaisonService />
    </PageLayout>
  )
}