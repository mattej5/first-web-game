"use client";

import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export function SiteFooter() {
  return (
    <div className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-4 px-6 py-4 md:flex-row md:space-y-0">
        <p className="font-mono text-xs text-white/30">
          © {new Date().getFullYear()} Vin Jones. All rights reserved.
        </p>

        <div className="flex space-x-5 text-white/40">
          <Link
            href="https://github.com/mattej5"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#a5e446]"
            aria-label="GitHub profile"
          >
            <span className="sr-only">GitHub profile</span>
            <FaGithub size={20} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/vin-matt-jones/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#a5e446]"
            aria-label="LinkedIn profile"
          >
            <span className="sr-only">LinkedIn profile</span>
            <FaLinkedin size={20} />
          </Link>

          <Link
            href="mailto:matthew.jones6288@gmail.com?subject=Website%20Inquiry&body=Hi%20Vin%2C"
            aria-label="Send email"
            className="transition-colors hover:text-[#a5e446]"
          >
            <span className="sr-only">Send email</span>
            <FaEnvelope size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
