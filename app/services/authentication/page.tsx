import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/page-header"
import { AuthenticationService } from "@/components/services/authentication/authentication-service"

export default function AuthenticationServicePage() {
  return (
    <PageLayout>
      <PageHeader
        title="Authentication Service"
        description="Official verification and authentication of academic documents"
      />
      <AuthenticationService />
    </PageLayout>
  )
}