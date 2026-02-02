import Game from "./game-logic";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-2 font-[family-name:var(--font-geist-sans)] sm:p-4">
      <div className="game-window mt-2 sm:mt-4">
        <header className="window-header mb-2 sm:mb-4">
          <h1 className="m-0 text-center text-lg font-bold sm:text-xl">
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
