import { graphql } from "@/gql"

export const getFeedTracksQuery = graphql(`#graphql
    query GetFeedTracks {
      getFeedTracks {
          id
          title
          artist
          duration
          audioFileUrl  
          coverImageUrl
      }
    }
    `)

export const getTrackByIdQuery = graphql(`#graphql
  query GetTrackById($trackId: String!) {
  getTrackById(trackId: $trackId) {
    id
          title
          artist
          duration
          audioFileUrl  
          coverImageUrl
  }
}
  `)