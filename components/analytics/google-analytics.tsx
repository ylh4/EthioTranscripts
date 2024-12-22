'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { SearchParamsWrapper } from '../layout/search-params-wrapper'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <SearchParamsWrapper>
        {(searchParams) => {
          useEffect(() => {
            if (!GA_MEASUREMENT_ID) return

            gtag('config', GA_MEASUREMENT_ID, {
              page_path: pathname + searchParams.toString(),
            })
          }, [pathname, searchParams])

          return null
        }}
      </SearchParamsWrapper>
    </>
  )
} 