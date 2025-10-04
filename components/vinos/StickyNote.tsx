"use client";

import { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

export default function StickyNote() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-40 w-64">
      <div className="bg-yellow-100 rounded-lg shadow-2xl border-t-4 border-yellow-400 overflow-hidden">
        {/* Sticky Note Header */}
        <div className="bg-yellow-200 px-3 py-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-yellow-800">Sticky Note</span>
          <button
            onClick={() => setIsVisible(false)}
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
            title="Close"
          >
            <VscChromeClose className="w-2 h-2 text-white" />
          </button>
        </div>

        {/* Sticky Note Content */}
        <div className="p-4">
          <p className="text-sm text-gray-800 font-handwriting leading-relaxed">
            🚧 <strong>Prototype Phase</strong>
            <br />
            <br />
            This is a work-in-progress demo of VinOS! Some features may be incomplete or experimental.
            <br />
            <br />
            Feel free to explore and have fun! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
