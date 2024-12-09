import { graphql } from "@/gql";

export const createTrackMutation = graphql(`#graphql
    mutation CreateTrack($payload: createTrackPayload!) {
    createTrack(payload: $payload) {
      id
      title
      artist
      duration
      coverImageUrl
      audioFileUrl
  
      author {
        id
        username
        profileImageURL
      }
    }
  }
  `)

export const likeTrackMutation = graphql(`#graphql
 mutation LikeTrack($trackId: String!) {
  likeTrack(trackId: $trackId)
}
`)