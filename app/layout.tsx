import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zone Out",
  description: "Have you been zoning out lately?",
  metadataBase: new URL("https://zoneout.me"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
