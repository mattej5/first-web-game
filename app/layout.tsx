// app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/page-header";
import { Dancing_Script } from "next/font/google"
import { SiteFooter } from "@/components/page-footer";

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

export const metadata: Metadata = {
  title: "Vin Jones' Portfolio",
  description: "Showcasing my work and projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />

        {/* main grows to push footer down */}
        <main className="flex-grow max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}

