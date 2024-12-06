import { ScrollArea } from "@/components/ui/scroll-area";
import {Play } from "lucide-react"; // Lucide React icon for edit
import MainLayout from "@/layout/MainLayout";
import Topbar from "@/components/Topbar";
import PlayButton from "@/components/PlayButton";

// Dummy data for album
const dummyAlbum = {
    title: "We Don't Know",
    artist: "Shubh",
    releaseYear: 2023,
    songs: [
        {
            _id: "1",
            title: "song one two song three song four and so on",
            artist: "Shubh",
            createdAt: "2023-05-01T00:00:00Z",
            duration: 180,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "2",
            title: "Ilahi mera je aye By(Arijt singh)",
            artist: "Shubh",
            createdAt: "2023-05-02T00:00:00Z",
            duration: 210,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "2",
            title: "jsys wywyyw iiaiaia isisisi jdjdjjjd oisiususu isiusu",
            artist: "Shubh",
            createdAt: "2023-05-02T00:00:00Z",
            duration: 210,
            imageUrl: "https://via.placeholder.com/150",
        },
        // More songs can be added here
    ],
    imageUrl: "https://via.placeholder.com/240",
};

// Helper function to truncate text
function truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const AlbumPage = () => {
    return (
        <MainLayout>
            <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
                {/* Topbar */}
                <Topbar />

                {/* Scrollable Content */}
                <ScrollArea className="h-[calc(100vh-180px)]">
                    <div className="p-4 sm:p-6">
                        {/* Album Section */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-8">
                            {/* Album Cover */}
                            <img
                                src={dummyAlbum.imageUrl}
                                alt={dummyAlbum.title}
                                className="w-[240px] h-[240px] shadow-xl rounded"
                            />
                            <div className="flex flex-col justify-center">
                                {/* Album Title and Artist */}
                                <h2 className="text-3xl font-semibold text-white">{dummyAlbum.title}</h2>
                                <p className="text-sm font-medium text-gray-400">{dummyAlbum.artist}</p>
                                <p className="text-sm font-medium text-gray-400">{dummyAlbum.releaseYear}</p>

                                {/* Play Button */}
                                <div className="mt-4">
                                    <PlayButton />
                                </div>
                            </div>
                        </div>

                        {/* Song List Section */}
                        <div className="px-6">
                            <div className="space-y-2 py-4">
                                {dummyAlbum?.songs.map((song, index) => {
                                    const isCurrentSong = true;
                                    return (
                                        <div
                                            key={song._id}
                                            className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                                                text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                                        >
                                            <div className="flex items-center justify-center">
                                                {isCurrentSong && true ? (
                                                    <div className="size-4 text-green-500">♫</div>
                                                ) : (
                                                    <span className="group-hover:hidden">{index + 1}</span>
                                                )}
                                                {!isCurrentSong && (
                                                    <Play className="h-4 w-4 hidden group-hover:block" />
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={song.imageUrl}
                                                    alt={song.title}
                                                    className="size-10"
                                                />
                                                <div>
                                                    <div className="font-medium text-white">
                                                        {truncateText(song.title, 20)}
                                                    </div>
                                                    <div>{song.artist}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {song.createdAt.split("T")[0]}
                                            </div>
                                            <div className="flex items-center">
                                                {formatDuration(song.duration)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </main>
        </MainLayout>
    );
};

export default AlbumPage;

// Utility function to format song duration
function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
