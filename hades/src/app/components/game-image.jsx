import { client } from "@/lib/graphql";
import { getGameData } from "@/lib/queries/game";

export default async function GameImage({ genre, currentGame }) {
  const gameData = await getGameData(client);

  if (!gameData || gameData.length === 0) return null;

  // Sort games alphabetically
  const sortedGames = gameData.sort((a, b) => a.title.localeCompare(b.title));

  // Group games by their genre
  const gamesByGenre = gameData.reduce((acc, game) => {
      if (!acc[game.genre]) {
          acc[game.genre] = []; // create list if it doesn't exist
      }
      acc[game.genre].push(game); // add game to its genre
      return acc;
  }, {});

  // Max number of games to show
  const MAX_ITEMS = 4;

  // Games matching this genre (but not the current game)
  const genreGames = genre
    ? (gamesByGenre[genre] || []).filter(game => game.title !== currentGame)
    : [];

  // Fallback games (excluding current + excluding games already used in genre list)
  const fallbackGames = sortedGames
    .filter(
      game =>
        game.title !== currentGame &&
        !genreGames.some(g => g.slug === game.slug)
    );

  // Combine: first use genre games, then fill remaining spots with fallback games

  let combinedGames = [...genreGames, ...fallbackGames];

  if (genre) {
    combinedGames = [...genreGames, ...fallbackGames].slice(0, MAX_ITEMS);
  }
  

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {combinedGames.map((game) => (
        <div key={game.slug} className="relative flex items-center justify-center group hover:cursor-pointer">
          <a href={`/games/${game.slug}`}>
            <img src={game.image.url} alt={game.title} className="w-full h-auto" />
          </a>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-colors duration-300 bg-transparent group-hover:bg-black/65">
            <span className="text-white text-lg text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-4">{game.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}