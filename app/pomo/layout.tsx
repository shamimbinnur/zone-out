import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins = Poppins({
  weight: ["700", "400", "500"],
  subsets: ["latin"],
});

const metaDescription = "Online Pomodoro Timer, is truly designed to keep you focused. Sleek design, and greenish theme to ease your eyes, just one click away to start focusing."

export const metadata: Metadata = {
  title: "Pomodoro Timer Online",
  description: metaDescription,
  metadataBase: new URL("https://zoneout.me"),
  icons: [
    {
      rel: "icon",
      url: "/tomato.ico",
    },
    { 
      rel: "apple-touch-icon",
      url: "/tomato.ico",
    }
  ],
  alternates: {
    canonical: "/pomo",
    languages: {
      "en-US": "/en-US",
    }
  },
   // Open Graph
   openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://zoneout.me/pomo',
    title: 'Online Pomodoro Timer',
    siteName: 'ZoneOut',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/pomo-og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Online Pomodoro Timer',
      },
    ],
  },

  // Twitter
  twitter: {
    title: 'Pomodoro Timer Online',
    site: 'https://zoneout.me/pomo',
    card: 'summary_large_image',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/pomo-og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Pomodoro Timer Online',
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
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
