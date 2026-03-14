"use client";

import { useState } from "react";
import { MdPlayArrow } from "react-icons/md";

interface Track {
  id: string;
  title: string;
  url: string;
}

const TRACKS: Track[] = [
  {
    id: "1",
    title: "Track 1",
    url: "https://www.youtube.com/embed/G0gxfJFUFTI",
  },
  {
    id: "2",
    title: "Track 2",
    url: "https://www.youtube.com/embed/sfl45C_fDbc",
  },
  {
    id: "3",
    title: "Track 3",
    url: "https://www.youtube.com/embed/fPwz-O3bXEU",
  },
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Playlist Sidebar */}
      <div className="w-48 border-r border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-700 uppercase">
          Playlist
        </h3>
        <div className="space-y-2">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => setCurrentTrack(track)}
              className={`w-full rounded-lg px-3 py-2 text-left transition-all ${
                currentTrack.id === track.id
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white/70 text-gray-700 hover:bg-white hover:shadow"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdPlayArrow className="text-lg" />
                <span className="truncate text-sm font-medium">
                  {track.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Player */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="aspect-video w-full max-w-2xl overflow-hidden rounded-lg bg-black shadow-2xl">
          <iframe
            key={currentTrack.id}
            width="100%"
            height="100%"
            src={currentTrack.url}
            title={currentTrack.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
