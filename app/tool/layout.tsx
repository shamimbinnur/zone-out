import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["700", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Productivity Tool -  Zone Out",
  description: "Zone Out brings you productivity tools to help you focus on your work and avoid burnout.",
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
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
