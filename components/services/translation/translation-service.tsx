"use client"

import { Card } from "@/components/ui/card"
import { Languages } from "lucide-react"

export function TranslationService() {
  return (
    <div className="mt-8 space-y-8">
      <div className="prose prose-green max-w-none">
        <p className="text-lg text-muted-foreground">
          Our certified translation service provides accurate and legally accepted translations of your academic documents.
          We work with professional translators who specialize in academic and legal translations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Translation Services</h3>
          <ul className="space-y-3">
            {[
              "Academic Transcripts",
              "Degree Certificates",
              "Course Descriptions",
              "Academic Records",
              "Research Papers",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Available Languages</h3>
          <ul className="space-y-3">
            {[
              "English",
              "French",
              "German",
              "Arabic",
              "Chinese",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Translation Process</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Initial document review and assessment</li>
          <li>• Translation by certified professional translator</li>
          <li>• Quality check and proofreading</li>
          <li>• Certification and notarization if required</li>
          <li>• Delivery in both digital and hard copy formats</li>
        </ul>
      </div>
    </div>
  )
}