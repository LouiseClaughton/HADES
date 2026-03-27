import { client } from "@/lib/graphql";
import { getGameData } from "@/lib/queries/game";

export default async function GameImage({ genre, currentGame }) {
  const gameData = await getGameData(client);

  if (!gameData || gameData.length === 0) return null;

  // Sort games alphabetically
  const sortedGames = gameData.sort((a, b) => a.title.localeCompare(b.title));

  const gamesByGenre = gameData.reduce((acc, game) => {
      if (!acc[game.genre]) {
          acc[game.genre] = []; // create list if it doesn't exist
      }
      acc[game.genre].push(game); // add game to its genre
      return acc;
  }, {});

  // Get the games that match the passed genre
  const genreGames = genre ? (gamesByGenre[genre] || []).filter(game => game.title !== currentGame) : [];

  // If there are no games in the same genre, or the only game in the genre is the active one,
  // show the first four games alphabetically as a fallback
  const fallbackGames = sortedGames
    .filter(game => game.title !== currentGame)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-4 gap-4"> 
      {genre ? (
        genreGames.length > 0 ? (
          // Show genre-matching games (max 4)
          genreGames.slice(0, 4).map((game) => (
            <div key={game.slug}>
              <a href={`/games/${game.slug}`}>
                <img src={game.image.url} />
              </a>
            </div>
          ))
        ) : (
          // Show fallback games if genre has zero other games (max 4)
          fallbackGames.slice(0, 4).map((game) => (
            <div key={game.slug}>
              <a href={`/games/${game.slug}`}>
                <img src={game.image.url} />
              </a>
            </div>
          ))
        )
      ) : (
        // No genre selected = show sorted games
        sortedGames.map((game) => (
          <div key={game.slug}>
            <a href={`/games/${game.slug}`}>
              <img src={game.image.url} />
            </a>
          </div>
        ))
      )}
    </div>
  );
}