import { graphql } from "@/gql";

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