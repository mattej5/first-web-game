"use client";

import { useEffect, useState } from "react";

const metaFont =
  "'Departure Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1_000) % 60);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

/** Live DD:HH:MM:SS countdown to a target date. */
export function Countdown({
  target,
  label,
}: {
  target: string;
  label: string;
}) {
  const targetMs = new Date(target).getTime();
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getRemaining
  > | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span
        className="text-[#808080]"
        style={{
          fontFamily: metaFont,
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        className="text-[#A5E446] tabular-nums"
        style={{ fontFamily: metaFont, fontSize: "15px" }}
      >
        {remaining
          ? remaining.done
            ? "00:00:00:00"
            : `${pad(remaining.days)}:${pad(remaining.hours)}:${pad(
                remaining.minutes
              )}:${pad(remaining.seconds)}`
          : "--:--:--:--"}
      </span>
    </div>
  );
}
