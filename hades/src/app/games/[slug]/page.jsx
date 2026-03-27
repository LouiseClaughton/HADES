// src/app/games/[slug]/page.jsx
import { client } from "@/lib/graphql";
import { gql } from "graphql-request";

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
      }
    }
  }
`;

export default async function GamePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) return <p>No slug provided</p>;

  const data = await client.request(GET_GAME_BY_SLUG, { slug });
  const game = data.gameCollection.items[0];

  if (!game) return <p>Game not found</p>;

  return (
    <main className="p-16">
      <h1 className="text-4xl font-jaro">{game.title}</h1>
      <p className="text-lg font-kode-mono">{game.genre}</p>
      <p>Release: {game.releaseDate}</p>
      {game.image && <img src={game.image.url} alt={game.image.title} />}
    </main>
  );
}