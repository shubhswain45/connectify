import { GraphQLClient } from "graphql-request";

export const createGraphqlClient = (token?: string) => {
    return new GraphQLClient('http://localhost:4000/graphql', {
        credentials: "include"
    });
}