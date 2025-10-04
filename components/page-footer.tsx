"use client";

import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/20 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 space-y-4 md:space-y-0">
        <p className="text-gray-800 text-sm">
          © {new Date().getFullYear()} Vin Jones. All rights reserved.
        </p>

        <div className="flex space-x-6 text-gray-800">
          <Link
            href="https://github.com/mattej5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </Link>

          <Link
            href="https://www.linkedin.com/in//vin-matt-jones/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </Link>

          <Link
            href="mailto:matthew.jones6288@gmail.com?subject=Website%20Inquiry&body=Hi%20Vin%2C"
            aria-label="Email"
            className="hover:text-green-600 transition-colors duration-200"
          >
            <FaEnvelope size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
