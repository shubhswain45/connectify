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

export const getPlaylistSongsQuery = graphql(`
  #graphql
  query GetPlaylistSongs($playlistId: String!) {
    getPlaylistSongs(playlistId: $playlistId) {
      id
      title
      coverImageUrl
      tracks {
        id
        title
        artist
        duration
        audioFileUrl  
        coverImageUrl
        hasLiked  
      }
    }
  }
`);
