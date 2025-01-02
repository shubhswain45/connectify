import { createGraphqlClient } from "@/clients/api";
import { followUserMutation } from "@/graphql/mutations/user";
import { searchUserQuery } from "@/graphql/query/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const useSearchUser = (query: string, page: number) => {
    return useQuery({
        queryKey: ['searchUser', query, page],
        queryFn: async () => {
            const graphqlClient = createGraphqlClient()
            if (!query) {
                return null
            }
            const { searchUser } = await graphqlClient.request(searchUserQuery, { payload: { query, page } })
            return searchUser
        }
    })
}

export const useFollowUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (userId: string) => {
            try {
                const graphqlClient = createGraphqlClient();
                const { followUser } = await graphqlClient.request(followUserMutation, {
                    userId,
                });
                return followUser;
            } catch (error: any) {
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: (data) => {
            if (data) {
                toast.success("Followed user");
            } else {
                toast.success("unFollowed user")
            }
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};