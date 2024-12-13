import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { ProcessSteps } from "@/components/how-it-works/process-steps"

export default function HowItWorksPage() {
  return (
    <PageLayout>
      <PageHeader
        title="How It Works"
        description="Simple steps to get your academic documents"
      />
      
      <div className="mt-8 space-y-12">
        {/* Process Overview */}
        <div className="prose prose-green max-w-none">
          <p className="text-lg text-muted-foreground">
            EthioTranscripts streamlines the entire document procurement process. First, you select an option (Getting Started, Request Documents, or Submit a Request) and fill out a simple form. Once submitted, you receive a unique reference number to track your order. Within 24 hours, our team contacts you via email and WhatsApp, outlining required supplemental documents (e.g., cost sharing, delegation forms) and providing a cost breakdown, including delivery options. You then upload the requested documents and make your payment. Our agents handle the procurement and authentication on your behalf, and you can monitor the real-time progress of your request using the reference number until your documents are delivered as requested.
          </p>
        </div>

        {/* Process Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/how-it-works.jpg"
            alt="EthioTranscripts document procurement process"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Process Steps */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Step by Step Process</h2>
          <ProcessSteps />
        </div>
      </div>
    </PageLayout>
  )
} 