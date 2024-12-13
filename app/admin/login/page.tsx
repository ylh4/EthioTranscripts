import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { LoginFormWrapper } from "@/components/admin/login-form-wrapper"

export default function AdminLoginPage() {
  return (
    <PageLayout>
      <div className="max-w-md mx-auto">
        <PageHeader
          title="Admin Login"
          description="Access the administrator dashboard"
        />
        <div className="mt-8">
          <LoginFormWrapper />
        </div>
      </div>
    </PageLayout>
  )
}