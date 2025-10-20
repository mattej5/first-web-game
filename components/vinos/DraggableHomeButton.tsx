"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const BUTTON_SIZE = 56; // px
const MOVEMENT_THRESHOLD = 6; // px

export function DraggableHomeButton() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 24, y: 64 });
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  const clamp = (value: number, max: number) =>
    Math.min(Math.max(value, 0), Math.max(0, max));

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    movedRef.current = false;
    setIsDragging(true);
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    offsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;
    event.preventDefault();

    const deltaX = event.clientX - pointerStartRef.current.x;
    const deltaY = event.clientY - pointerStartRef.current.y;
    if (!movedRef.current) {
      movedRef.current =
        Math.abs(deltaX) > MOVEMENT_THRESHOLD ||
        Math.abs(deltaY) > MOVEMENT_THRESHOLD;
    }

    if (typeof window === "undefined") {
      return;
    }
    const maxX = Math.max(0, window.innerWidth - BUTTON_SIZE);
    const maxY = Math.max(0, window.innerHeight - BUTTON_SIZE);
    const nextX = clamp(event.clientX - offsetRef.current.x, maxX);
    const nextY = clamp(event.clientY - offsetRef.current.y, maxY);
    setPosition({ x: nextX, y: nextY });
  };

  const endDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
    shouldNavigate: boolean
  ) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
    const navigateHome = shouldNavigate;
    movedRef.current = false;
    if (navigateHome) {
      router.push("/");
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const shouldNavigate = !movedRef.current;
    endDrag(event, shouldNavigate);
  };

  const handlePointerCancel = (
    event: ReactPointerEvent<HTMLButtonElement>
  ) => {
    endDrag(event, false);
  };

  return (
    <button
      type="button"
      aria-label="Return to the main site"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`draggable-home-button absolute z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 ${
        isDragging ? "cursor-grabbing scale-95" : "cursor-grab hover:scale-105"
      }`}
      style={{ top: position.y, left: position.x }}
    >
      <span
        aria-hidden="true"
        className="gradient-border pointer-events-none absolute inset-0 rounded-full"
      />
      <span
        aria-hidden="true"
        className="inner-disc pointer-events-none absolute inset-[3px] rounded-full bg-white"
      />
      <span className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
        <Image
          src="/favicon.ico"
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          priority
        />
      </span>
      <style jsx>{`
        @keyframes border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .draggable-home-button {
          position: absolute;
        }

        .draggable-home-button .gradient-border {
          background: conic-gradient(
            from 0deg,
            #2563eb 0%,
            #5eead4 45%,
            #a855f7 90%,
            #2563eb 100%
          );
          z-index: 0;
          animation: border-spin 8s linear infinite;
        }

        .draggable-home-button .inner-disc {
          z-index: 1;
        }
      `}</style>
    </button>
  );
}
