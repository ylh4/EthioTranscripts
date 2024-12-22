import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import GoogleAnalytics from '@/components/analytics/google-analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'EthioTranscripts',
    template: '%s | EthioTranscripts',
  },
  description: 'Request and manage your academic transcripts from Ethiopian universities',
  keywords: [
    'transcripts',
    'academic documents',
    'Ethiopian universities',
    'document authentication',
    'document translation',
  ],
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
          {children}
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}