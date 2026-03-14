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
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/20 bg-white/72 p-6 shadow-2xl backdrop-blur-xl lg:flex lg:flex-col">
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

      <div className="px-4 pt-4 sm:px-6 lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-[1.75rem] border border-white/40 bg-white/72 px-4 py-3 shadow-lg backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
        >
          <Image
            src="/happy_android_no_bg.png"
            alt="Vin Jones Logo"
            width={38}
            height={38}
            className="rounded-lg"
          />
          <div className="min-w-0">
            <div
              className={`truncate text-xl font-bold text-slate-900 ${dancing.className}`}
            >
              Vin Jones
            </div>
            <p className="truncate text-sm text-slate-600">
              Builder, engineer, and product-minded problem solver.
            </p>
          </div>
        </Link>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Link
            href="https://github.com/mattej5"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/50 bg-white/72 p-3 text-slate-800 shadow-lg backdrop-blur-xl transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            aria-label="GitHub profile"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/vin-matt-jones/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/50 bg-white/72 p-3 text-slate-800 shadow-lg backdrop-blur-xl transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={18} />
          </Link>
          <Link
            href="mailto:matthew.jones6288@gmail.com?subject=Website%20Inquiry&body=Hi%20Vin%2C"
            className="rounded-full border border-white/50 bg-white/72 p-3 text-slate-800 shadow-lg backdrop-blur-xl transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            aria-label="Send email"
          >
            <FaEnvelope size={18} />
          </Link>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(92vw,30rem)] rounded-[2rem] border border-white/55 bg-slate-950/88 px-3 py-2 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex items-center justify-between gap-1">
          {mobileLinks.map((link) => (
            <li key={link.href} className="min-w-0 flex-1">
              {(() => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[0.68rem] font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                      active
                        ? "bg-white text-slate-950 shadow-lg"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
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
