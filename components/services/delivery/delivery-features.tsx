"use client"

import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"

export function DeliveryFeatures() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Delivery Features</h3>
      <ul className="space-y-3">
        {[
          "International Express Shipping",
          "Package Tracking",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}