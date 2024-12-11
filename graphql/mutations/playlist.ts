import { graphql } from "@/gql";

export const AddSongToPlaylistMutation = graphql(`#graphql
mutation AddSongToPlaylist($payload: AddSongToPlaylistInput!) {
  addSongToPlaylist(payload: $payload)
}
`)