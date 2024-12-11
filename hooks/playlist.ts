import { createGraphqlClient } from "@/clients/api";
import { AddSongToPlaylistInput, CreatePlaylistInput } from "@/gql/graphql";
import { AddSongToPlaylistMutation } from "@/graphql/mutations/playlist";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useAddSongToPlaylist = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (payload: AddSongToPlaylistInput) => {
            try {
                const graphqlClient = createGraphqlClient();
                const { addSongToPlaylist } = await graphqlClient.request(AddSongToPlaylistMutation, {
                    payload,
                });
                return addSongToPlaylist;
            } catch (error: any) {
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: () => {
            toast.success("Playlist created successfully");
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};