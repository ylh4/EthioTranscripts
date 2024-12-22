"use client"

import { PageHeader } from "@/components/page-header"
import { ServicesGrid } from "@/components/services/services-grid"
import { PageLayout } from "@/components/layout/page-layout"
import { SearchParamsProvider } from "@/components/layout/search-params-provider"

export default function ServicesPage() {
  return (
    <SearchParamsProvider>
      <PageLayout>
        <PageHeader
          title="Our Services"
          description="Comprehensive academic document services for Ethiopian universities"
        />
        <ServicesGrid />
      </PageLayout>
    </SearchParamsProvider>
  )
}