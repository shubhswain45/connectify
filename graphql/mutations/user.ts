import { graphql } from "@/gql";

export const followUserMutation = graphql(`#graphql
    mutation FollowUser($userId: String!) {
  followUser(userId: $userId)
}
`)