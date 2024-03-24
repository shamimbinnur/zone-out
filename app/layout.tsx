import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zone out",
  description: "Have you been zoning out lately?",
  metadataBase: new URL("https://zoneout.me"),
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
    title: 'Zone out | Curated collection of your ultimate productivity tools',
    siteName: 'Zone uut',
    description: "Curated collection of your ultimate productivity tools",
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Zone out',
      },
    ],
  },

  // Twitter
  twitter: {
    title: 'Zone out | Curated collection of your ultimate productivity tools',
    site: '@zoneout.me',
    card: 'summary_large_image',
    description: "Curated collection of your ultimate productivity tools",
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Zone out',
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
        <Analytics/>
      </body>
    </html>
  );
}
