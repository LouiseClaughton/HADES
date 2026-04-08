import Statistics from "./components/statistics";
import Brand from "./components/brand";
import GameGrid from "./components/game-grid";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-16 px-8 lg:px-16 bg-black sm:items-start">
        <Brand />

        <Statistics />

        {/* Games */}
        <div className="py-8 border-t-1 border-[#4E4E4E]">
          <h2 className="font-kode-mono text-xl uppercase font-black mb-4 text-white">Games</h2>
          <div>
            <GameGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
