"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap, Clock, FileCheck, MessageSquare } from "lucide-react"
import { LiaisonFeature } from "./liaison-feature"
import { LiaisonProcess } from "./liaison-process"

export function LiaisonService() {
  return (
    <div className="mt-8 space-y-8">
      <div className="prose prose-green max-w-none">
        <p className="text-lg text-muted-foreground">
          Our university liaison service provides direct communication and coordination with Ethiopian universities
          to expedite your document requests. We maintain strong relationships with university administrators
          to ensure efficient processing of your academic documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LiaisonFeature />
        <LiaisonProcess />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: GraduationCap,
            title: "University Network",
            description: "Direct connections with Ethiopian universities",
          },
          {
            icon: Clock,
            title: "Fast Processing",
            description: "Expedited document processing",
          },
          {
            icon: FileCheck,
            title: "Status Updates",
            description: "Regular updates on request progress",
          },
          {
            icon: MessageSquare,
            title: "Communication",
            description: "Direct liaison with university staff",
          },
        ].map((item) => (
          <Card key={item.title} className="p-6">
            <item.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}