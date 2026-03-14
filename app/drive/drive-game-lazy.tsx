"use client";

import dynamic from "next/dynamic";

const DriveGame = dynamic(() => import("./drive-game"), {
  ssr: false,
  loading: () => (
    <div className="p-4 text-center text-gray-400">Loading game engine...</div>
  ),
});

export default function DriveGameLazy() {
  return <DriveGame />;
}
