import Game from "./game-logic";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <div className="game-window mt-4">
        <div className="window-header text-xl font-bold mb-4 text-center">
          Untitled Battle Squares
        </div>
        <div className="window-body">
          <Game />
        </div>
      </div>
    </div>
  );
}
