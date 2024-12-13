import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/page-header"
import { DeliveryService } from "@/components/services/delivery/delivery-service"

export default function DeliveryServicePage() {
  return (
    <PageLayout>
      <PageHeader
        title="Global Delivery Service"
        description="Secure worldwide delivery of your authenticated documents"
      />
      <DeliveryService />
    </PageLayout>
  )
}