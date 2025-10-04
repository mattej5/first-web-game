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
      <SiteHeader />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
