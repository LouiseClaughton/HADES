import { client } from "@/lib/graphql";
import { getGameData } from "@/lib/queries/game";

export default async function GameData() {
  const gameData = await getGameData(client);

  if (!gameData || gameData.length === 0) return null;

  return (
    <div>
      {gameData.map((game, i) => (
        <div key={i}>
          <h2>{game.title}</h2>
          <p>Genre: {game.genre}</p>
          <p>Release: {game.releaseDate}</p>
          <img src={game.image.url} />
        </div>
      ))}
    </div>
  );
}