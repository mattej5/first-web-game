"use client";

import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

export default function StickyNote() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-40 w-64">
      <div className="overflow-hidden rounded-lg border-t-4 border-yellow-400 bg-yellow-100 shadow-2xl">
        {/* Sticky Note Header */}
        <div className="flex items-center justify-between bg-yellow-200 px-3 py-2">
          <span className="text-xs font-semibold text-yellow-800">
            Sticky Note
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
            title="Close"
          >
            <VscChromeClose className="h-2 w-2 text-white" />
          </button>
        </div>

        {/* Sticky Note Content */}
        <div className="p-4">
          <p className="font-handwriting text-sm leading-relaxed text-gray-800">
            🚧 <strong>Prototype Phase</strong>
            <br />
            <br />
            This is a work-in-progress demo of VinOS! Some features may be
            incomplete or experimental.
            <br />
            <br />
            Feel free to explore and have fun! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
