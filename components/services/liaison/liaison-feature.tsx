"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function LiaisonFeature() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Our Services</h3>
      <ul className="space-y-3">
        {[
          "Direct University Communication",
          "Document Request Follow-up",
          "Administrative Support",
          "Progress Tracking",
          "Issue Resolution",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}