import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from 'sonner'
import "./globals.css";
import { twMerge } from 'tailwind-merge'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
})

const metaDescription = "Boost your productivity using the smartest and most curated tools. We glue you to your work, not to our app."
export const metadata: Metadata = {
  title: "ZoneOut",
  description: metaDescription,
  metadataBase: new URL("https://zoneout.me"),
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    { 
      rel: "apple-touch-icon",
      url: "/favicon.ico",
    }
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    }
  },
   // Open Graph
   openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://zoneout.me',
    title: 'ZoneOut',
    siteName: 'ZoneOut',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/og.png` || "",
        width: 1200,
        height: 630,
        alt: 'ZoneOut',
      },
    ],
  },

  // Twitter
  twitter: {
    title: 'ZoneOut',
    site: 'https://zoneout.me',
    card: 'summary_large_image',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/og.png` || "",
        width: 1200,
        height: 630,
        alt: 'ZoneOut',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(
        inter.className,
        inter.variable,
        archivo.variable,
      )}>
        {children}
        <Toaster gap={4} duration={3000} />
        <Analytics/>
      </body>
    </html>
  );
}
