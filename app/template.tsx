"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/page-footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/vinos") {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[#a5e446] focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <div className="orb orb-green" aria-hidden="true" />
      <div className="orb orb-indigo" aria-hidden="true" />
      <div className="relative flex min-h-screen w-full flex-col lg:flex-row">
        <SiteHeader />
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-7xl flex-grow px-4 py-6 pb-28 sm:px-6 md:py-8 lg:px-8 lg:pb-8"
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm md:p-8">
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
