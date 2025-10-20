import Game from "./game-logic";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-2 sm:p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="game-window mt-2 sm:mt-4">
        <header className="window-header mb-2 sm:mb-4">
          <h1 className="m-0 text-lg sm:text-xl font-bold text-center">
            Untitled Battle Squares
          </h1>
        </header>
        <div className="window-body">
          <Game />
        </div>
      </div>
    </div>
  );
}
