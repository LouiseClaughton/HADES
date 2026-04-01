// src/app/games/[slug]/page.jsx (server component)
import { client } from "@/lib/graphql";
import { gql } from "graphql-request";
import Brand from "@/app/components/brand";
import GameStats from "./game-statistics";
import GameImage from "@/app/components/game-image";

export default async function GamePage({ params }) {
  const slug = (await params).slug;

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

  const GET_SESSION_BY_SLUG = gql`
    query SessionBySlug($slug: String!) {
      sessionCollection(where: { gameSlug: $slug }) {
        items {
          title
          gameTitle
          gameSlug
          date
          sessionLength
          totalDeaths
          notes
        }
      }
    }
  `;

  const gameData = await client.request(GET_GAME_BY_SLUG, { slug });
  const game = gameData.gameCollection.items[0];
  const gameGenres = game.genre;

  const sessionData = await client.request(GET_SESSION_BY_SLUG, { slug });
  const sessions = sessionData.sessionCollection.items;
  const totalSessions = sessions.length;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black text-white">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-16 px-8 lg:px-16 bg-black sm:items-start">
        
        <Brand />

        {/* Game Information */}
        <div className="w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]">
          <div className="flex flex-col lg:flex-row bg-grey border-light-grey rounded-[15px] p-8 gap-8 w-full">
            {game.image && <img src={game.image.url} alt={game.image.title} />}
            <div>           
              <h1 className="text-4xl font-jaro mb-4">{game.title}</h1>
              <div className="font-kode-mono uppercase text-sm mb-4 border-b-1 border-[#4E4E4E] pb-4">
                  <span>Released: {game.releaseDate}</span> ◆ <span>Genre: {gameGenres.join(", ")}</span>
              </div>
              <p className="text-sm font-kode-mono">Total Deaths: {game.totalDeaths}</p>
              <p className="text-sm font-kode-mono">Total Sessions: {totalSessions}</p>       
            </div>
          </div>
        </div>

        {/* Game Statistics */}
        <div className="w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]">
          <h2 className="font-kode-mono text-xl uppercase font-black mb-4">Recent Sessions ⏱️</h2>
          <GameStats game={game} sessions={sessions} />
        </div>

        {/* Similar Games */}
        <div className="w-full pt-8 pb-12 border-t-1 border-[#4E4E4E]">
          <h2 className="font-kode-mono text-xl uppercase font-black mb-4">Similar Games</h2>
          <div>
            <GameImage genre={game.genre} currentGame={game.title} />
          </div>
        </div>
      </main>
    </div>
  );
}