import { graphql } from "@/gql";

export const getCurrentUserQuery = graphql(`#graphql
    query GetCurrentUser {
        getCurrentUser {
            id
            profileImageURL
            email
            username
            fullName
            isVerified
        }
    }
`)