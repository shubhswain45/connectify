import React, { useState } from "react";
import { createGraphqlClient } from "@/clients/api";
import { getTrackByIdQuery } from "@/graphql/query/track";
import { Track } from "@/gql/graphql";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";
import DashboardLayout from "@/layout/DashboardLayout";
import TrackDetails from "@/components/_dashboard/_show/TrackDetails";
import TrackControllers from "@/components/_dashboard/_show/TrackControllers";
import ChoosePlaylistDialog from "@/components/_dashboard/_show/ChoosePlaylistDialog";

const AudioDetailPage = ({ track }: { track: Track | null }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(track?.hasLiked)
    const [playbackSpeed, setPlaybackSpeed] = useState(1); // Playback speed state

    if (!track) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
                    Sorry, Track does not exist 404 ☹️
                </h1>
            </div>
        );
    }

    return (
        <DashboardLayout shouldShowFeatureHeader={false}>
            <div className="p-4 sm:p-6">
                <div className="flex flex-col items-center justify-center space-y-8">
                    {/* it contains the information about the track like img, title, artist etc */}
                    <TrackDetails track={track} isFavorite={isFavorite || false} setIsFavorite={setIsFavorite} playbackSpeed={playbackSpeed} setPlaybackSpeed={setPlaybackSpeed} setIsOpen={setIsOpen} />

                    {/* it contains the information about the track controllers like play, pause, skip, forward etc */}
                    <TrackControllers track={track} isFavorite={isFavorite || false} setIsFavorite={setIsFavorite} playbackSpeed={playbackSpeed} setPlaybackSpeed={setPlaybackSpeed} />
                </div>
            </div>

            {isOpen && (
                <ChoosePlaylistDialog isOpen={isOpen} setIsOpen={setIsOpen} trackId={track?.id || ""} />
            )}

        </DashboardLayout>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { trackId } = context.params as { trackId: string };
    const cookies = parseCookies(context);
    const token = cookies.__connectify_token_from_server;

    const graphqlClient = createGraphqlClient(token);
    const { getTrackById } = await graphqlClient.request(getTrackByIdQuery, { trackId });

    return {
        props: { track: getTrackById },
    };
}

export default AudioDetailPage;
