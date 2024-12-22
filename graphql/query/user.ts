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
  query GetUserTracks($payload: GetUserTracksPayload!) {
  getUserTracks(payload: $payload) {
    
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

export const getUserPlaylistsQuery = graphql(`#graphql
query GetUserPlaylists($userId: String!) {
  getUserPlaylists(userId: $userId) {
    playlists {
      id
      name
      coverImageUrl
    }
  }
}
        `)