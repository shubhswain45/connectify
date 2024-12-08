import { graphql } from "@/gql";

export const signupUserMutation = graphql(`
    #graphql
    mutation SignupUser($input: SignupUserInput!) {
      signupUser(input: $input) {
        email
        token
      }
    }
  `);
  