import { client } from "@/lib/graphql";
import { getGameData } from "@/lib/queries/game";

export default async function GameImage() {
  const gameData = await getGameData(client);

  if (!gameData || gameData.length === 0) return null;

  return (
    <div className="flex gap-4"> 
      {gameData.map((game, i) => (
        <div key={i}>
          <a href={`/games/${game.slug}`}>
            <img src={game.image.url} />
          </a>
        </div>
      ))}
    </div>
  );
}