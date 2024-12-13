"use client"

import { Card } from "@/components/ui/card"
import { Globe, Truck, Shield, Clock } from "lucide-react"
import { DeliveryFeatures } from "./delivery-features"
import { DeliveryOptions } from "./delivery-options"
import { DeliveryBenefits } from "./delivery-benefits"

export function DeliveryService() {
  return (
    <div className="mt-8 space-y-8">
      <div className="prose prose-green max-w-none">
        <p className="text-lg text-muted-foreground">
          Our global delivery service ensures your authenticated documents reach their destination securely and on time.
          We partner with trusted international courier services to provide reliable document delivery worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeliveryFeatures />
        <DeliveryOptions />
      </div>

      <DeliveryBenefits />
    </div>
  )
}