import { graphql } from "@/gql";

export const getCurrentUserPlaylistsQuery = graphql(`#graphql
query GetCurrentUserPlaylists($username: String!) {
  getCurrentUserPlaylists(username: $username) {
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

export const getFeedPlaylistsQuery = graphql(`
  #graphql
  query GetFeedPlaylists {
  getFeedPlaylists {
    playlists {
      id
      name
      coverImageUrl
      totalTracks
      author {
        id
        username
        profileImageURL
      }
    }
  }
}
`);

  export const searchPlaylistQuery = graphql(`#graphql
 query SearchPlaylist($payload: SearchPayload!) {
  searchPlaylist(payload: $payload) {
      playlists {
        id
        name
        coverImageUrl
        totalTracks
        author {
          id
          username
          profileImageURL
        }
      }
    }
  }
  `)