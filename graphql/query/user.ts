import { graphql } from "@/gql"

export const getUserProfileQuery = graphql(`#graphql
query GetUserProfile($username: String!) {
  getUserProfile(username: $username) {
    id
        username
        fullName
        profileImageURL
        bio
        totalTracks
        totalFollowers
        totalFollowings
        followedByMe
  }
}
    `)

export const getUserTracksQuery = graphql(`#graphql
    query GetUserTracks($username: String!) {
  getUserTracks(username: $username) {
  id                  
  title           
  artist            
  coverImageUrl     
  audioFileUrl     
  createdAt       
  updatedAt        
  hasLiked 
  }
}
        `)