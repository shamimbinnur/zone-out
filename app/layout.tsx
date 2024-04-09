import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

const metaDescription = "Elevate your productivity with our comprehensive suite of tools. Designed to foster deep focus and prevent burnout, Zone Out maximizes efficiency for optimal task management"
export const metadata: Metadata = {
  title: "Zone Out",
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
    title: 'Zone Out',
    siteName: 'Zone Out',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Zone Out',
      },
    ],
  },

  // Twitter
  twitter: {
    title: 'Zone Out',
    site: '@zoneout.me',
    card: 'summary_large_image',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Zone Out',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster gap={4} duration={3000} />
        <Analytics/>
      </body>
    </html>
  );
}
