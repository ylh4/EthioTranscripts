"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function AuthenticationService() {
  return (
    <div className="mt-8 space-y-8">
      <div className="prose prose-green max-w-none">
        <p className="text-lg text-muted-foreground">
          Our authentication service ensures your academic documents meet all legal and institutional requirements. 
          We work directly with Ethiopian universities and relevant authorities to verify and authenticate your credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">What We Authenticate</h3>
          <ul className="space-y-3">
            {[
              "Academic Transcripts",
              "Degree Certificates",
              "Medium of Instruction Letters",
              "Academic Records",
              "Course Descriptions",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Authentication Process</h3>
          <ul className="space-y-3">
            {[
              "Document Verification with University",
              "Ministry of Education Authentication",
              "Ministry of Foreign Affairs Legalization",
              "Embassy Attestation (if required)",
              "Digital Authentication Certificate",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Important Information</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Authentication typically takes 5-7 business days</li>
          <li>• All documents must be original or certified copies</li>
          <li>• Additional fees may apply for expedited service</li>
          <li>• Embassy attestation timeframes vary by country</li>
        </ul>
      </div>
    </div>
  )
}