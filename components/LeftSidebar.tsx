import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { HomeIcon, Library, Plus } from "lucide-react";
import Link from "next/link";
import PlaylistSkeleton from "./PlaylistSkeleton";
import { useState } from "react";
import CreateTrackDialog from "./CreateTrackDialog";

const LeftSidebar = () => {
    const [songDialogOpen, setSongDialogOpen] = useState(false);

    // Dummy album data
    const albums = [
        {
            _id: "1",
            imageUrl: "/images/album1.jpg",
            title: "Album One",
            artist: "Artist One",
        },
        {
            _id: "2",
            imageUrl: "/images/album2.jpg",
            title: "Album Two",
            artist: "Artist Two",
        },
        {
            _id: "3",
            imageUrl: "/images/album3.jpg",
            title: "Album Three",
            artist: "Artist Three",
        },
        {
            _id: "4",
            imageUrl: "/images/album4.jpg",
            title: "Album Four",
            artist: "Artist Four",
        },
    ];

    return (
        <div className="h-full flex flex-col gap-2 mr-1">
            {/* Navigation menu */}
            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link
                        href={"/"}
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
                    {/* Plus Icon for adding playlist */}
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
                        {/* Render dummy albums */}
                        {true ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link
                                    href={`/albums/${album._id}`}
                                    key={album._id}
                                    className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                                >
                                    <img
                                        src={album.imageUrl}
                                        alt="Playlist img"
                                        className="size-12 rounded-md flex-shrink-0 object-cover"
                                    />
                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="font-medium truncate">{album.title}</p>
                                        <p className="text-sm text-zinc-400 truncate">Album • {album.artist}</p>
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
