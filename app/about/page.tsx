import { PageHeader } from "@/components/page-header"
import { PageLayout } from "@/components/layout/page-layout"
import { TeamMember } from "@/components/about/team-member"

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

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Our Leadership Team</h2>
          <div className="space-y-16">
            <TeamMember
              name="Yared Lemma Hurisa"
              title="Co-founder and Chief Technical Officer"
              description="Yared Lemma Hurisa is the Co-founder and Chief Technical Officer of Ethio-Transcripts. With over 10 years of experience in designing and managing knowledge and monitoring systems, Yared has been instrumental in developing robust technical solutions that ensure transparency and efficiency for users seeking official transcripts, degree certificates, document authentication, and translation services.

Yared holds a Master of International Development Policy from Duke University, where he was a Rotary Peace Fellow funded by the Duke-UNC Peace Center. His academic background equips him with the expertise to manage complex workflows and deliver exceptional client service. At Ethio-Transcripts, Yared leads the technical team, overseeing the development and maintenance of the company's digital platforms and ensuring the security and integrity of client data. His leadership has been pivotal in positioning Ethio-Transcripts as a trusted global service provider in academic document procurement and validation."
              imagePath="/images/team/yared-lemma-hurisa.jpg"
            />
            
            <TeamMember
              name="Nataliya Solomon"
              title="Co-founder and Chief Operations Manager"
              description="Nataliya Solomon is the Co-founder and Chief Operations Manager of Ethio-Transcripts, a company dedicated to streamlining the procurement, authentication, and delivery of academic transcripts and related educational documents from Ethiopian universities to clients worldwide. With a strong background in business development and operations management, Nataliya has been instrumental in establishing efficient processes that ensure transparency and efficiency for users seeking official transcripts, degree certificates, document authentication, and translations services.

Nataliya holds a MSc in Urban Design and Sustainable Development from Arbaminch University, equipping her with the strategic and operational expertise to manage complex workflows and deliver exceptional client service. Currently, she leads the operations team at Ethio-Transcripts, ensuring the seamless execution of document processing and service delivery. Her leadership has been pivotal in positioning Ethio-Transcripts as a trusted global service provider in academic document procurement and validation.

Additionally, Nataliya is actively engaged in fostering partnerships and exploring innovative solutions to enhance the company's global outreach and operational efficiency."
              imagePath="/images/team/nataliya-solomon.jpg"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}