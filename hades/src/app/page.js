import Image from "next/image";
import GameImage from "@/app/components/game-image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col">
          <h1 className="font-jaro text-7xl">ha<span className="text-red-500">d</span>es</h1>
          <span className="font-kode-mono">a video game death tracker</span>
        </div>

        {/* Games */}
        <div>
          <h2 className="font-kode-mono underline">Games</h2>
          <div>
            <GameImage />
          </div>
        </div>
      </main>
    </div>
  );
}
