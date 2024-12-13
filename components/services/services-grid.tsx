"use client"

import { FileText, GraduationCap, Globe, Languages, CheckSquare } from "lucide-react"
import { ServiceCard } from "./service-card"

const services = [
  {
    title: "Document Request",
    description: "Request academic transcripts, certificates, and other documents from Ethiopian universities",
    icon: FileText,
    href: "/request"
  },
  {
    title: "Authentication",
    description: "Verify and authenticate your academic documents through official channels",
    icon: CheckSquare,
    href: "/services/authentication"
  },
  {
    title: "Translation",
    description: "Professional translation services for your academic documents",
    icon: Languages,
    href: "/services/translation"
  },
  {
    title: "Global Delivery",
    description: "Secure worldwide delivery of your authenticated documents",
    icon: Globe,
    href: "/services/delivery"
  },
  {
    title: "University Liaison",
    description: "Direct coordination with Ethiopian universities for document procurement",
    icon: GraduationCap,
    href: "/services/liaison"
  }
]

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  )
}