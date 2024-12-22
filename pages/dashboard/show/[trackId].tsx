import React, { useEffect, useRef, useState } from "react";
import {
    SkipBack,
    SkipForward,
    Heart,
    Play,
    Pause,
    MoreHorizontal,
    Logs,
    ListStart,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import { Slider } from "@/components/ui/slider";
import { createGraphqlClient } from "@/clients/api";
import { getTrackByIdQuery } from "@/graphql/query/track";
import { Track } from "@/gql/graphql";
import { FaHeart, FaPlus, FaShareAlt } from "react-icons/fa";
import { parseCookies } from "nookies";
import { useLikeTrack } from "@/hooks/track";
import { useAudioStore } from "@/store/useAudioStore";
import { GetServerSidePropsContext } from "next";
import ChoosePlaylistDialog from "@/components/ChoosePlaylistDialog";
import { useGetCurrentTheme } from "@/hooks/theme";

const AudioDetailPage = ({ track }: { track: Track | null }) => {
    const [theme] = useGetCurrentTheme()
    const [isFavorite, setIsFavorite] = useState(track?.hasLiked);
    const { audioDetails, setAudioDetails } = useAudioStore();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1); // Playback speed state
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

    const [isOpen, setIsOpen] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

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

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                                onClick={toggleDropdown}
                                className="absolute top-2 left-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                            >
                                <MoreHorizontal className="text-white" size={20} />
                            </button>

                            {dropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute top-12 left-2 w-40 bg-gradient-to-b from-zinc-800 to-zinc-900 text-white shadow-lg rounded-lg p-2 opacity-100"
                                >
                                    <ul className="space-y-2 text-sm">
                                        {/* Add to Playlist */}
                                        <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer" onClick={() => setIsOpen(true)}>
                                            <span className="text-md">
                                                <FaPlus className="text-white" />
                                            </span>
                                            <span>Add to Playlist</span>
                                        </li>

                                        {/* Add to Queue */}
                                        <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
                                            <span className="text-xm">
                                                <ListStart className="text-white" />
                                            </span>
                                            <span>Add to Queue</span>
                                        </li>

                                        {/* Liked Track */}
                                        <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
                                            <span className="text-md">
                                                <FaHeart className="text-white" />
                                            </span>
                                            <span>Liked Track</span>
                                        </li>

                                        {/* Share */}
                                        <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
                                            <span className="text-md">
                                                <FaShareAlt className="text-white" />
                                            </span>
                                            <span>Share</span>
                                        </li>
                                    </ul>
                                </div>
                            )}


                        </div>

                        <div className="text-center space-y-2">
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
                                className="absolute -top-9 right-0"
                                aria-label="Toggle Favorite"
                            >
                                {isPending ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
                                    </div>
                                ) : isFavorite ? (
                                    <FaHeart
                                        size={20}
                                        style={{ color: theme as string }}
                                    />
                                ) : (
                                    <Heart size={20}
                                        style={{ color: theme as string }}
                                    />
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

                {isOpen && (
                    <ChoosePlaylistDialog isOpen={isOpen} setIsOpen={setIsOpen} trackId={track?.id || ""} />
                )}
            </ScrollArea>
        </main>
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
