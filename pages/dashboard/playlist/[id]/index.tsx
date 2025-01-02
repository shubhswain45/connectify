import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { createGraphqlClient } from "@/clients/api";
import { getPlaylistSongsQuery } from "@/graphql/query/playlist";
import { Track } from "@/gql/graphql";
import { useEffect } from "react";
import { usePlaylistTracksStore } from "@/store/usePlaylistTracksStore";
import DashboardLayout from "@/layout/DashboardLayout";
import PlaylistDetails from "@/components/_dashboard/_playlist/PlaylistDetails";
import PlaylistSongs from "@/components/_dashboard/_playlist/PlaylistSongs";

const AlbumPage = ({ id, title, coverImageUrl, Tracks }: { id: string, title: string, coverImageUrl: string, Tracks: Track[] | null }) => {
    const { setPlaylistDetails, playlistDetails } = usePlaylistTracksStore()
    const { tracks } = playlistDetails

    useEffect(() => {
        // Reset playlist details on route change
        setPlaylistDetails({ tracks: Tracks });
        
    }, [Tracks]);


    if (!Tracks) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
                    Sorry, Playlist does not exist 404 ☹️
                </h1>
            </div>
        );
    }

    return (
        <DashboardLayout shouldShowFeatureHeader={false}>

            <div className="p-4 sm:p-6">
                {/* Album Section */}
                <PlaylistDetails title={title} coverImageUrl={coverImageUrl} createdBy="shubh" />

                <PlaylistSongs id={id} tracks={tracks || Tracks} createdBy="shubh" />
            </div>
        </DashboardLayout>

    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const cookies = parseCookies(context);  // Parse cookies from the context
    const token = cookies.__connectify_token_from_server;  // Get the token

    // If the token exists, consider the user as logged in
    const graphqlClient = createGraphqlClient(token);
    const { getPlaylistSongs } = await graphqlClient.request(getPlaylistSongsQuery, { playlistId: id });

    return {
        props: {
            id: getPlaylistSongs.id || "",
            title: getPlaylistSongs.title || "",
            coverImageUrl: getPlaylistSongs.coverImageUrl || "",
            Tracks: getPlaylistSongs.tracks,
        },
    };
};

export default AlbumPage;

