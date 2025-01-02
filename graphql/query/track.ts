import { graphql } from "@/gql"

export const getFeedTracksQuery = graphql(`#graphql
   query GetFeedTracks($page: Int!) {
  getFeedTracks(page: $page) {
          id
          title
          artist
          duration
          audioFileUrl  
          coverImageUrl

          author {
            username
          }
  }
}`)

export const getTrackByIdQuery = graphql(`#graphql
  query GetTrackById($trackId: String!) {
  getTrackById(trackId: $trackId) {
    id
          title
          artist
          duration
          audioFileUrl  
          coverImageUrl
          hasLiked
  }
}
  `)

  export const searchTrackQuery = graphql(`#graphql
  query SearchTrack($payload: SearchPayload!) {
    searchTrack(payload: $payload) {
      id
      title
      artist
      duration
      audioFileUrl  
      coverImageUrl

      author {
        username
      }
    }
  }
  `)