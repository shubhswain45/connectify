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



export const searchUserQuery = graphql(`#graphql
  query SearchUser($payload: SearchPayload!) {
  searchUser(payload: $payload) {
    username
    fullName
    profileImageURL
    totalTracks
  }
}
`)

export const getUserLikedSongsQuery = graphql(`#graphql
  query GetUserLikedSongs {
  getUserLikedSongs {
      id
      title
      artist
      duration
      audioFileUrl  
      coverImageUrl
  }
}
`)

