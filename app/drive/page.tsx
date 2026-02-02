import DriveGameLazy from "./drive-game-lazy";

export const metadata = {
  title: "Overtake Drive | Vin Jones",
  description:
    "A lightweight Phaser-powered driving mini-game inside Next.js - pass traffic, dodge oncoming cars, and survive lane swaps.",
};

export default function DrivePage() {
  return (
    <div className="flex flex-col items-center p-3 font-[family-name:var(--font-geist-sans)] sm:p-6">
      <div className="game-window mt-3 sm:mt-5">
        <header className="window-header mb-2 sm:mb-4">
          <h1 className="m-0 text-center text-lg font-bold sm:text-xl">
            Overtake Drive
          </h1>
          <p className="m-0 mt-1 text-center text-xs text-gray-300 sm:text-sm">
            Built with the Phaser game engine inside Next.js. Survive lane
            changes, pass traffic, and dodge oncoming cars.
          </p>
        </header>
        <div className="window-body">
          <DriveGameLazy />
        </div>
      </div>
    </div>
  );
}
