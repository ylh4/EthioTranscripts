"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function LiaisonProcess() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">How It Works</h3>
      <ul className="space-y-3">
        {[
          "Submit your document request",
          "We contact the university",
          "Follow up on processing",
          "Verify document completion",
          "Arrange document delivery",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}