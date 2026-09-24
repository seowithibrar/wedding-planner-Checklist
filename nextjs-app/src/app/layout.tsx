import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/global.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.weddingplanningchecklists.org'),
  title: 'Wedding Planning Checklist, Timelines & Free Tools',
  description:
    'Free wedding planning checklist, step-by-step guide, budget calculator & 14 planning tools. Timelines for every stage, incl. Pakistani & Indian weddings.',
  verification: {
    google: 'HJSSJg6QdsmjvAnJA7IyDTThTiUjUa05IN-KsvdkTsI',
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.weddingplanningchecklists.org/',
    title: 'Wedding Planning Checklist & Free Wedding Planning Tools',
    description:
      'Plan your wedding step by step with a free checklist, budget calculator, timelines, and 14 interactive tools — including Pakistani and Indian wedding checklists.',
    images: [
      {
        url: '/wedding-planning-checklist-hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Free wedding planning checklist and budget planner',
      },
    ],
    locale: 'en_US',
    siteName: 'WeddingPlanningChecklists.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Planning Checklist & Free Wedding Planning Tools',
    description:
      'Plan your wedding step by step with a free checklist, budget calculator, timelines, and 14 interactive tools — including Pakistani and Indian wedding checklists.',
    images: ['/wedding-planning-checklist-hero.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect & DNS Prefetch for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Google Fonts: Metric-identical to original site */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600..900;1,600..900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W23SV6KX');`,
          }}
        />
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-88XTBS55X4"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-88XTBS55X4');
            `,
          }}
        />
      </head>
      <body className="bg-[#FAFAFA] text-[#1A1A1A] antialiased selection:bg-[#FCECF0] selection:text-[#1A1A1A] font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W23SV6KX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
