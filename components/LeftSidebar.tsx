import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { HomeIcon, Library, LoaderPinwheel, Plus, Router } from "lucide-react";
import Link from "next/link";
import { PlaylistSkeleton } from "./Skeletons";
import { useEffect, useState } from "react";
import { useGetUserPlaylists } from "@/hooks/playlist";
import { useCurrentUser } from "@/hooks/auth";
import CreateTrackDialog from "./_dashboard/CreateTrackDialog";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { usePlaylistTracksStore } from "@/store/usePlaylistTracksStore";

const LeftSidebar = () => {
    const [songDialogOpen, setSongDialogOpen] = useState(false);
    const { data: user, isLoading } = useCurrentUser();
    const { data, isLoading: isFetchingUserPlaylist } = useGetUserPlaylists(user?.getCurrentUser?.username || "");
    const pathname = usePathname()
    const router = useRouter()
    const {setPlaylistDetails} = usePlaylistTracksStore()

    return (
        <div className="h-full flex flex-col gap-2 mr-1">
            {/* Navigation menu */}
            <div className="rounded-lg bg-[#121212] p-4">
                <div className="space-y-2">
                    <Link
                        href="/dashboard"
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
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800 hover:text-white cursor-pointer",
                            })
                        )}
                    >
                        <LoaderPinwheel className="mr-2 size-5" />
                        <span className="hidden md:inline">Explore</span>
                    </div>
                </div>
            </div>

            {/* Library section */}
            <div className="flex-1 rounded-lg bg-[#121212] p-4">
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
                            <div className="flex items-center justify-center h-full">
                                <h1 className="text-white text-center">Please login/signup</h1>
                            </div>
                        ) : (
                            data.playlists.map((playlist) => (
                                <div
                                    onClick={() => {
                                        if (pathname !== `/dashboard/playlist/${playlist?.id}`) {
                                            router.push(`/dashboard/playlist/${playlist?.id}`);
                                        }
                                    }}
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
                                </div>
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

//http://localhost:3000/dashoard/playlist/848316af-ffbd-4fb8-a001-86540377404f