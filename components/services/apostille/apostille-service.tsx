"use client"

import { Card } from "@/components/ui/card"
import { Stamp } from "lucide-react"

export function ApostilleService() {
  return (
    <div className="mt-8 space-y-8">
      <div className="prose prose-green max-w-none">
        <p className="text-lg text-muted-foreground">
          Our apostille service ensures your academic documents are legally recognized internationally.
          We handle the complete process of document legalization and apostille certification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Apostille Services</h3>
          <ul className="space-y-3">
            {[
              "Document Authentication",
              "Ministry Legalization",
              "Embassy Attestation",
              "Apostille Certificate",
              "International Verification",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Stamp className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Accepted Documents</h3>
          <ul className="space-y-3">
            {[
              "University Transcripts",
              "Degree Certificates",
              "Academic Records",
              "Certified Translations",
              "Official Letters",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Stamp className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Important Information</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Processing time varies by country and document type</li>
          <li>• All documents must be originals or certified copies</li>
          <li>• Some countries may require additional certifications</li>
          <li>• Expedited service available for urgent requests</li>
          <li>• Consultation available for complex cases</li>
        </ul>
      </div>
    </div>
  )
}