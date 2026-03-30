// src/app/games/[slug]/page.jsx
import Brand from "@/app/components/brand";
import { client } from "@/lib/graphql";
import { gql } from "graphql-request";
import { getGameData } from "@/lib/queries/game";
import GameImage from "@/app/components/game-image";

const GET_GAME_BY_SLUG = gql`
  query GameBySlug($slug: String!) {
    gameCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        releaseDate
        genre
        image {
          url
          title
        }
        totalDeaths
      }
    }
  }
`;

export default async function GamePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const games = await getGameData(client);

  if (!slug) return <p>No slug provided</p>;

  const data = await client.request(GET_GAME_BY_SLUG, { slug });
  const game = data.gameCollection.items[0];

  if (!game) return <p>Game not found</p>;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black text-white">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-16 px-16 bg-black sm:items-start">
        <Brand className="mb-16"/>
        <div className="flex bg-grey border-light-grey rounded-[15px] p-8 gap-8 w-full mb-12">
            {game.image && <img src={game.image.url} alt={game.image.title} />}
            <div>
                <div className="flex flex-col gap-2 mb-4">
                  <h1 className="text-4xl font-jaro">{game.title}</h1>
                  <div className="font-kode-mono uppercase text-sm">
                    <span>Released: {game.releaseDate}</span> ◆ <span>Genre: {game.genre}</span>
                  </div>
                </div>
                <p className="text-sm font-kode-mono">Total Deaths: {game.totalDeaths}</p>
            </div>
        </div>
        
        <div className="py-8 border-t-1 border-[#4E4E4E]">
          <h2 className="font-kode-mono text-xl uppercase font-black mb-4">Similar Games</h2>
          <div>
            <GameImage genre={game.genre} currentGame={game.title}/>
          </div>
        </div>
        
      </main>
    </div>
  );
}