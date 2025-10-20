"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // pick the weights you want
});

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu when Escape is pressed
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="w-full border-b border-white/20 bg-white/80 backdrop-blur-md shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center space-x-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md transition-shadow"
        >
            <Image
                src="/happy_android_no_bg.png"        // or whatever you named the file in /public
                alt="Vin Jones Logo"
                width={40}                // adjust size as needed
                height={40}
                className="rounded-md"
            />
            <div className={`text-2xl font-bold text-gray-800 ${dancing.className}`}>Vin Jones</div>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
          <li><Link href="/projects" className="hover:text-emerald-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md px-1">Projects</Link></li>
          <li><Link href="/about" className="hover:text-emerald-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md px-1">About Me</Link></li>
          <li><Link href="/blog" className="hover:text-emerald-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md px-1">Blog</Link></li>
          <li><Link href="/history" className="hover:text-emerald-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md px-1">History</Link></li>
          <li><Link href="/vinos" className="hover:text-emerald-700 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md px-1">VinOS</Link></li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          ref={toggleButtonRef}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* Icon: hamburger / close */}
          <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
          <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 px-6 pb-4 pt-0 text-gray-800 font-medium bg-white/80 backdrop-blur-sm">
          <li><Link href="/projects" className="block rounded px-2 py-2 hover:bg-white/70 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Projects</Link></li>
          <li><Link href="/about" className="block rounded px-2 py-2 hover:bg-white/70 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">About Me</Link></li>
          <li><Link href="/blog" className="block rounded px-2 py-2 hover:bg-white/70 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Blog</Link></li>
          <li><Link href="/history" className="block rounded px-2 py-2 hover:bg-white/70 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">History</Link></li>
          <li><Link href="/vinos" className="block rounded px-2 py-2 hover:bg-white/70 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">VinOS</Link></li>
        </ul>
      </div>
    </div>
  );
}
