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

export const verifyEmailMutation = graphql(`
  #graphql
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      id
      profileImageURL
      email
      username
      fullName
      isVerified
    }
  }
`);
