import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/page-header"
import { ApostilleService } from "@/components/services/apostille/apostille-service"

export default function ApostilleServicePage() {
  return (
    <PageLayout>
      <PageHeader
        title="Apostille Service"
        description="International document certification and legalization"
      />
      <ApostilleService />
    </PageLayout>
  )
}