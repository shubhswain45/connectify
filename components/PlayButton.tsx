import { Button } from "@/components/ui/button";
import { Track } from "@/gql/graphql";
import { useAudioStore } from "@/store/useAudioStore";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ track }: { track: Track }) => {
  const { audioDetails, setAudioDetails } = useAudioStore();

  const isPlayingCurrentSong = audioDetails.audioFileUrl == track.audioFileUrl && audioDetails.isPlaying

  const handleClick = () => {
    // If the track ID is different, update the audio details

      if(isPlayingCurrentSong) {
        audioDetails.audioRef?.current?.pause()
        setAudioDetails({isPlaying: false})
        return
      }
      
      setAudioDetails({
        id: track.id,
        title: track.title,
        artist: track.artist,
        duration: track.duration,
        coverImageUrl: track.coverImageUrl || "",
        audioFileUrl: track.audioFileUrl,
        isPlaying: true,
      });
   
  };


  return (
    <Button
      size={"icon"}
      className="absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-100"
      onClick={handleClick}
    >
      {
        isPlayingCurrentSong ? <Pause className="size-5 text-black" /> : <Play className="size-5 text-black" />
      }
    </Button>
  );
};

export default PlayButton;
