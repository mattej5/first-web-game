import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Vin Jones' Portfolio",
  description: "Showcasing my work and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <header className="w-full border-b bg-slate-300">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold text-gray-700">
                Vin Jones
              </div>
            </Link>
            <ul className="flex space-x-6 text-gray-700 font-medium">
              <li>
                <Link href="/projects" className="hover:text-green-600">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-600">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-green-600">
                  History
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
