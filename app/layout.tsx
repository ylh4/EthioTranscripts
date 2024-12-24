import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import SuspenseWrapper from '@/components/layout/suspense-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'EthioTranscripts',
    template: '%s | EthioTranscripts',
  },
  description: 'Request and manage your academic transcripts from Ethiopian universities',
  metadataBase: new URL('https://www.ethiotranscripts.com'),
  openGraph: {
    type: 'website',
    siteName: 'EthioTranscripts',
    title: 'EthioTranscripts',
    description: 'Request and manage your academic transcripts from Ethiopian universities',
    url: 'https://www.ethiotranscripts.com',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.ethiotranscripts.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EthioTranscripts',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ethiotranscripts',
    title: 'EthioTranscripts',
    description: 'Request and manage your academic transcripts from Ethiopian universities',
    images: ['https://www.ethiotranscripts.com/og-image.jpg'],
  },
  keywords: [
    'transcripts',
    'academic documents',
    'Ethiopian universities',
    'document authentication',
    'document translation',
  ],
  alternates: {
    canonical: 'https://www.ethiotranscripts.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SuspenseWrapper>
            {children}
          </SuspenseWrapper>
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}