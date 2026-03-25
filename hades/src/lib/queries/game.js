// src/lib/queries/game.js
import { gql } from "graphql-request";

// GraphQL query for your Game content type
export const GAME_QUERY = gql`
  query GameQuery {
    gameCollection {
      items {
        title
        releaseDate
        genre
      }
    }
  }
`;

// Function to fetch the data
export async function getGameData(client) {
  const data = await client.request(GAME_QUERY);
  return data.gameCollection.items; // return the collection items
}