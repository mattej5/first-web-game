"use client";

import Link from "next/link";
import { useCallback } from "react";

type PostListItemProps = {
  slug: string;
  href: string;
  dateLabel: string;
  title: string;
};

export function PostListItem({
  slug,
  href,
  dateLabel,
  title,
}: PostListItemProps) {
  const handleClick = useCallback(() => {
    const payload = JSON.stringify({ slug });
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      navigator.sendBeacon(
        "/api/post-clicks",
        new Blob([payload], { type: "application/json" })
      );
    }
  }, [slug]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="group flex items-center justify-between border-b border-white/8 py-4 transition-colors first:border-t first:border-t-white/8 hover:border-white/15"
    >
      <div className="flex min-w-0 flex-1 items-center gap-6">
        <span className="w-32 shrink-0 font-mono text-xs text-white/30">
          {dateLabel}
        </span>
        <span className="min-w-0 truncate text-sm text-white/70 transition-colors group-hover:text-[#a5e446]">
          {title}
        </span>
      </div>
      <svg
        className="ml-4 h-3.5 w-3.5 shrink-0 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-[#a5e446]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  );
}
