import { MdOutlineChevronLeft } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaHeart, FaAngleLeft } from "react-icons/fa";
import { ListStart } from "lucide-react";
import { useLikeTrack } from "@/hooks/track";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useAudioStore } from "@/store/useAudioStore";
import { useQueueStore } from "@/store/useQueueStore";
import { useGetCurrentTheme } from "@/hooks/theme";
import { PiShareFat } from "react-icons/pi";
import { IoIosColorPalette } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { useBackgroundStore } from "@/store/useBackgroundStore";
import { Switch } from "@/components/ui/Switch";

type TrackDropDownProps = {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFavorite: boolean;
  setIsFavorite: (isFavorite: boolean) => void;
  trackId: string;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Ensure this is correct
};

function TrackDropDown({
  dropdownOpen,
  setDropdownOpen,
  isFavorite,
  setIsFavorite,
  trackId,
  playbackSpeed,
  setPlaybackSpeed,
  setIsOpen
}: TrackDropDownProps) {
  const [theme] = useGetCurrentTheme();
  const { mutateAsync: likeTrack, isPending } = useLikeTrack();
  const pathname = usePathname();
  const { audioDetails, setAudioDetails } = useAudioStore();
  const { removeTrackById, addSongToQueue } = useQueueStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentMenu, setCurrentMenu] = useState<"main" | "playback" | "theme">("main");

  const { bg, setBg } = useBackgroundStore()

  console.log("bg", bg);

  const availableSpeeds = [0.5, 0.75, 1, 1.5, 1.75, 2];

  const shareTrack = () => {
    navigator.clipboard.writeText(pathname);
    toast.success("URL copied to clipboard!");
  };

  const handleQueueOperation = () => {
    if (!audioDetails) {
      toast.error("No track available");
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
        duration: audioDetails.duration,
      });
      setAudioDetails({ isQueued: true });
    }

    toast.success(audioDetails.isQueued ? "Track removed from queue" : "Track added to queue");
  };

  const handleLike = async () => {
    await likeTrack(trackId);
    setIsFavorite(!isFavorite);
  };

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen, setDropdownOpen]);

  const background = {
    "Regular": "#121212",
    "Obsidian Ruby": "#330606",
    "Azure Eclipse": "#154394",
    "Shadow Mist": "#8c8c8c",
    "Blush Ember": "#b053a7"
  };

  return (
    dropdownOpen && (
      <motion.div
        ref={dropdownRef}
        className={`absolute top-12 max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ${currentMenu === "main" ? "w-40 left-2" : "w-[250px] -left-7 p-5"
          } bg-[#1f1f1f] text-white shadow-lg rounded-lg p-2 opacity-100`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Main dropdown animation */}
        {currentMenu === "main" && (
          <motion.ul className="space-y-2 text-sm">
            <li
              className="flex items-center space-x-2 hover:bg-[#353433] p-2 rounded cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="text-md">
                <FaPlus className="text-white" />
              </span>
              <span>Add to Playlist</span>
            </li>

            <li
              className="flex items-center space-x-2 hover:bg-[#353433] p-2 rounded cursor-pointer"
              onClick={handleQueueOperation}
            >
              <span>
                <ListStart className="text-white" size={15} />
              </span>
              <span>Add to Queue</span>
            </li>
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
              </div>
            ) : (
              <li
                className="flex items-center space-x-2 hover:bg-[#353433] p-2 rounded cursor-pointer"
                onClick={handleLike}
              >
                <span className="text-md">
                  <FaHeart style={{ color: isFavorite ? (theme as string) : "white" }} />
                </span>
                <span>{isFavorite ? "UnLiked Track" : "Liked Track"}</span>
              </li>
            )}
            <li
              className="flex items-center space-x-2 hover:bg-[#353433] p-2 rounded cursor-pointer ml-0"
              onClick={() => setCurrentMenu("playback")}
            >
              <span>
                <IoIosSettings size={19} />
              </span>
              <span>Playback</span>
            </li>

            <li
              className="flex items-center space-x-2 hover:bg-[#353433] p-2 rounded cursor-pointer"
              onClick={() => setCurrentMenu("theme")}
            >
              <span>
                {/* <MdOutlineChevronLeft size={24} /> */}
                <IoIosColorPalette size={17} />
              </span>
              <span>Theme</span>
            </li>

            <li
              className="flex items-center space-x-2 hover:bg-[#353433] p-2 rounded cursor-pointer"
              onClick={shareTrack}
            >
              <span className="text-sm">
                <PiShareFat size={16} />
              </span>
              <span>Share</span>
            </li>
          </motion.ul>
        )}

        {/* Playback menu animation */}
        {currentMenu === "playback" && (
          <motion.ul
            className="space-y-2 text-sm"
            initial={{ x: "20%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            exit={{
              x: "-10%",
              opacity: 0,
              transition: { duration: 0.15, ease: "easeInOut" },
            }}
          >
            <li
              className="flex items-center space-x-2 p-3 rounded cursor-pointer"
              onClick={() => setCurrentMenu("main")}
            >
              <span>
                <FaAngleLeft className="text-white" />
              </span>
              <span>Playback</span>
            </li>
            <li className="flex items-center space-x-2 justify-between bg-[#353433] p-3 rounded">
              <span>Loop</span>
              <span className="ml-auto">
                <Switch checked={audioDetails.repeatable} onCheckedChange={() => setAudioDetails({ repeatable: !audioDetails.repeatable })} />
              </span>
            </li>

            <li className="flex flex-col space-y-2 bg-[#353433] p-3 rounded">
              <div className="flex justify-between items-center">
                <span>Speed</span>
                <span className="text-xs text-gray-300">{playbackSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-full appearance-none bg-[#757575] h-1 rounded focus:outline-none range-slider"
              />
              <div className="flex justify-between text-xs text-gray-300">
                <span>0.5x</span>
                <span>2.0x</span>
              </div>
            </li>




          </motion.ul>
        )}


        {/* Theme menu animation */}
        {currentMenu === "theme" && (
          <motion.ul
            className="space-y-2 text-sm"
            initial={{ x: "20%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            exit={{
              x: "-10%",
              opacity: 0,
              transition: { duration: 0.15, ease: "easeInOut" },
            }}
          >
            <li
              className="flex items-center space-x-2 p-3 rounded cursor-pointer"
              onClick={() => setCurrentMenu("main")}
            >
              <span>
                <FaAngleLeft className="text-white" />
              </span>
              <span>Theme</span>
            </li>

            <li className="flex flex-col space-y-2 p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <span>Choose theme</span>
              </div>
              <ul className="space-y-2">
                {Object.entries(background).map(([theme, value], index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${bg === value ? "bg-blue-500 text-white" : "bg-[#353433]"
                      }`}
                    onClick={() => {
                      setBg(value)
                      localStorage.setItem("bg", value)
                    }}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 ${bg === value ? "border-blue-500 bg-blue-500" : "border-gray-400"
                        }`}
                    ></span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </li>
          </motion.ul>
        )}

      </motion.div>
    )
  );
}

export default TrackDropDown;
