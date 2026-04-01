// src/app/games/[slug]/page.jsx
import { client } from "../../lib/graphql";
import { getGameData } from "../../lib/queries/game";
import { getSessionData } from "@/lib/queries/session";

export default async function Statistics() {
    const games = await getGameData(client);
    const sessions = await getSessionData(client);

    // *** GAMES FUNCTIONS ***

    // sort games by death HIGH → LOW and get the top three
    const topThreeGames = [...games].sort((a, b) => {
        return b.totalDeaths - a.totalDeaths;
    }).slice(0, 3);

    // Calculate average deaths over all games
    let averageDeaths = (games.reduce((sum, game) => sum + game.totalDeaths, 0) / games.length).toFixed(0);

    // Group deaths by genre
    const deathsByGenre = games.reduce((acc, game) => {
        acc[game.genre] = (acc[game.genre] || 0) + game.totalDeaths;
        return acc;
    }, {});

    // Sort genres by total deaths
    const genresSorted = Object.entries(deathsByGenre)
        // ignore items with two genres
        .filter(([genre]) => !genre.includes(','))
        .sort((a, b) => b[1] - a[1]);

    // Take top genre
    const [topGenre] = genresSorted;

    // *** SESSIONS FUNCTIONS ***

    // Get the latest three sessions by date
    const topThreeSessions = [...sessions].sort((a, b) => {
        return b.date - a.date;
    }).slice(0, 3);

    return (
        <div className="w-full">
            <div className="w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]">
                <h2 className="text-xl font-black font-kode-mono uppercase mb-4 text-white">Sessions</h2>
                <div className="w-full gap-8 bg-grey rounded-[15px] border-light-grey p-8">
                    <div className="font-kode-mono text-sm">
                        <h3 className="font-bold text-base uppercase mb-4 text-white">Recent Deaths ⏱️</h3>
                        <div className="lg:grid lg:grid-cols-3 gap-8 flex flex-col">
                            {topThreeSessions.map((session) => {
                                // Format session date into a readable format
                                const sessionDateRaw = session.date;
                                const sessionDateFormatted = new Intl.DateTimeFormat("fr-FR").format(new Date(sessionDateRaw));
                                return (
                                    <div key={session.title} className="flex flex-col pb-8 lg:pb-0 border-b-1 lg:border-b-0 lg:border-r-1 border-[#4E4E4E] last:border-r-0 last:border-b-0 text-white">
                                        <strong>{sessionDateFormatted}</strong>
                                        <span>{session.gameTitle}</span>
                                        <span>Deaths: {session.totalDeaths}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]">
                <h2 className="text-xl font-black font-kode-mono uppercase mb-4 text-white">Statistics</h2>
                <div className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-8 bg-grey rounded-[15px] border-light-grey p-8">
                    <div className="font-kode-mono text-sm pb-4 lg:pb-0 border-b-1 lg:border-b-0 lg:border-r-1 border-[#4E4E4E] text-white">
                        <h3 className="font-bold text-base uppercase mb-4">Top Deaths 🏆</h3>
                        <div className="flex flex-col gap-2">
                            {topThreeGames.map((game, index) => (
                                <span key={game.slug || index} className="py-4 lg:py-0">
                                    {index + 1}. {game.title} - {game.totalDeaths}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="font-kode-mono text-sm">
                        <h3 className="font-bold text-base uppercase mb-4 text-white">Death Stats ☠️</h3>
                        <div className="flex flex-col gap-2 text-white">
                            <span className="py-4 lg:py-0">Avg. Deaths per Game - {averageDeaths}</span>
                            <span className="py-4 lg:py-0">Genre with Most Deaths: {topGenre[0]} ({topGenre[1]})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}