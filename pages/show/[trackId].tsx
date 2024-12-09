import React, { useEffect, useRef, useState } from "react";
import {
    PlayCircle,
    PauseCircle,
    SkipBack,
    SkipForward,
    Heart,
    Play,
    Pause,
    MoreHorizontal,
} from "lucide-react"; // Added More icon
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
import { useAudioStore } from "@/store/useAudioStore";

const AudioDetailPage = ({ track }: { track: Track | null }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFavorite, setIsFavorite] = useState(track?.hasLiked);
    const { audioDetails, setAudioDetails } = useAudioStore();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1); // Playback speed state

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { mutateAsync: likeTrack, isPending } = useLikeTrack();

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleClick = () => {
        if (track?.id == audioDetails.id && audioDetails.isPlaying) {
            audioDetails.audioRef?.current?.pause();
            setAudioDetails({ isPlaying: false });
            return;
        }

        setAudioDetails({
            id: track?.id,
            title: track?.title,
            artist: track?.artist,
            duration: track?.duration,
            coverImageUrl: track?.coverImageUrl || "",
            audioFileUrl: track?.audioFileUrl,
            isPlaying: true,
        });
    };

    const handleLike = async () => {
        await likeTrack(track?.id || "");
        setIsFavorite(!isFavorite);
    };

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    const handleSliderChange = (value: number[]) => {
        setProgress(value[0]);
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const togglePlaybackSpeed = () => {
        const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
        setPlaybackSpeed(nextSpeed);

        if (audioRef.current) {
            audioRef.current.playbackRate = nextSpeed;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !audioDetails.audioFileUrl) return;

        if (audioDetails.isPlaying && audio.paused) {
            setAudioDetails({ audioRef });
            audio.play();
        } else if (!audioDetails.isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [audioDetails.audioFileUrl, audioDetails.isPlaying, setAudioDetails]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            setAudioDetails({ isPlaying: false });
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioDetails, setAudioDetails]);

    return (
            <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
                <Topbar />
                <ScrollArea className="h-[calc(100vh-180px)]">
                    <div className="p-4 sm:p-6">
                        <div className="flex flex-col items-center justify-center space-y-8">
                            <div className="relative">
                                <img
                                    src={track?.coverImageUrl || ""}
                                    alt="Track Artwork"
                                    className="w-72 h-72 rounded-lg shadow-lg object-cover"
                                />
                                <button
                                    aria-label="More Options"
                                    className="absolute top-2 left-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                                >
                                    <MoreHorizontal className="text-white" size={20} />
                                </button>
                            </div>

                            <div className="text-center text-white space-y-2">
                                <h2 className="text-3xl font-bold">{track?.title}</h2>
                                <p className="text-xl text-zinc-400">{track?.artist}</p>
                            </div>

                            <div className="w-72 relative">
                                <Slider
                                    value={[currentTime]}
                                    max={duration || 100}
                                    step={1}
                                    className="w-full hover:cursor-grab active:cursor-grabbing"
                                    onValueChange={handleSeek}
                                />
                                <button
                                    onClick={handleLike}
                                    className="absolute -top-9 right-0 text-red-500 hover:text-red-600"
                                    aria-label="Toggle Favorite"
                                >
                                    {isPending ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
                                        </div>
                                    ) : isFavorite ? (
                                        <FaHeart className="text-red-500" size={20} />
                                    ) : (
                                        <Heart size={20} />
                                    )}
                                </button>
                                <button
                                    onClick={togglePlaybackSpeed}
                                    className="absolute -top-9 left-0 text-white font-bold"
                                    aria-label="Toggle Playback Speed"
                                >
                                    {playbackSpeed}X
                                </button>
                                <div className="absolute w-full flex justify-between text-sm text-zinc-400 mt-2">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="text-white p-2 rounded-full hover:bg-zinc-700">
                                    <SkipBack />
                                </button>
                                <button
                                    onClick={handleClick}
                                    className="p-2 rounded-full hover:bg-zinc-700 bg-white"
                                >
                                    {audioDetails.isPlaying ? (
                                        <Pause className="text-black" />
                                    ) : (
                                        <Play className="text-black" />
                                    )}
                                </button>
                                <button className="text-white p-2 rounded-full hover:bg-zinc-700">
                                    <SkipForward />
                                </button>
                            </div>
                        </div>
                        {audioDetails.audioFileUrl && (
                            <audio ref={audioRef} src={audioDetails.audioFileUrl} />
                        )}
                    </div>
                </ScrollArea>
            </main>
    );
};

export async function getServerSideProps(context: any) {
    const { trackId } = context.params;
    const cookies = parseCookies(context);
    const token = cookies.__connectify_token_from_server;

    let track = null;

    if (token) {
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
