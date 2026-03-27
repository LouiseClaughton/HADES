// src/app/games/[slug]/page.jsx
import { getGameData } from "../../lib/queries/game";
import { client } from "../../lib/graphql";

export default async function Statistics() {
    const games = await getGameData(client);

    // sort games by death HIGH → LOW and get the top three
    const topThree = [...games].sort((a, b) => {
        return b.totalDeaths - a.totalDeaths;
    }).slice(0, 3);

    // Calculate average deaths over all games
    let averageDeaths = (games.reduce((sum, game) => sum + game.totalDeaths, 0) / games.length).toFixed(0);

    return (
        <div className="w-full py-8 border-t-1 border-[#4E4E4E]">
            <h2 className="text-xl font-black font-kode-mono uppercase mb-4">Statistics</h2>
            <div className="grid grid-cols-2 w-full gap-8 bg-grey rounded-[15px] border-light-grey p-8">
                <div className="font-kode-mono text-sm border-r-1 border-[#4E4E4E]">
                    <h3 className="font-bold text-base uppercase mb-4">Top Deaths</h3>
                    <div className="flex flex-col gap-2">
                        {topThree.map((game, index) => (
                            <span key={game.slug || index}>
                                {index + 1}. {game.title} - {game.totalDeaths}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="font-kode-mono text-sm">
                    <h3 className="font-bold text-base uppercase mb-4">Death Stats</h3>
                    <span>Avg. Deaths per Game - {averageDeaths}</span>
                </div>
            </div>
        </div>
    );
}