import DriveGame from "./drive-game";

export const metadata = {
  title: "Overtake Drive | Vin Jones",
  description:
    "A lightweight Phaser-powered driving mini-game inside Next.js - pass traffic, dodge oncoming cars, and survive lane swaps.",
};

export default function DrivePage() {
  return (
    <div className="flex flex-col items-center p-3 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <div className="game-window mt-3 sm:mt-5">
        <header className="window-header mb-2 sm:mb-4">
          <h1 className="m-0 text-lg sm:text-xl font-bold text-center">
            Overtake Drive
          </h1>
          <p className="m-0 mt-1 text-xs sm:text-sm text-gray-300 text-center">
            Built with the Phaser game engine inside Next.js. Survive lane changes, pass traffic, and dodge oncoming cars.
          </p>
        </header>
        <div className="window-body">
          <DriveGame />
        </div>
      </div>
    </div>
  );
}
