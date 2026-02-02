"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { useWindowManager, WindowConfig } from "./WindowManager";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeClose,
} from "react-icons/vsc";

interface WindowProps {
  config: WindowConfig;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Window({ config, children, icon }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updatePosition,
    updateSize,
  } = useWindowManager();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const windowRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - config.position.x,
      y: e.clientY - config.position.y,
    });
    bringToFront(config.id);
  };

  const handleResizeStart = (e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: config.size.width,
      height: config.size.height,
    });
    bringToFront(config.id);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging && !config.isMaximized) {
        const newX = Math.max(
          0,
          Math.min(
            e.clientX - dragStart.x,
            window.innerWidth - config.size.width
          )
        );
        const newY = Math.max(
          40,
          Math.min(e.clientY - dragStart.y, window.innerHeight - 96 - 40)
        );
        updatePosition(config.id, newX, newY);
      }

      if (isResizing && !config.isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = config.position.x;
        let newY = config.position.y;

        // Handle resize based on direction
        if (resizeDirection.includes("e")) {
          newWidth = Math.max(200, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes("w")) {
          const widthChange = Math.min(deltaX, resizeStart.width - 200);
          newWidth = resizeStart.width - widthChange;
          newX = config.position.x + widthChange;
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(150, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes("n")) {
          const heightChange = Math.min(deltaY, resizeStart.height - 150);
          newHeight = resizeStart.height - heightChange;
          newY = config.position.y + heightChange;
        }

        updateSize(config.id, newWidth, newHeight);
        if (newX !== config.position.x || newY !== config.position.y) {
          updatePosition(config.id, newX, newY);
        }
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    isDragging,
    isResizing,
    dragStart,
    resizeStart,
    resizeDirection,
    config,
    updatePosition,
    updateSize,
  ]);

  if (config.isMinimized) return null;

  const windowStyle = config.isMaximized
    ? {
        top: 40,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 136px)",
        zIndex: config.zIndex,
      }
    : {
        top: config.position.y,
        left: config.position.x,
        width: config.size.width,
        height: config.size.height,
        zIndex: config.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`window-appear absolute flex flex-col overflow-hidden rounded-xl bg-white/90 shadow-2xl backdrop-blur-md ${
        isDragging ? "window-dragging" : ""
      }`}
      style={windowStyle}
      onPointerDown={() => bringToFront(config.id)}
    >
      {/* Title Bar */}
      <div
        className="flex h-12 cursor-move items-center justify-between border-b border-gray-200 bg-white/70 px-4 select-none"
        onPointerDown={handlePointerDown}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-xl">{icon}</div>}
          <span className="text-sm font-semibold text-gray-800">
            {config.title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="window-controls flex items-center gap-2">
          <button
            onClick={() => minimizeWindow(config.id)}
            className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
            title="Minimize"
          >
            <VscChromeMinimize className="h-2 w-2 text-yellow-900 opacity-0 hover:opacity-100" />
          </button>
          <button
            onClick={() => maximizeWindow(config.id)}
            className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600"
            title="Maximize"
          >
            <VscChromeMaximize className="h-2 w-2 text-green-900 opacity-0 hover:opacity-100" />
          </button>
          <button
            onClick={() => closeWindow(config.id)}
            className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600"
            title="Close"
          >
            <VscChromeClose className="h-2 w-2 text-red-900 opacity-0 hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white">{children}</div>

      {/* Resize Handles (only show when not maximized) */}
      {!config.isMaximized && (
        <>
          {/* Corners */}
          <button
            type="button"
            aria-label="Resize window north-west"
            tabIndex={-1}
            className="resize-handle-nw absolute top-0 left-0 h-3 w-3 cursor-nwse-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "nw")}
          />
          <button
            type="button"
            aria-label="Resize window north-east"
            tabIndex={-1}
            className="resize-handle-ne absolute top-0 right-0 h-3 w-3 cursor-nesw-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "ne")}
          />
          <button
            type="button"
            aria-label="Resize window south-west"
            tabIndex={-1}
            className="resize-handle-sw absolute bottom-0 left-0 h-3 w-3 cursor-nesw-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "sw")}
          />
          <button
            type="button"
            aria-label="Resize window south-east"
            tabIndex={-1}
            className="resize-handle-se absolute right-0 bottom-0 h-3 w-3 cursor-nwse-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "se")}
          />

          {/* Edges */}
          <button
            type="button"
            aria-label="Resize window north"
            tabIndex={-1}
            className="resize-handle-n absolute top-0 right-3 left-3 h-1 cursor-ns-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "n")}
          />
          <button
            type="button"
            aria-label="Resize window south"
            tabIndex={-1}
            className="resize-handle-s absolute right-3 bottom-0 left-3 h-1 cursor-ns-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "s")}
          />
          <button
            type="button"
            aria-label="Resize window west"
            tabIndex={-1}
            className="resize-handle-w absolute top-3 bottom-3 left-0 w-1 cursor-ew-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "w")}
          />
          <button
            type="button"
            aria-label="Resize window east"
            tabIndex={-1}
            className="resize-handle-e absolute top-3 right-0 bottom-3 w-1 cursor-ew-resize bg-transparent p-0"
            onPointerDown={(e) => handleResizeStart(e, "e")}
          />
        </>
      )}
    </div>
  );
}
