import { GraphQLClient } from "graphql-request";

export const createGraphqlClient = (token?: string) => {
    const Token = token || ""
    
    return new GraphQLClient('https://a-new-app.onrender.com/graphql', {
        credentials: "include",
        headers: () => ({
            Authorization: `Bearer ${Token}`
          }),
    });
}