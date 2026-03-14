"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/page-footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't wrap VinOS page
  if (pathname === "/vinos") {
    return <>{children}</>;
  }

  // Regular page layout
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="flex min-h-screen">
        <SiteHeader />
        <div className="flex min-w-0 flex-1 flex-col">
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-7xl flex-grow px-4 py-6 pb-28 sm:px-6 md:py-8 lg:px-8 lg:pb-8"
          >
            <div className="rounded-[2rem] border border-white/35 bg-white/82 p-6 shadow-2xl backdrop-blur-md md:p-8">
              {children}
            </div>
          </main>
          <footer className="px-4 pb-28 sm:px-6 lg:px-8 lg:pb-8">
            <SiteFooter />
          </footer>
        </div>
      </div>
    </>
  );
}
