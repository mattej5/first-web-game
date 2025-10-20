"use client";

import { useState } from 'react';
import Image from 'next/image';
import TopBar from './TopBar';
import Dock from './Dock';
import StickyNote from './StickyNote';
import { WindowManagerProvider } from './WindowManager';
import WindowRenderer from './WindowRenderer';
import { DraggableHomeButton } from './DraggableHomeButton';
import '../../app/(vinos-standalone)/vinos/vinos.css';

export default function Desktop() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <WindowManagerProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        <DraggableHomeButton />
        {/* Gradient Background (same as site) */}
        <div
          className="absolute inset-0 -z-20 vin-gradient"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #059669 25%, #10b981 50%, #06b6d4 75%, #0ea5e9 100%)',
            backgroundSize: '400% 400%',
            backgroundAttachment: 'fixed',
            animation: 'var(--gradient-animation)',
          }}
        />

        {/* VinOS.png Overlay */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="relative w-[90%] h-[90%] opacity-20">
            <Image
              src="/VinOS.png"
              alt=""
              aria-hidden="true"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Top Menu Bar */}
        <TopBar currentTime={currentTime} />

        {/* Sticky Note */}
        <StickyNote />

        {/* Windows Container */}
        <div className="absolute inset-0 top-10 bottom-24 overflow-hidden">
          <WindowRenderer />
        </div>

        {/* Dock */}
        <Dock />
      </div>

      {/* Gradient animation keyframe */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </WindowManagerProvider>
  );
}

