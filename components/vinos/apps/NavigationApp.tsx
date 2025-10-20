"use client";

import Link from 'next/link';
import { MdWork, MdPerson, MdArticle, MdHistory } from 'react-icons/md';

const NAV_ITEMS = [
  {
    name: 'Projects',
    href: '/projects',
    icon: MdWork,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'About Me',
    href: '/about',
    icon: MdPerson,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: MdArticle,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'History',
    href: '/history',
    icon: MdHistory,
    color: 'from-orange-500 to-orange-600',
  },
];

export default function NavigationApp() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
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
              <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95`}>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
                    <Icon className="text-5xl text-white" />
                  </div>
                  <span className="text-white font-semibold text-center">
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
