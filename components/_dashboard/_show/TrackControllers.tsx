import { Slider } from '@/components/ui/slider'
import { Track } from '@/gql/graphql';
import { useGetCurrentTheme } from '@/hooks/theme';
import { useLikeTrack } from '@/hooks/track';
import { useAudioStore } from '@/store/useAudioStore';
import { useQueueStore } from '@/store/useQueueStore';
import { useRepeatableTracksStore } from '@/store/useRepeatableTracksStore';
import { Heart, ListMinus, ListPlus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import { motion } from "framer-motion";

interface TrackControllersProps {
    track: Track;
    isFavorite: boolean;
    setIsFavorite: (isFavorite: boolean) => void;
    playbackSpeed: number;
    setPlaybackSpeed: (playbackSpeed: number) => void
}

const TrackControllers: React.FC<TrackControllersProps> = ({ track, isFavorite, setIsFavorite, playbackSpeed, setPlaybackSpeed }) => {
    const [theme] = useGetCurrentTheme();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { audioDetails, setAudioDetails, togglePlay } = useAudioStore();
    const { mutateAsync: likeTrack, isPending } = useLikeTrack();
    const { isTrackRepeatable, markTrackAsRepeatable, unmarkTrackAsRepeatable } = useRepeatableTracksStore();
    const { addSongToQueue, isTrackInQueue, removeTrackById } = useQueueStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlaybackSpeed = () => {
        const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
        setPlaybackSpeed(nextSpeed);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const handleClick = () => {
        togglePlay();
    };

    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = audioRef.current.currentTime + 10;
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = audioRef.current.currentTime - 10;
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleRepeat = () => {
        if (!track) {
            toast.error('No track available');
            return;
        }

        if (audioDetails.repeatable) {
            unmarkTrackAsRepeatable(track.id);
        } else {
            markTrackAsRepeatable(track.id);
        }

        setAudioDetails({ repeatable: !audioDetails.repeatable });
    };

    const handleQueueOperation = () => {
        if (!audioDetails) {
            toast.error('No track available');
            return;
        }

        if (audioDetails.isQueued) {
            removeTrackById(audioDetails.id);
            setAudioDetails({ isQueued: false });
        } else {
            addSongToQueue({
                id: audioDetails.id,
                artist: audioDetails.artist,
                audioFileUrl: audioDetails.audioFileUrl,
                hasLiked: audioDetails.isFavorite,
                title: audioDetails.title,
                coverImageUrl: audioDetails.coverImageUrl,
                duration: audioDetails.duration
            });
            setAudioDetails({ isQueued: true });
        }

        toast.success(audioDetails.repeatable ? 'Track removed from queue' : 'Track added to queue');
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    useEffect(() => {
        const handlePlay = async () => {
            const audio = audioRef.current;
            if (!audio || !audioDetails.audioFileUrl) return;

            if (audioDetails.isPlaying && audio.paused) {
                try {
                    await audio.play();
                } catch (error) {
                    console.log(error);
                    setAudioDetails({ isPlaying: false });
                }
            } else if (!audioDetails.isPlaying && !audio.paused) {
                audio.pause();
            }
        };

        handlePlay();
    }, [audioDetails, setAudioDetails]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            if (audioDetails.repeatable) {
                audio.play();
                return;
            }
            setAudioDetails({ isPlaying: false });
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioDetails, setAudioDetails, audioDetails.repeatable]);

    useEffect(() => {
        if (!track) return;

        setAudioDetails({
            id: track.id,
            title: track.title,
            artist: track.artist,
            duration: track.duration,
            coverImageUrl: track.coverImageUrl || "",
            audioFileUrl: track.audioFileUrl,
            isPlaying: true,
            isFavorite: track.hasLiked,
            repeatable: isTrackRepeatable(track.id),
            isQueued: isTrackInQueue(track.id)
        });
    }, [track, isTrackRepeatable, isTrackInQueue, setAudioDetails]);
    
    return (
        <>
            <div className="w-72 relative">
                <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    className="w-full hover:cursor-grab active:cursor-grabbing"
                    onValueChange={handleSeek}
                />
                <button
                    onClick={() => { likeTrack(track.id), setIsFavorite(!isFavorite) }}
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

            <div className="flex items-center space-x-6">
                <button className="text-white p-2 rounded-full hover:bg-zinc-700" onClick={handleRepeat}>
                    {/* <Repeat style={{ color: audioDetails.repeatable ? theme as string : "" }} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={audioDetails.repeatable ? theme as string : "currentColor"} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-repeat"><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>
                </button>
                <button className="text-white p-2 ml-14 rounded-full" onClick={skipBackward}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                </button>
                <motion.button
                    onClick={handleClick}
                    className="p-2 rounded-full bg-white"
                    whileTap={{ scale: 0.9 }}  // Animate on click (scale down when clicked)
                    transition={{ type: "spring", stiffness: 300 }} // Smooth spring transition
                >
                    {audioDetails.isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="black"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                    )}
                </motion.button>
                <button className="text-white p-2 rounded-full" onClick={skipForward}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                </button>
                <button className="text-white p-2 rounded-full hover:bg-zinc-700" onClick={handleQueueOperation}>
                    {
                        audioDetails.isQueued ? <ListMinus /> : <ListPlus />
                    }
                </button>

                {audioDetails.audioFileUrl && (
                    <audio ref={audioRef} src={audioDetails.audioFileUrl} />
                )}
            </div>
        </>
    )
}

export default TrackControllers