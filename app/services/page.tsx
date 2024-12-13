import { PageHeader } from "@/components/page-header"
import { ServicesGrid } from "@/components/services/services-grid"
import { PageLayout } from "@/components/layout/page-layout"

export default function ServicesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Our Services"
        description="Comprehensive academic document services for Ethiopian universities"
      />
      <ServicesGrid />
    </PageLayout>
  )
}