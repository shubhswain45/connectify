import { Button } from "@/components/ui/button";
import { Track } from "@/gql/graphql";
import { useGetCurrentTheme } from "@/hooks/theme";
import { useAudioStore } from "@/store/useAudioStore";
import { useQueueStore } from "@/store/useQueueStore";
import { useRepeatableTracksStore } from "@/store/useRepeatableTracksStore";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ track }: { track: Track }) => {
  const [theme] = useGetCurrentTheme()
  const { audioDetails, setAudioDetails } = useAudioStore();
  const { isTrackRepeatable } = useRepeatableTracksStore()
  const { isTrackInQueue } = useQueueStore()

  const isPlayingCurrentSong =
    audioDetails.audioFileUrl === track.audioFileUrl && audioDetails.isPlaying;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Prevent the click from propagating to parent elements (e.g., Link)
    e.stopPropagation();

    if (isPlayingCurrentSong) {
      setAudioDetails({ isPlaying: false });
      return;
    }

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

  return (
    <Button
      size={"icon"}
      className="absolute bottom-3 right-2 hover:bg-green-400 hover:scale-105 transition-all opacity-100"
      style={{ backgroundColor: theme as string }}
      onClick={handleClick}
    >
      {isPlayingCurrentSong ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;
