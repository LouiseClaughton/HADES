import { client } from "@/lib/graphql";
import { getGameData } from "@/lib/queries/game";

export default async function GameImage() {
  const gameData = await getGameData(client);

  if (!gameData || gameData.length === 0) return null;

  // Sort games alphabetically
  const sortedGames = gameData.sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="grid grid-cols-4 gap-4"> 
      {sortedGames.map((game, i) => (
        <div key={i}>
          <a href={`/games/${game.slug}`}>
            <img src={game.image.url} />
          </a>
        </div>
      ))}
    </div>
  );
}