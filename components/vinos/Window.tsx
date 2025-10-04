"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useWindowManager, WindowConfig } from './WindowManager';
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc';

interface WindowProps {
  config: WindowConfig;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Window({ config, children, icon }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition, updateSize } = useWindowManager();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - config.position.x,
      y: e.clientY - config.position.y,
    });
    bringToFront(config.id);
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
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
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !config.isMaximized) {
        const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - config.size.width));
        const newY = Math.max(40, Math.min(e.clientY - dragStart.y, window.innerHeight - 96 - 40));
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
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(200, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          const widthChange = Math.min(deltaX, resizeStart.width - 200);
          newWidth = resizeStart.width - widthChange;
          newX = config.position.x + widthChange;
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(150, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
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

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, resizeDirection, config, updatePosition, updateSize]);

  if (config.isMinimized) return null;

  const windowStyle = config.isMaximized
    ? {
        top: 40,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 136px)',
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
      className={`absolute bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col window-appear ${
        isDragging ? 'window-dragging' : ''
      }`}
      style={windowStyle}
      onMouseDown={() => bringToFront(config.id)}
    >
      {/* Title Bar */}
      <div
        className="h-12 bg-white/70 border-b border-gray-200 flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-xl">{icon}</div>}
          <span className="text-sm font-semibold text-gray-800">{config.title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-2 window-controls">
          <button
            onClick={() => minimizeWindow(config.id)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            title="Minimize"
          >
            <VscChromeMinimize className="w-2 h-2 text-yellow-900 opacity-0 hover:opacity-100" />
          </button>
          <button
            onClick={() => maximizeWindow(config.id)}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            title="Maximize"
          >
            <VscChromeMaximize className="w-2 h-2 text-green-900 opacity-0 hover:opacity-100" />
          </button>
          <button
            onClick={() => closeWindow(config.id)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            title="Close"
          >
            <VscChromeClose className="w-2 h-2 text-red-900 opacity-0 hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>

      {/* Resize Handles (only show when not maximized) */}
      {!config.isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize resize-handle-nw"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize resize-handle-ne"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize resize-handle-sw"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize resize-handle-se"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />

          {/* Edges */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize resize-handle-n"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize resize-handle-s"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize resize-handle-w"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize resize-handle-e"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </div>
  );
}
