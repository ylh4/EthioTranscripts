"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, FileText, Globe, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"

export default function HomePage() {
  return (
    <PageLayout className="p-0">
      {/* Hero Section */}
      <header className="relative bg-primary/5 py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your Bridge to Ethiopian Academic Documents
              </h1>
              <p className="text-xl text-muted-foreground">
                Streamlined procurement and authentication of transcripts and certificates from Ethiopian universities worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/request">Request Documents</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/request/status">Track Request</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-full p-8">
                <FileText className="w-full h-full text-primary opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EthioTranscripts?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Service clients worldwide with efficient document procurement from Ethiopian universities.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Complete Solutions</h3>
              <p className="text-muted-foreground">
                Handle everything from transcript requests to authentication and translation services.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Documents</h3>
              <p className="text-muted-foreground">
                Ensure authenticity with our comprehensive verification process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Begin your document request process today and let us handle the rest.
          </p>
          <Button asChild size="lg">
            <Link href="/request">Submit Your Request</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}