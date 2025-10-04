"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type WindowType = 'calculator' | 'music' | 'navigation' | 'route';

export interface WindowConfig {
  id: string;
  type: WindowType;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMaximized: boolean;
  isMinimized: boolean;
  route?: string; // For route-based windows
}

interface WindowManagerContextType {
  windows: WindowConfig[];
  openWindow: (type: WindowType, route?: string, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
}

const DEFAULT_WINDOW_CONFIGS: Record<WindowType, Partial<WindowConfig>> = {
  calculator: {
    title: 'Calculator',
    size: { width: 320, height: 480 },
  },
  music: {
    title: 'Music Player',
    size: { width: 640, height: 520 },
  },
  navigation: {
    title: 'Navigation',
    size: { width: 500, height: 400 },
  },
  route: {
    title: 'Route',
    size: { width: 800, height: 600 },
  },
};

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowConfig[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = useCallback((type: WindowType, route?: string, title?: string) => {
    // For route windows, check if this specific route is already open
    const existingWindow = type === 'route'
      ? windows.find((w) => w.type === 'route' && w.route === route)
      : windows.find((w) => w.type === type);

    if (existingWindow) {
      // Bring to front instead of opening new
      bringToFront(existingWindow.id);
      return;
    }

    const config = DEFAULT_WINDOW_CONFIGS[type];
    const newWindow: WindowConfig = {
      id: `${type}-${Date.now()}`,
      type,
      title: title || config.title || 'Window',
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 100 + 80,
      },
      size: config.size || { width: 800, height: 600 },
      zIndex: nextZIndex,
      isMaximized: false,
      isMinimized: false,
      route: route,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              isMinimized: false,
            }
          : w
      )
    );
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, zIndex: nextZIndex, isMinimized: false }
          : w
      )
    );
    setNextZIndex((prev) => prev + 1);
  }, [nextZIndex]);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  }, []);

  const updateSize = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size: { width, height } } : w))
    );
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        bringToFront,
        updatePosition,
        updateSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}
