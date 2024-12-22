"use client"

import { PageHeader } from "@/components/page-header"
import { ServicesGrid } from "@/components/services/services-grid"
import { PageLayout } from "@/components/layout/page-layout"
import { withSearchParams } from "@/components/layout/with-search-params"

function ServicesPage() {
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

export default withSearchParams(ServicesPage)