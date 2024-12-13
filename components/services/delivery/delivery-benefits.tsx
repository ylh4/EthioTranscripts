"use client"

import { Card } from "@/components/ui/card"
import { Shield, Globe, Clock } from "lucide-react"

export function DeliveryBenefits() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <Shield className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Secure Handling</h3>
        <p className="text-muted-foreground">
          Your documents are handled with utmost care and security throughout the delivery process.
        </p>
      </Card>

      <Card className="p-6">
        <Globe className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Global Coverage</h3>
        <p className="text-muted-foreground">
          We deliver to educational institutions and organizations worldwide.
        </p>
      </Card>

      <Card className="p-6">
        <Clock className="h-8 w-8 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Timely Delivery</h3>
        <p className="text-muted-foreground">
          Choose from various delivery speeds to meet your timeline requirements.
        </p>
      </Card>
    </div>
  )
}