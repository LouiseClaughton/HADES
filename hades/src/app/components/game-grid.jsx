"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { getGameData } from "@/lib/queries/game";
import { client } from "@/lib/graphql";

export default function GameGrid() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const ITEMS_PER_PAGE = 12;

    const [games, setGames] = React.useState([]);

    React.useEffect(() => {
            async function fetchGames() {
            const data = await getGameData(client);
            setGames(data);
        }
        fetchGames();
    }, []);

    const sortedGames = games.sort((a, b) => a.title.localeCompare(b.title));

    // slice for pagination
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = sortedGames.slice(start, start + ITEMS_PER_PAGE);

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {paginated.map(game => (
                <div key={game.slug}>
                    <a href={`/games/${game.slug}`}>
                        <img src={game.image.url} alt={game.title} />
                    </a>
                </div>
                ))}
            </div>

            <div className="flex justify-between text-sm underline gap-4 mt-6">
                <a className={`${page > 1 ? 'opacity-100' : 'opacity-0'}`} href={`/?page=${page - 1}`}>Previous</a>
                <a className={`${start + ITEMS_PER_PAGE < games.length ? 'opacity-100' : 'opacity-0'}`} href={`/?page=${page + 1}`}>Next</a>
            </div>
        </div>
    );
}