import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCurrentUser } from "@/hooks/auth";
import { useGetCurrentTheme } from "@/hooks/theme";
import { useLikeTrack } from "@/hooks/track";
import { useAudioStore } from "@/store/useAudioStore";
import {
  Heart,
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
  const [theme] = useGetCurrentTheme()
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { audioDetails, setAudioDetails, togglePlay } = useAudioStore();
  const { mutateAsync: likeTrack, isPending } = useLikeTrack()

  const { data, isLoading } = useCurrentUser()

  const [isFavorite, setIsFavorite] = useState(audioDetails.isFavorite)

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLike = async () => {
    if(!isLoading && !data?.getCurrentUser) {
      toast.error("Please Login/Signup first")
      return
    }
    await likeTrack(audioDetails.id)
    setIsFavorite(!isFavorite)
  }


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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioDetails.audioFileUrl) return;

    // Play or pause based on the state
    if (audioDetails.isPlaying && audio.paused) {
      setAudioDetails({ audioRef });
      audio.play();
    } else if (!audioDetails.isPlaying && !audio.paused) {
      audio.pause();
    }

    // Update the audioRef in the store if necessary
  }, [audioDetails.audioFileUrl, audioDetails.isPlaying, setAudioDetails]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]; // Seek to the selected time
      setCurrentTime(value[0]); // Update the state to reflect the seek operation
    }
  };

  const togglePlayHandler = () => {
    togglePlay();
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
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
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {audioDetails.title}
                </div>
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
          ) : isFavorite ? (
            <FaHeart style={{color: theme as string}} size={20} />
          ) : (
            <Heart size={20} style={{color: theme as string}}/>
          )}
        </button>

        {/* Player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={togglePlayHandler}
            >
              {audioDetails.isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Repeat className="h-4 w-4" />
            </Button>
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
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="h-4 w-4" />
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
      {audioDetails.audioFileUrl && (
        <audio ref={audioRef} src={audioDetails.audioFileUrl} />
      )}
    </footer>
  );
};
