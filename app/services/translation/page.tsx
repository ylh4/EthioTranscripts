import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/page-header"
import { TranslationService } from "@/components/services/translation/translation-service"

export default function TranslationServicePage() {
  return (
    <PageLayout>
      <PageHeader
        title="Translation Service"
        description="Professional translation of academic documents"
      />
      <TranslationService />
    </PageLayout>
  )
}