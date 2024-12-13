import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import StructuredData from './structured-data'
import GoogleAnalytics from '@/components/analytics/google-analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ethiotranscripts.com'),
  title: {
    default: 'EthioTranscripts - Academic Document Procurement Service',
    template: '%s | EthioTranscripts'
  },
  description: 'Streamline your academic document procurement from Ethiopian universities. Fast, secure, and reliable transcript and document processing service.',
  keywords: [
    'Ethiopian transcripts',
    'academic documents',
    'university transcripts',
    'document procurement',
    'Ethiopian universities',
    'transcript service',
    'academic records',
    'document translation',
    'apostille service',
    'education verification'
  ],
  authors: [{ name: 'EthioTranscripts' }],
  creator: 'EthioTranscripts',
  publisher: 'EthioTranscripts',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ethiotranscripts.com',
    title: 'EthioTranscripts - Academic Document Procurement Service',
    description: 'Streamline your academic document procurement from Ethiopian universities. Fast, secure, and reliable transcript and document processing service.',
    siteName: 'EthioTranscripts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EthioTranscripts - Academic Document Procurement Service',
    description: 'Streamline your academic document procurement from Ethiopian universities. Fast, secure, and reliable transcript and document processing service.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://ethiotranscripts.com" />
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <GoogleAnalytics />
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}