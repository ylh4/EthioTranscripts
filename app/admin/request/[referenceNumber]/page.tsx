import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { RequestDetailsWrapper } from "@/components/admin/request-details-wrapper"

interface AdminRequestDetailsPageProps {
  params: {
    referenceNumber: string
  }
}

export default function AdminRequestDetailsPage({ params }: AdminRequestDetailsPageProps) {
  return (
    <PageLayout>
      <PageHeader
        title="Request Details"
        description="View complete information about this document request"
      />
      <div className="mt-8">
        <RequestDetailsWrapper referenceNumber={params.referenceNumber} />
      </div>
    </PageLayout>
  )
} 