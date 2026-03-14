"use client";

import { useWindowManager } from "./WindowManager";

interface TopBarProps {
  currentTime: Date;
}

export default function TopBar({ currentTime }: TopBarProps) {
  const { windows } = useWindowManager();

  // Get the active (top) window
  const activeWindow =
    windows.length > 0
      ? windows.reduce((prev, current) =>
          current.zIndex > prev.zIndex ? current : prev
        )
      : null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="topbar-glass fixed top-0 right-0 left-0 z-50 flex h-10 items-center justify-between border-b border-white/20 bg-white/80 px-4 shadow-sm backdrop-blur-md">
      {/* Left: VinOS logo and App Name */}
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-gray-800">VinOS</span>
        {activeWindow && (
          <>
            <span className="text-gray-400">|</span>
            <span className="text-sm font-semibold text-gray-800">
              {activeWindow.title}
            </span>
          </>
        )}
      </div>

      {/* Right: Date and Time */}
      <div className="flex items-center gap-3 text-sm text-gray-800">
        <span>{formatDate(currentTime)}</span>
        <span className="font-medium">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}
