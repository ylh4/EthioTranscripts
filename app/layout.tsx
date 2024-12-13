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
    // General Keywords
    'Ethiopian academic transcripts',
    'Ethiopian transcript services',
    'Ethiopian degree certificates',
    'Transcript procurement Ethiopia',
    'Academic document services Ethiopia',
    'Educational document authentication Ethiopia',
    'Official transcript request Ethiopia',
    'Ethiopian transcript authentication',
    'Document authentication Ethiopia',
    'Academic certification Ethiopia',
    'Legalization of academic documents Ethiopia',

    // Translation Services
    'Document translation Ethiopia',
    'Academic document translation Ethiopia',
    'Certified translation services Ethiopia',
    'Ethiopian document translation for study abroad',

    // Document Requests
    'How to request transcripts from Ethiopian universities',
    'Request Ethiopian degree certificates online',
    'Medium of instruction letter Ethiopia',
    'E-transcript services Ethiopia',

    // Targeted University Keywords
    'Addis Ababa University transcripts',
    'Mekelle University document services',
    'Haramaya University transcripts',
    'Bahir Dar University academic records',
    'Hawassa University degree authentication',
    'Jimma University document request',
    'Arbaminch University transcripts',
    'Adama Science and Technology University transcripts',
    'Gondar University transcripts',
    'Woldia University transcripts',

    // For the Diaspora
    'Ethiopian transcript services for diaspora',
    'Document authentication for Ethiopian expats',
    'Ethiopian academic certificates abroad',
    'How to get Ethiopian transcripts',
    'Ethiopian document services for international students',

    // Global and International
    'Obtain Ethiopian academic transcripts abroad',
    'Study abroad document services Ethiopia',
    'International transcript requests Ethiopia',
    'Ethiopian education document services for global users',

    // Problem-Solving
    'How to get official transcripts from Ethiopia',
    'Lost degree certificate Ethiopia',
    'How to authenticate Ethiopian educational documents',
    'Fast document authentication Ethiopia',
    'Reliable transcript services Ethiopia',

    // Service Features
    'Online transcript tracking Ethiopia',
    'Transparent transcript services Ethiopia',
    'Secure document services Ethiopia',
    'Fast academic record procurement Ethiopia',

    // Payment and Local Services
    'Ethiopian transcript service fees',
    'Payment for Ethiopian academic documents',
    'Transcript services in Addis Ababa',
    'Document services for Ethiopian universities',

    // Long-Tail Keywords
    'How to get transcripts from Addis Ababa University',
    'Best Ethiopian academic document services',
    'Fastest transcript procurement services Ethiopia',
    'Simplified Ethiopian degree authentication process',
    'International students Ethiopian transcript solutions',

    // Event-Specific
    'Transcripts for Ethiopian students studying abroad',
    'Documents for Ethiopian university graduates',
    'Ethiopian transcript services for visa applications',
    'Ethiopian degree authentication for job applications'
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