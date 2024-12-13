import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHeader
        title="About Us"
        description="Your trusted partner in academic document services"
      />
      
      <div className="prose prose-green max-w-none mt-8">
        <p className="text-lg text-muted-foreground">
          EthioTranscripts is dedicated to bridging the gap between Ethiopian universities and global institutions by providing comprehensive academic document services. Our mission is to simplify the process of obtaining, authenticating, and delivering academic credentials worldwide.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide efficient, reliable, and secure academic document services that connect Ethiopian graduates with global opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To be the leading facilitator of academic document procurement and authentication services for Ethiopian universities globally.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}