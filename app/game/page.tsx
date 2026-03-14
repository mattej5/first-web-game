import Game from "./game-logic";

export default function Home() {
  return (
    <div className="arena-page-wrap">
      <div className="arena-page-header">
        <p className="arena-kicker">Portfolio Game Prototype</p>
        <h1>Battle Arena of the Triforce</h1>
        <p>
          A Next.js route running a Three.js combat arena inspired by NES-era
          top-down action.
        </p>
      </div>
      <Game />
    </div>
  );
}
