"use client";

import { useEffect } from "react";
import type { AnchorHTMLAttributes } from "react";
import type { AnalyticsEventType } from "@/app/api/events/store";
import { track } from "@/lib/analytics";

/** Fires a one-time page_view event on mount. Drop into any server page. */
export function PageView({ slug }: { slug: string }) {
  useEffect(() => {
    track("page_view", { slug });
  }, [slug]);
  return null;
}

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventType: AnalyticsEventType;
  slug: string;
};

/** An <a> that fires an analytics event on click before navigating. */
export function TrackedLink({
  eventType,
  slug,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(eventType, { slug });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
