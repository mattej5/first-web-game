// app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Dancing_Script } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],  // Optional: specify weights
  display: "swap",         // Ensures no flash-of-unstyled-text
  variable: "--font-dancing-script",
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

export const metadata: Metadata = {
  title: "Vin's Portfolio",
  description: "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Vin's Portfolio",
    description: "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
    siteName: "Vin Jones Portfolio",
    images: [
      {
        url: `${siteUrl}/headshot_IS_square.jpg`,
        width: 1200,
        height: 1200,
        alt: "Vin Jones smiling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vin's Portfolio",
    description: "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
    images: [`${siteUrl}/headshot_IS_square.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${nunito.variable} ${dancing.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
