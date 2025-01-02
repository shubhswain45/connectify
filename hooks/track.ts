import { createGraphqlClient } from "@/clients/api";
import { CreateTrackPayload } from "@/gql/graphql";
import { createTrackMutation, likeTrackMutation } from "@/graphql/mutations/track";
import { searchTrackQuery } from "@/graphql/query/track";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useSearchTrack = (query: string, page: number) => {
        return useQuery({
            queryKey: ['searchTrack', query, page],
            queryFn: async () => {
                const graphqlClient = createGraphqlClient()
                if (!query) {
                    return null
                }
                const { searchTrack } = await graphqlClient.request(searchTrackQuery, { payload: { query, page } })
                return searchTrack
            }
        })
}

export const useCreateTrack = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (trackData: CreateTrackPayload) => {
            if (!trackData.audioFileUrl) {
                toast.error("Please select an audio file.");
            }

            if (!trackData.title) {
                throw new Error("Title is required!");
            }

            // Convert duration string to a number for comparison
            const durationInSeconds = parseFloat(trackData.duration);
            if (isNaN(durationInSeconds) || durationInSeconds <= 10) {
                throw new Error("Audio must be longer than 10 seconds!");
            }

            try {
                const graphqlClient = createGraphqlClient();
                const { createTrack } = await graphqlClient.request(createTrackMutation, {
                    payload: trackData,
                });
                return createTrack;
            } catch (error: any) {
                throw new Error(
                    error?.response?.errors?.[0]?.message || "Something went wrong"
                );
            }
        },
        onSuccess: () => {
            toast.success("Track created successfully");
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(":").pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};

export const useLikeTrack = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (trackId: string) => {
            try {
                const graphqlClient = createGraphqlClient();
                const { likeTrack } = await graphqlClient.request(likeTrackMutation, { trackId });
                return likeTrack;
            } catch (error: any) {
                throw new Error(error?.response?.errors?.[0]?.message || "Something went wrong");
            }
        },
        onError: (error: any) => {
            const errorMessage = error.message.split(':').pop()?.trim() || "Something went wrong";
            toast.error(errorMessage);
        },
    });
};