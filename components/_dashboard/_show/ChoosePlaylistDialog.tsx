import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Importing the search icon
import { useCurrentUser } from "@/hooks/auth";
import { useAddSongToPlaylist, useGetUserPlaylists } from "@/hooks/playlist";
import CreatePlaylistDialog from "@/components/CreatePlaylistDialog";
import { PlaylistSkeletonTwo } from "@/components/Skeletons";

interface CreateTrackDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    trackId: string
}

const ChoosePlaylistDialog = ({ isOpen, setIsOpen, trackId }: CreateTrackDialogProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [songDialogOpen, setSongDialogOpen] = useState(false)

    const { data: user, isLoading: isFetchingCurrentUser } = useCurrentUser()
    const { data, isLoading } = useGetUserPlaylists(user?.getCurrentUser?.username || "")

    const { mutate: addSongToPlaylist } = useAddSongToPlaylist()

    const handleClick = (playlistId: string) => {
        addSongToPlaylist({
            isNewPlaylist: false,
            existingPlaylistId: playlistId,
            trackIds: [trackId]
        })
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-gradient-to-b from-black to-zinc-900 border-zinc-700 max-h-[150vh] overflow-auto">
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-white text-lg font-semibold">Choose a Playlist</DialogTitle>
                    <DialogDescription className="text-zinc-400 text-sm">
                        Select an existing playlist or create a new one to add your track.
                    </DialogDescription>
                </DialogHeader>

                {/* Search Bar with Icon */}
                <div className="mt-4 relative mb-4">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
                    <Input
                        className="w-full pl-10 bg-zinc-800 text-white text-sm py-2"
                        placeholder="Search playlists..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div>
                    {/* Highlighted 'Create a new playlist' Button */}
                    <Button
                        onClick={() => setSongDialogOpen(true)}
                        className="w-full text-left bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 py-2 text-sm">
                        Create a new playlist
                    </Button>

                    {/* Playlist Buttons */}
                    <div className="space-y-2 mt-4 max-h-[200px] overflow-y-auto">
                        {
                            isLoading || isFetchingCurrentUser ? (
                                <PlaylistSkeletonTwo />
                            ) : data?.playlists?.length === 0 ? (
                                <p className="text-white text-sm">No playlists found</p>
                            ) : (
                                data?.playlists?.map((playlist) => (
                                    <Button
                                        onClick={() => handleClick(playlist.id)}
                                        key={playlist.id}
                                        className="w-full text-left bg-zinc-800 text-white py-2 text-sm"
                                    >
                                        #{playlist.name}
                                    </Button>
                                ))
                            )
                        }
                    </div>
                </div>
                {
                    songDialogOpen && <CreatePlaylistDialog songDialogOpen={songDialogOpen} setSongDialogOpen={setSongDialogOpen} trackId={trackId} />
                }
            </DialogContent>
        </Dialog>
    );
};

export default ChoosePlaylistDialog;
