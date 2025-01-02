import { ScrollArea } from "@/components/ui/scroll-area";
import { EllipsisVertical, Play } from "lucide-react"; // Lucide React icon for edit
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { createGraphqlClient } from "@/clients/api";
import { getPlaylistSongsQuery } from "@/graphql/query/playlist";
import { Track } from "@/gql/graphql";
import { useAudioStore } from "@/store/useAudioStore";
import { useGetCurrentTheme } from "@/hooks/theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueueStore } from "@/store/useQueueStore";
import { useRepeatableTracksStore } from "@/store/useRepeatableTracksStore";
import { usePlaylistTracksStore } from "@/store/usePlaylistTracksStore";
import Topbar from "../../../../components/_dashboard/Topbar";
import DashboardLayout from "@/layout/DashboardLayout";
import PlaylistDetails from "@/components/_dashboard/_playlist/PlaylistDetails";
import PlaylistSongs from "@/components/_dashboard/_playlist/PlaylistSongs";
import { usePathname } from "next/navigation";

// Dummy data for album
const dummyAlbum = {
    title: "We Don't Know",
    artist: "Shubh",
    releaseYear: 2023,
    songs: [
        {
            _id: "1",
            title: "song one two song three song four and so on",
            artist: "Shubh",
            createdAt: "2023-05-01T00:00:00Z",
            duration: 180,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "2",
            title: "Ilahi mera je aye By(Arijt singh)",
            artist: "Shubh",
            createdAt: "2023-05-02T00:00:00Z",
            duration: 210,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "2",
            title: "jsys wywyyw iiaiaia isisisi jdjdjjjd oisiususu isiusu",
            artist: "Shubh",
            createdAt: "2023-05-02T00:00:00Z",
            duration: 210,
            imageUrl: "https://via.placeholder.com/150",
        },
        // More songs can be added here
    ],
    imageUrl: "https://via.placeholder.com/240",
};

// Helper function to truncate text
function truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}


const AlbumPage = ({ id, title, coverImageUrl, Tracks }: { id: string, title: string, coverImageUrl: string, Tracks: Track[] | null }) => {
    const [theme] = useGetCurrentTheme()
    const { audioDetails, setAudioDetails } = useAudioStore();
    const { setPlaylistDetails, isTrackLiked, playlistDetails } = usePlaylistTracksStore()
    const { tracks, isUpadted } = playlistDetails
    const { isTrackInQueue } = useQueueStore()
    const { isTrackRepeatable } = useRepeatableTracksStore()
    console.log("we are here", tracks);

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

