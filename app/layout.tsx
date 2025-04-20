import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const metaDescription =
  "Tomato is a Pomodoro Timer, is truly designed to keep you focused. Sleek design, and greenish theme to ease your eyes, just one click away to start focusing.";

export const metadata: Metadata = {
  title: "Tomato Pomodoro Timer",
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
    },
  ],
  alternates: {
    canonical: "/pomo",
    languages: {
      "en-US": "/en-US",
    },
  },
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://zoneout.me/pomo",
    title: "Tomato Pomodoro Timer",
    siteName: "ZoneOut",
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/pomo-og.png` || "",
        width: 1200,
        height: 630,
        alt: "Online Pomodoro Timer",
      },
    ],
  },

  // Twitter
  twitter: {
    title: "Tomato Pomodoro Timer Online",
    site: "https://zoneout.me/pomo",
    card: "summary_large_image",
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/pomo-og.png` || "",
        width: 1200,
        height: 630,
        alt: "Pomodoro Timer Online",
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
      <body
        className={twMerge(inter.className, inter.variable, archivo.variable)}
      >
        {children}
        <Toaster gap={4} duration={3000} />
        <Analytics />
      </body>
    </html>
  );
}
