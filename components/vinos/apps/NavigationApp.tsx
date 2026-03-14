"use client";

import Link from "next/link";
import { MdWork, MdPerson, MdArticle, MdHistory } from "react-icons/md";

const NAV_ITEMS = [
  {
    name: "Projects",
    href: "/projects",
    icon: MdWork,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "About Me",
    href: "/about",
    icon: MdPerson,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Blog",
    href: "/blog",
    icon: MdArticle,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "History",
    href: "/history",
    icon: MdHistory,
    color: "from-orange-500 to-orange-600",
  },
];

export default function NavigationApp() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="grid w-full max-w-md grid-cols-2 gap-6">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-2xl bg-white/30 p-4 backdrop-blur-sm">
                    <Icon className="text-5xl text-white" />
                  </div>
                  <span className="text-center font-semibold text-white">
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
