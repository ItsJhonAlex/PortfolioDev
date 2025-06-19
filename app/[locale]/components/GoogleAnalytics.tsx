"use client"

import Script from 'next/script'

interface GoogleAnalyticsProps {
  GA_TRACKING_ID?: string
}

export default function GoogleAnalytics({ GA_TRACKING_ID }: GoogleAnalyticsProps) {
  if (!GA_TRACKING_ID || GA_TRACKING_ID === 'your_ga_tracking_id_here') {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
} 