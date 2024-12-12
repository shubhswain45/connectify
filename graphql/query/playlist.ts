import { graphql } from "@/gql";

export const getUserPlaylistsQuery = graphql(`#graphql
query GetUserPlaylists($username: String!) {
  getUserPlaylists(username: $username) {
    playlists {
      id
      name
      coverImageUrl
    }
  }
}
`)