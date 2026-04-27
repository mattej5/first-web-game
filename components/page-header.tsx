"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAVIGATION_LINKS } from "@/lib/navigation";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export function SiteHeader() {
  const pathname = usePathname();
  const mobileLinks = NAVIGATION_LINKS.filter(
    (link) => link.href !== "/" && link.includeInMobile !== false
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 p-5 max-lg:!hidden lg:flex lg:flex-col">
        <Link
          href="/"
          className="rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5e446]"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/happy_android_no_bg.png"
              alt="Vin Jones Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-base font-semibold text-white">
              Vin Jones
            </span>
          </div>
        </Link>

        <nav className="mt-6" aria-label="Primary">
          <ul className="space-y-1">
            {NAVIGATION_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5e446] ${
                      active
                        ? "border-l-2 border-[#a5e446] pl-[10px] text-[#a5e446]"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTAs pinned to bottom */}
        <div className="mt-auto space-y-2 pt-6">
          <Link
            href="https://calendly.com/matthew-jones6288/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded bg-[#a5e446] px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5e446]"
          >
            Book a Call →
          </Link>
          <Link
            href="/projects"
            className="flex w-full items-center justify-center rounded border border-white/15 px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-white/70 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5e446]"
          >
            View My Projects →
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5e446]"
        >
          <Image
            src="/happy_android_no_bg.png"
            alt="Vin Jones Logo"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-base font-semibold text-white">Vin Jones</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="https://calendly.com/matthew-jones6288/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#a5e446] px-3 py-1.5 font-mono text-xs font-medium tracking-wide text-black transition-opacity hover:opacity-90"
          >
            Book a Call →
          </Link>
          <Link
            href="https://github.com/mattej5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-[#a5e446]"
            aria-label="GitHub profile"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/vin-matt-jones/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-[#a5e446]"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={18} />
          </Link>
          <Link
            href="mailto:matthew.jones6288@gmail.com?subject=Website%20Inquiry&body=Hi%20Vin%2C"
            className="text-white/50 transition-colors hover:text-[#a5e446]"
            aria-label="Send email"
          >
            <FaEnvelope size={18} />
          </Link>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-white/10 bg-black/90 px-2 pt-2 pb-6 backdrop-blur-2xl lg:hidden"
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
                        ? "text-[#a5e446]"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-transform ${active ? "scale-110" : "opacity-70"}`}
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
