import { PageLayout } from "@/components/layout/page-layout"
import { LoginFormWrapper } from "@/components/admin/login-form-wrapper"

export default function AdminLoginPage() {
  return (
    <PageLayout>
      <div className="max-w-md mx-auto mt-16">
        <LoginFormWrapper />
      </div>
    </PageLayout>
  )
}