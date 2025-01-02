import { createGraphqlClient } from "@/clients/api";
import { AddSongToPlaylistInput, CreatePlaylistInput, RemoveSongFromPlaylistInput } from "@/gql/graphql";
import { AddSongToPlaylistMutation, RemoveSongFromPlaylistMutation } from "@/graphql/mutations/playlist";
import { getCurrentUserPlaylistsQuery, searchPlaylistQuery } from "@/graphql/query/playlist";
import { usePlaylistTracksStore } from "@/store/usePlaylistTracksStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

export const useSearchPlaylist = (query: string, page: number) => {
    return useQuery({
        queryKey: ['searchPlaylist', query, page],
        queryFn: async () => {
            const graphqlClient = createGraphqlClient()
            if (!query) {
                return null
            }
            const { searchPlaylist } = await graphqlClient.request(searchPlaylistQuery, { payload: { query, page } })
            return searchPlaylist
        }
    })
}

export const useGetUserPlaylists = (username: string) => {
    return useQuery({
        queryKey: ['userPlaylists', username],
        queryFn: async () => {
            const graphqlClient = createGraphqlClient()
            if (!username) {
                return null
            }
            const { getCurrentUserPlaylists } = await graphqlClient.request(getCurrentUserPlaylistsQuery, { username })
            return getCurrentUserPlaylists
        }
    })
}

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


export const useRemoveSongFromPlaylist = () => {
    const router = useRouter();

    const { playlistDetails, setPlaylistDetails } = usePlaylistTracksStore()

    return useMutation({
        mutationFn: async (payload: RemoveSongFromPlaylistInput) => {
            try {
                const graphqlClient = createGraphqlClient();
                const { removeSongFromPlaylist } = await graphqlClient.request(RemoveSongFromPlaylistMutation, {
                    payload,
                });
                return { removeSongFromPlaylist, trackId: payload.trackId };
            } catch (error: any) {
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: ({ removeSongFromPlaylist, trackId }) => {
            if (removeSongFromPlaylist) {
                const filteredSongs = playlistDetails.tracks?.filter((track) => track.id != trackId)
                console.log("filteredSongs", filteredSongs);
                
                setPlaylistDetails({ tracks: filteredSongs, isUpadted: "yes" })
            }
            toast.success("Track Remove From Playlist", {
                position: "top-center"
            });
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};