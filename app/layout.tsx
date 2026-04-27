import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

export const metadata: Metadata = {
  title: "Vin's Portfolio",
  description:
    "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Vin's Portfolio",
    description:
      "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
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
    description:
      "Master's student in Information Systems at BYU specializing in predictive analytics, secure software development, and cloud engineering solutions.",
    images: [`${siteUrl}/headshot_IS_square.jpg`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className="flex min-h-screen flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
