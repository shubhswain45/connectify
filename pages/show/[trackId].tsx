import React, { useState } from "react";
import { PlayCircle, PauseCircle, SkipBack, SkipForward, Heart, Play, Pause } from "lucide-react"; // Added Heart icons
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/layout/MainLayout";
import Topbar from "@/components/Topbar";
import { Slider } from "@/components/ui/slider";
import { createGraphqlClient } from "@/clients/api";
import { getTrackByIdQuery } from "@/graphql/query/track";
import { Track } from "@/gql/graphql";
import { FaHeart } from "react-icons/fa";
import { parseCookies } from "nookies";
import { useLikeTrack } from "@/hooks/track";

const AudioDetailPage = ({ track }: { track: Track | null }) => {
    const [isPlaying, setIsPlaying] = useState(false); // Play/Pause state
    const [progress, setProgress] = useState(0); // Track progress state
    const [isFavorite, setIsFavorite] = useState(track?.hasLiked); // Favorite state

    const { mutateAsync: likeTrack, isPending } = useLikeTrack()

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleLike = async () => {
        await likeTrack(track?.id || "")
        setIsFavorite(!isFavorite)
    }
    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleSliderChange = (value: number[]) => {
        setProgress(value[0]);
    };

    return (
        <MainLayout>
            <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">

                <Topbar />
                <ScrollArea className="h-[calc(100vh-180px)]">
                    <div className="p-4 sm:p-6">
                        <div className="flex flex-col items-center justify-center space-y-8">
                            {/* Track Artwork */}
                            <img
                                src={track?.coverImageUrl || ""}
                                alt="Track Artwork"
                                className="w-72 h-72 rounded-lg shadow-lg object-cover"
                            />
                            {/* Track Info */}
                            <div className="text-center text-white space-y-2">
                                <h2 className="text-3xl font-bold">{track?.title}</h2>
                                <p className="text-xl text-zinc-400">{track?.artist}</p>
                                <p className="text-sm text-zinc-500">Duration: {track?.duration}</p>
                            </div>
                            {/* Slider */}
                            <div className="w-72 relative">
                                <Slider
                                    value={[progress]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onValueChange={handleSliderChange}
                                />
                                {/* Heart Icon */}
                                <button
                                    onClick={handleLike}
                                    className="absolute -top-9 right-0 text-red-500 hover:text-red-600"
                                    aria-label="Toggle Favorite"
                                >
                                    {
                                        isPending ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
                                            </div>
                                        ) : (
                                            isFavorite ? <FaHeart className="text-red-500" size={20} /> : <Heart size={20} />
                                        )
                                    }
                                </button>
                                <button
                                    onClick={toggleFavorite}
                                    className="absolute -top-9 left-0 text-white font-bold"
                                    aria-label="Toggle Favorite"
                                >
                                    1X
                                </button>
                                <div className="absolute w-full flex justify-between text-sm text-zinc-400 mt-2">
                                    <span>{formatTime(progress)}</span>
                                    <span>3:45</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center space-x-4">
                                <button onClick={() => { }} className="text-white p-2 rounded-full hover:bg-zinc-700">
                                    <SkipBack />
                                </button>
                                <button
                                    onClick={togglePlayPause}
                                    className={"p-2 rounded-full hover:bg-zinc-700 bg-white"}
                                >
                                    {isPlaying ? <Pause className="text-black" /> : <Play className="text-black" />}
                                </button>

                                <button onClick={() => { }} className="text-white p-2 rounded-full hover:bg-zinc-700">
                                    <SkipForward />
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </main>
        </MainLayout>
    );
};

// SSR: Fetch track data on the server
export async function getServerSideProps(context: any) {
    const { trackId } = context.params;
    const cookies = parseCookies(context);  // Parse cookies from the context
    const token = cookies.__connectify_token_from_server;  // Get the token

    console.log("token", token);

    let track = null;

    if (token) {
        // If the token exists, consider the user as logged in
        const graphqlClient = createGraphqlClient(token);
        const { getTrackById } = await graphqlClient.request(getTrackByIdQuery, { trackId });
        track = getTrackById;
    }

    return {
        props: {
            track,
        },
    };
}

export default AudioDetailPage;
