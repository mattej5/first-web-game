"use client";

import type { AnalyticsEventType } from "@/app/api/events/store";

type TrackOptions = {
  slug?: string;
  referrer?: string;
};

/**
 * Fire-and-forget analytics helper for client interactions.
 *
 * Uses `navigator.sendBeacon()` when available so clicks can be recorded during
 * navigations. Falls back to `fetch()` with `keepalive: true` in other browsers.
 */
export function track(type: AnalyticsEventType, options: TrackOptions = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = JSON.stringify({
    type,
    slug: options.slug,
    referrer: options.referrer ?? window.location.href,
  });

  if (
    typeof navigator !== "undefined" &&
    typeof navigator.sendBeacon === "function"
  ) {
    navigator.sendBeacon(
      "/api/events",
      new Blob([payload], { type: "application/json" })
    );
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Analytics should never block the user flow.
  });
}
