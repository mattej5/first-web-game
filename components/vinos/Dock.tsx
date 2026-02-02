"use client";

import { useState } from "react";
import { useWindowManager } from "./WindowManager";
import {
  MdCalculate,
  MdMusicNote,
  MdApps,
  MdWork,
  MdPerson,
  MdArticle,
  MdHistory,
  MdHome,
  MdGames,
} from "react-icons/md";

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  color: string;
}

export default function Dock() {
  const { openWindow } = useWindowManager();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems: DockItem[] = [
    {
      id: "home",
      label: "Home",
      icon: MdHome,
      action: () => openWindow("route", "/", "Home"),
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "about",
      label: "About",
      icon: MdPerson,
      action: () => openWindow("route", "/about", "About Me"),
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "projects",
      label: "Projects",
      icon: MdWork,
      action: () => openWindow("route", "/projects", "Projects"),
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "blog",
      label: "Blog",
      icon: MdArticle,
      action: () => openWindow("route", "/blog", "Blog"),
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "history",
      label: "History",
      icon: MdHistory,
      action: () => openWindow("route", "/history", "History"),
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "game",
      label: "Game",
      icon: MdGames,
      action: () => openWindow("route", "/game", "Game"),
      color: "from-red-500 to-red-600",
    },
    {
      id: "divider",
      label: "",
      icon: MdApps,
      action: () => {},
      color: "from-transparent to-transparent",
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: MdCalculate,
      action: () => openWindow("calculator"),
      color: "from-gray-600 to-gray-700",
    },
    {
      id: "music",
      label: "Music",
      icon: MdMusicNote,
      action: () => openWindow("music"),
      color: "from-pink-500 to-pink-600",
    },
    {
      id: "navigation",
      label: "Apps",
      icon: MdApps,
      action: () => openWindow("navigation"),
      color: "from-blue-500 to-blue-600",
    },
  ];

  const getIconScale = (index: number) => {
    if (hoveredIndex === null) return 1;

    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.4; // Hovered icon
    if (distance === 1) return 1.1; // Adjacent icons - subtle effect
    return 1; // Other icons
  };

  const getIconTranslateY = (index: number) => {
    if (hoveredIndex === null) return 0;

    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return -8;
    if (distance === 1) return -2;
    return 0;
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="dock-container rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-2xl backdrop-blur-lg">
        <div className="flex items-end gap-5">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const scale = getIconScale(index);
            const translateY = getIconTranslateY(index);

            // Render divider
            if (item.id === "divider") {
              return (
                <div key={item.id} className="mx-2 h-14 w-px bg-gray-300/50" />
              );
            }

            return (
              <div
                key={item.id}
                className="flex flex-col items-center gap-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon Button */}
                <button
                  onClick={item.action}
                  className={`relative h-16 w-16 bg-gradient-to-br ${item.color} dock-icon flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl`}
                  style={{
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                  }}
                >
                  <Icon className="text-3xl text-white" />
                </button>

                {/* Label */}
                <span className="text-xs font-medium whitespace-nowrap text-gray-800">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
