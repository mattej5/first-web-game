"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAVIGATION_LINKS } from "@/lib/navigation";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function SiteHeader() {
  const pathname = usePathname();
  const mobileLinks = NAVIGATION_LINKS.filter(
    (link) => link.href !== "/" && link.includeInMobile !== false
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <aside className="sticky top-0 hidden max-lg:!hidden h-screen w-72 shrink-0 border-r border-white/20 bg-white/72 p-6 shadow-2xl backdrop-blur-xl lg:flex lg:flex-col">
        <Link
          href="/"
          className="rounded-3xl border border-emerald-900/10 bg-white/75 p-4 shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/happy_android_no_bg.png"
              alt="Vin Jones Logo"
              width={44}
              height={44}
              className="rounded-xl"
            />
            <div>
              <div
                className={`text-2xl font-bold text-slate-900 ${dancing.className}`}
              >
                Vin Jones
              </div>
            </div>
          </div>
        </Link>

        <nav className="mt-8" aria-label="Primary">
          <ul className="space-y-2">
            {NAVIGATION_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 ${
                      active
                        ? "bg-emerald-900 text-white shadow-lg shadow-emerald-950/20"
                        : "text-slate-700 hover:bg-white/80 hover:text-emerald-800"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${active ? "text-emerald-200" : ""}`}
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/20 bg-white/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <Image
            src="/happy_android_no_bg.png"
            alt="Vin Jones Logo"
            width={32}
            height={32}
            className="rounded-lg shadow-sm"
          />
          <span className={`text-xl font-bold text-slate-900 ${dancing.className}`}>
            Vin Jones
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/mattej5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 transition-colors hover:text-emerald-800"
            aria-label="GitHub profile"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/vin-matt-jones/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 transition-colors hover:text-emerald-800"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            href="mailto:matthew.jones6288@gmail.com?subject=Website%20Inquiry&body=Hi%20Vin%2C"
            className="text-slate-700 transition-colors hover:text-emerald-800"
            aria-label="Send email"
          >
            <FaEnvelope size={20} />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-slate-200/50 bg-white/90 px-2 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-2xl lg:hidden"
      >
        <ul className="flex items-center justify-around gap-1">
          {mobileLinks.map((link) => (
            <li key={link.href} className="flex-1">
              {(() => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex flex-col items-center justify-center gap-1 py-1 text-[0.7rem] font-medium transition-colors ${
                      active
                        ? "text-emerald-700"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon 
                      className={`h-6 w-6 shrink-0 transition-transform ${
                        active ? "scale-110 opacity-100" : "opacity-80"
                      }`} 
                    />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })()}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
