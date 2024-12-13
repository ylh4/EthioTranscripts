"use client"

import { Card } from "@/components/ui/card"
import { 
  FileText, 
  MessageSquare, 
  Upload, 
  CreditCard, 
  CheckCircle, 
  Truck 
} from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Submit Request",
    description: "Fill out our simple form and receive a unique reference number"
  },
  {
    icon: MessageSquare,
    title: "Initial Contact",
    description: "Our team contacts you within 24 hours via email and WhatsApp"
  },
  {
    icon: Upload,
    title: "Document Upload",
    description: "Upload required supplemental documents (e.g., cost sharing forms)"
  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Review cost breakdown and complete payment"
  },
  {
    icon: CheckCircle,
    title: "Processing",
    description: "Our agents handle procurement and authentication"
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Documents are delivered according to your preferences"
  }
]

export function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <Card key={step.title} className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 