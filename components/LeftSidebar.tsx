import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { HomeIcon, Library, Plus } from "lucide-react";
import Link from "next/link";
import { PlaylistSkeleton } from "./PlaylistSkeleton";
import { useState } from "react";
import CreateTrackDialog from "./CreateTrackDialog";
import { useGetUserPlaylists } from "@/hooks/playlist";
import { useCurrentUser } from "@/hooks/auth";

const LeftSidebar = () => {
    const [songDialogOpen, setSongDialogOpen] = useState(false);
    const { data: user, isLoading } = useCurrentUser();
    const { data, isLoading: isFetchingUserPlaylist } = useGetUserPlaylists(user?.getCurrentUser?.username || "");

    return (
        <div className="h-full flex flex-col gap-2 mr-1">
            {/* Navigation menu */}
            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800 hover:text-white",
                            })
                        )}
                    >
                        <HomeIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Home</span>
                    </Link>

                    <div
                        onClick={() => setSongDialogOpen(true)}
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800 hover:text-white cursor-pointer",
                            })
                        )}
                    >
                        <Plus className="mr-2 size-5" />
                        <span className="hidden md:inline">Create</span>
                    </div>
                </div>
            </div>

            {/* Library section */}
            <div className="flex-1 rounded-lg bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-5 mr-2" />
                        <span className="hidden md:inline">Playlists</span>
                    </div>
                    <button
                        onClick={() => setSongDialogOpen(true)}
                        className="text-zinc-400 hover:text-white transition-colors"
                        aria-label="Add Playlist"
                    >
                        <Plus className="size-5" />
                    </button>
                </div>

                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading || isFetchingUserPlaylist ? (
                            <PlaylistSkeleton />
                        ) : !data?.playlists ? (
                            <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
                                <h1 className="text-white text-center">Please login/signup</h1>
                            </div>
                        ) : (
                            data.playlists.map((playlist) => (
                                <Link
                                    href={`/playlist/${playlist?.id}`}
                                    key={playlist?.id}
                                    className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                                >
                                    <img
                                        src={playlist?.coverImageUrl}
                                        alt="Playlist img"
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="font-medium truncate">{playlist?.name}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
            {songDialogOpen && (
                <CreateTrackDialog songDialogOpen={songDialogOpen} setSongDialogOpen={setSongDialogOpen} />
            )}
        </div>
    );
};

export default LeftSidebar;