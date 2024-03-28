import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["700", "400", "500"],
  subsets: ["latin"],
});

const metaDescription = "A sleek and user-friendly Pomodoro Timer designed to enhance focus and productivity by helping you efficiently manage work intervals and breaks. Stay on track with your tasks using this intuitive tool tailored for optimal time management."

export const metadata: Metadata = {
  title: "Pomodoro",
  description: metaDescription,
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
    title: 'Pomodoro',
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
    title: 'Pomodoro',
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
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
