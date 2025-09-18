import Game from "./game-logic";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-2 sm:p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="game-window mt-2 sm:mt-4">
        <div className="window-header text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">
          Untitled Battle Squares
        </div>
        <div className="window-body">
          <Game />
        </div>
      </div>
    </div>
  );
}
