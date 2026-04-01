// src/lib/queries/session.js
import { gql } from "graphql-request";

// GraphQL query for the Game content type
export const SESSION_QUERY = gql`
  query SessionQuery {
    sessionCollection {
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

// Function to fetch the data
export async function getSessionData(client) {
  const data = await client.request(SESSION_QUERY);
  return data.sessionCollection.items; // return the collection items
}