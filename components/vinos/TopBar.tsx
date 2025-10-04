"use client";

import { useWindowManager } from './WindowManager';

interface TopBarProps {
  currentTime: Date;
}

export default function TopBar({ currentTime }: TopBarProps) {
  const { windows } = useWindowManager();

  // Get the active (top) window
  const activeWindow = windows.length > 0
    ? windows.reduce((prev, current) => (current.zIndex > prev.zIndex ? current : prev))
    : null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-white/80 backdrop-blur-md topbar-glass border-b border-white/20 z-50 flex items-center justify-between px-4 shadow-sm">
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
