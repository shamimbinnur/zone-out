import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["700", "400", "500"],
  subsets: ["latin"],
});

const metaDescription = "Elevate your productivity with our Pomodoro Timer Online. Our timer is meticulously crafted with a distraction-minimizing interface and a soothing green theme, promoting better eye and mental health. Say goodbye to distractions and boost efficiency for optimal task management, standing out amidst a crowded sea of online Pomodoro timers."

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
    canonical: "/tool/pomo",
    languages: {
      "en-US": "/en-US",
    }
  },
   // Open Graph
   openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://zoneout.me',
    title: 'Pomodoro Timer Online',
    siteName: 'Zone Out',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/pomo-og.png` || "",
        width: 1200,
        height: 630,
        alt: 'Zone Out',
      },
    ],
  },

  // Twitter
  twitter: {
    title: 'Pomodoro Timer Online',
    site: '@zoneout.me',
    card: 'summary_large_image',
    description: metaDescription,
    images: [
      {
        url: `${process.env.MY_DOMAIN}/images/pomo-og.png` || "",
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
