"use client";

import { usePathname } from 'next/navigation';
import { SiteHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/page-footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't wrap VinOS page
  if (pathname === '/vinos') {
    return <>{children}</>;
  }

  // Regular page layout
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <header className="flex-shrink-0">
        <SiteHeader />
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow max-w-7xl mx-auto px-6 py-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {children}
        </div>
      </main>
      <footer className="flex-shrink-0">
        <SiteFooter />
      </footer>
    </>
  );
}
