"use client";

import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export function SiteFooter() {
  return (
    <div className="w-full border-t border-white/20 bg-white/80 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-4 px-6 py-4 md:flex-row md:space-y-0">
        <p className="text-sm text-gray-800">
          Copyright {new Date().getFullYear()} Vin Jones. All rights reserved.
        </p>

        <div className="flex space-x-6 text-gray-800">
          <Link
            href="https://github.com/mattej5"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-emerald-700"
            aria-label="GitHub profile"
          >
            <span className="sr-only">GitHub profile</span>
            <FaGithub size={24} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/vin-matt-jones/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-emerald-700"
            aria-label="LinkedIn profile"
          >
            <span className="sr-only">LinkedIn profile</span>
            <FaLinkedin size={24} />
          </Link>

          <Link
            href="mailto:matthew.jones6288@gmail.com?subject=Website%20Inquiry&body=Hi%20Vin%2C"
            aria-label="Send email"
            className="transition-colors duration-200 hover:text-emerald-700"
          >
            <span className="sr-only">Send email</span>
            <FaEnvelope size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
