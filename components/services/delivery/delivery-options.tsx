"use client"

import { Card } from "@/components/ui/card"
import { Truck } from "lucide-react"

export function DeliveryOptions() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Service Options</h3>
      <ul className="space-y-3">
        {[
          "Standard International Delivery",
          "Express Priority Service",
          "Economy Shipping",
          "Bulk Document Shipping",
          "Special Handling",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}