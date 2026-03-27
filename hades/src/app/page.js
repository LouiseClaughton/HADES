import Image from "next/image";
import GameImage from "@/app/components/game-image";
import Statistics from "./components/statistics";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col pb-8">
          <h1 className="font-jaro text-7xl">ha<span className="text-red-500">d</span>es</h1>
          <span className="font-kode-mono">a video game death tracker</span>
        </div>

        <Statistics />

        {/* Games */}
        <div className="py-8 border-t-1 border-[#4E4E4E]">
          <h2 className="font-kode-mono text-xl uppercase font-black mb-4">Games</h2>
          <div>
            <GameImage />
          </div>
        </div>
      </main>
    </div>
  );
}
