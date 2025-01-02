import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCurrentUser } from "@/hooks/auth";
import { useGetCurrentTheme } from "@/hooks/theme";
import { useLikeTrack } from "@/hooks/track";
import { useAudioStore } from "@/store/useAudioStore";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";

import {
  Heart,
  Laptop2,
  ListMinus,
  ListPlus,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  RotateCw,
  Volume1,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueueStore } from "@/store/useQueueStore";
import { useRepeatableTracksStore } from "@/store/useRepeatableTracksStore";
import { usePlaylistTracksStore } from "@/store/usePlaylistTracksStore";
import Link from "next/link";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
  /*** Theme Management ***/
  const [theme] = useGetCurrentTheme();

  const router = useRouter()
  /*** Audio Player State Management ***/
  const { audioDetails, setAudioDetails, togglePlay } = useAudioStore();
  const { playlistDetails, setPlaylistDetails, toggleTrackLikeStatus, getCurrentTrackIndex, updateTrackAvailability } = usePlaylistTracksStore();

  // Manage volume, playback time, and audio duration
  const [volume, setVolume] = useState(75); // Default volume level
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Total duration of the audio

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { queue, removeSongFromQueue, isTrackInQueue, addSongToQueue, removeTrackById, updateIsFavorite } = useQueueStore()

  /*** User Authentication ***/
  const { data, isLoading } = useCurrentUser();

  /*** Ref for Audio Element ***==/
 

  /*** Mutation Hook for Track Actions ***/
  const { mutateAsync: likeTrack, isPending } = useLikeTrack();

  const { isTrackRepeatable, markTrackAsRepeatable, unmarkTrackAsRepeatable } = useRepeatableTracksStore()

  /***********************
   * Helper Functions    *
   ***********************/

  // Toggle play and pause
  const togglePlayHandler = () => {
    if (!audioDetails.audioFileUrl) {
      return;
    }
    togglePlay();
  };


  // Handle liking the current track
  const handleLike = async () => {
    if (!isLoading && !data?.getCurrentUser) {
      toast.error("Please Login/Signup first");
      return;
    }
    await likeTrack(audioDetails.id);
    if (audioDetails.isFavorite) {
      updateIsFavorite(audioDetails.id, false)
      toggleTrackLikeStatus(audioDetails.id, false)
    } else {
      updateIsFavorite(audioDetails.id, true)
      toggleTrackLikeStatus(audioDetails.id, true)

    }
    setAudioDetails({ isFavorite: !audioDetails.isFavorite })
  };

  // Handle seeking within the audio track
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0]; // Seek to the selected time
      setCurrentTime(value[0]); // Update the playback state
    }
  };

  // Navigate to the previous or next track
  const handleNextPrevSong = (action: "prev" | "next") => {
    const { tracks, currentTrackIndex } = playlistDetails;
    const trackIndex = action === "prev" ? currentTrackIndex - 1 : currentTrackIndex + 1;

    // Ensure navigation is valid
    if ((action === "prev" && !playlistDetails.hasPrev) || (action === "next" && !playlistDetails.hasNext)) {
      return;
    }

    // Retrieve the target track details
    const track = tracks?.[trackIndex];
    if (!track) return;

    // Update audio details with the target track
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
  };

  /***********************
   * Lifecycle Effects   *
   ***********************/

  // Sync audio element's events (e.g., time updates, end of track) with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const currentPath = router.pathname; // Gets the current path definition
    const currentRoute = router.asPath; // Gets the actual route with dynamic values

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handleEnded = () => {
      const peekTrack = queue.peek()

      if (audioDetails.repeatable) {
        audio.play()
        return
      }

      if (peekTrack) {
        setAudioDetails({
          id: peekTrack.id,
          title: peekTrack.title,
          artist: peekTrack.artist,
          duration: peekTrack.duration,
          coverImageUrl: peekTrack.coverImageUrl || "",
          audioFileUrl: peekTrack.audioFileUrl,
          isPlaying: true,
          isFavorite: peekTrack.hasLiked,
          repeatable: isTrackRepeatable(peekTrack.id),
          isQueued: false
        });
        removeSongFromQueue()
        return
      }

      if (currentPath === '/dashboard') {
        setAudioDetails({ isPlaying: false }); // Stop playback if no next track
      } else if (currentPath === '/dashboard/playlist/[id]') {

        const { tracks, currentTrackIndex } = playlistDetails;
        if (!tracks || tracks?.length === currentTrackIndex + 1) {
          setAudioDetails({ isPlaying: false }); // Stop playback if no next track
          return;
        }

        // Play the next track
        const nextTrack = tracks?.[currentTrackIndex + 1];
        if (nextTrack) {
          setAudioDetails({
            id: nextTrack.id,
            title: nextTrack.title,
            artist: nextTrack.artist,
            duration: nextTrack.duration,
            coverImageUrl: nextTrack.coverImageUrl || "",
            audioFileUrl: nextTrack.audioFileUrl,
            isPlaying: true,
            isFavorite: nextTrack.hasLiked,
            repeatable: isTrackRepeatable(nextTrack.id),
            isQueued: isTrackInQueue(nextTrack.id)
          });
        }
      };
    }

    // Add event listeners
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    // Cleanup event listeners
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioDetails, setAudioDetails, playlistDetails, audioDetails.repeatable]);

  // Synchronize audio playback state with store
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioDetails.audioFileUrl) return;

    if ((audioDetails.isPlaying && audio.paused)) {
      setAudioDetails({ audoRef: audioRef })
      console.log("hahahahahhahahahhahahah");

      audio.play();
    } else if (!audioDetails.isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [audioDetails, audioDetails.isPlaying]);

  // Update navigation state and favorite status based on the current track
  useEffect(() => {
    const { tracks } = playlistDetails
    if (!tracks) {
      return
    }

    const idx = getCurrentTrackIndex(audioDetails.id)
    setPlaylistDetails({ currentTrackIndex: idx })

    updateTrackAvailability(idx)

  }, [playlistDetails.tracks, audioDetails]);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioRef.current.currentTime + 10,
        setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioRef.current.currentTime - 10,
        setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleRepeat = () => {
    // Guard clause for missing track
    if (!audioDetails) {
      toast.error('No track available');
      return;
    }

    if (audioDetails.repeatable) {
      unmarkTrackAsRepeatable(audioDetails.id);
    } else {
      markTrackAsRepeatable(audioDetails.id);
    }

    // Update UI state
    setAudioDetails({ repeatable: !audioDetails.repeatable })
  }

  const handleQueueOperation = () => {
    // Guard clause for missing track
    if (!audioDetails) {
      toast.error('No track available');
      return;
    }

    if (audioDetails.isQueued) {
      // Remove track from queue
      removeTrackById(audioDetails.id);
      setAudioDetails({ isQueued: false })
    } else {
      // Add track to queue
      addSongToQueue({
        id: audioDetails.id,
        artist: audioDetails.artist,
        audioFileUrl: audioDetails.audioFileUrl,
        hasLiked: audioDetails.isFavorite,
        title: audioDetails.title,
        coverImageUrl: audioDetails.coverImageUrl,
        duration: audioDetails.duration
      });
      setAudioDetails({ isQueued: true })
    }

    // Update UI state
    toast.success(audioDetails.repeatable ? 'Track removed from queue' : 'Track added to queue');
  };

  return (
    <footer className="h-20 sm:h-24 bg-[#1f1f1f] px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Currently playing song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {audioDetails.title && (
            <>
              <img
                src={audioDetails.coverImageUrl || ""}
                alt={audioDetails.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <Link href={`/dashboard/show/${audioDetails.id}`}>
                  <div className="font-medium truncate hover:underline cursor-pointer">
                    {audioDetails.title}
                  </div>
                </Link>

                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {audioDetails.artist}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleLike}
          aria-label="Toggle Favorite"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
            </div>
          ) : audioDetails.isFavorite ? (
            <FaHeart style={{ color: theme as string }} size={20} />
          ) : (
            <Heart size={20} style={{ color: theme as string }} />
          )}
        </button>

        {/* Player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className={`p-2 rounded-full 
              ${audioDetails.audioFileUrl ? "text-white hover:bg-zinc-700" : "text-zinc-600"} `}
              onClick={skipBackward}
            >
              <RotateCcw size={20} />
            </button>

            {/* prev button */}
            <MdSkipPrevious
              size={30}
              className={`hover:bg-transparent hover:${playlistDetails.hasPrev ? "text-white" : "text-zinc-600"} ${playlistDetails.hasPrev ? "text-white cursor-pointer" : "text-zinc-600"}  transition-transform duration-300 ease-in-out transform ${playlistDetails.hasPrev && "hover:scale-110"}`}
              onClick={() => handleNextPrevSong("prev")}
            />

            <Button
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 transition-transform duration-300 ease-in-out transform hover:scale-110"
              onClick={togglePlayHandler}
            >
              {audioDetails.isPlaying ? (
                <Pause className="h-5 w-5 transition-transform duration-300 ease-in-out transform hover:scale-125" />
              ) : (
                <Play className="h-5 w-5 transition-transform duration-300 ease-in-out transform hover:scale-125" />
              )}
            </Button>

            {/* next button */}
            <MdSkipNext
              size={30}
              className={`hover:bg-transparent hover:${playlistDetails.hasNext ? "text-white" : "text-zinc-600"} ${playlistDetails.hasNext ? "text-white cursor-pointer" : "text-zinc-600"}  transition-transform duration-300 ease-in-out transform ${playlistDetails.hasNext && "hover:scale-110"}`}
              onClick={() => handleNextPrevSong("next")}
            />

            <button
              className={`p-2 rounded-full 
              ${audioDetails.audioFileUrl ? "text-white hover:bg-zinc-700" : "text-zinc-600"} `}
              onClick={skipForward}
            >
              <RotateCw size={20} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        {/* Volume controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 hover:bg-transparent"
            onClick={handleRepeat}
          >
            <Repeat style={{ color: audioDetails.repeatable ? theme as string : "" }} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 hover:bg-transparent"
            onClick={handleQueueOperation}
          >
            {
              audioDetails.isQueued ? <ListMinus /> : <ListPlus />
            }
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <Volume1 className="h-4 w-4" />
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Audio Element */}
      {
        audioDetails && (
          <audio ref={audioRef} src={audioDetails.audioFileUrl} />
        )
      }
    </footer >
  );
};
