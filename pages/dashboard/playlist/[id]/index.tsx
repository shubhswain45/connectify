import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react"; // Lucide React icon for edit
import Topbar from "@/components/Topbar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { createGraphqlClient } from "@/clients/api";
import { getPlaylistSongsQuery } from "@/graphql/query/playlist";
import { Track } from "@/gql/graphql";
import { useAudioStore } from "@/store/useAudioStore";
import { useGetCurrentTheme } from "@/hooks/theme";

// Utility function to format song duration
function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

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


const AlbumPage = ({ id, title, coverImageUrl, tracks }: { id: string, title: string, coverImageUrl: string, tracks: Track[] | null }) => {
    const [theme] = useGetCurrentTheme()
    const { audioDetails, setAudioDetails } = useAudioStore();

    const handleClick = (track: Track) => {
        // If the track ID is different, update the audio details
        const isPlayingCurrentSong = audioDetails.audioFileUrl == track.audioFileUrl && audioDetails.isPlaying

        if (isPlayingCurrentSong) {
            audioDetails.audioRef?.current?.pause()
            setAudioDetails({ isPlaying: false })
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

    if (!tracks) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-240px)] space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-400">
                    Sorry, Playlist does not exist 404 ☹️
                </h1>
            </div>
        );
    }
    return (
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
                            src={coverImageUrl}
                            alt={"Playlist url"}
                            className="w-[240px] h-[240px] shadow-xl rounded object-cover"
                        />

                        <div className="flex flex-col justify-center">
                            {/* Album Title and Artist */}
                            <h2 className="text-3xl font-semibold text-white">{title}</h2>
                            <p className="text-sm font-medium text-gray-400">{dummyAlbum.artist}</p>
                            <p className="text-sm font-medium text-gray-400">{dummyAlbum.releaseYear}</p>

                            {/* Play Button */}
                            <div className="mt-4">
                                {/* <PlayButton /> */}
                            </div>
                        </div>
                    </div>

                    {/* Song List Section */}
                    <div className="">
                        <div className="space-y-2 py-4 -mt-5">
                            {tracks?.map((track, index) => {
                                const isCurrentSong = true;
                                return (
                                    <div
                                        onClick={() => handleClick(track)}
                                        key={track.id}
                                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                                                text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                                    >
                                        <div className="flex items-center justify-center">
                                            {audioDetails.audioFileUrl == track.audioFileUrl && audioDetails.isPlaying ? (
                                                <div className="size-4" style={{color: theme as string}}>♫</div>
                                            ) : (
                                                <span className="group-hover:hidden">{index + 1}</span>
                                            )}
                                            {!(audioDetails.audioFileUrl == track.audioFileUrl && audioDetails.isPlaying) && (
                                                <Play className="h-4 w-4 hidden group-hover:block" />
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <img
                                                src={track.coverImageUrl || ""}
                                                alt={track.title}
                                                className="size-10"
                                            />
                                            <div>
                                                <div className="font-medium text-white">
                                                    {truncateText(track.title, 20)}
                                                </div>
                                                <div>{track.artist}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            23-23-12
                                        </div>
                                        <div className="flex items-center">
                                            {/* {formatDuration("2023-05-01T00:00:00Z")} */}
                                            23-23-12
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const cookies = parseCookies(context);  // Parse cookies from the context
    const token = cookies.__connectify_token_from_server;  // Get the token

    // If the token exists, consider the user as logged in
    const graphqlClient = createGraphqlClient(token);
    const { getPlaylistSongs } = await graphqlClient.request(getPlaylistSongsQuery, { playlistId: id });

    return {
        props: {
            id: getPlaylistSongs.id || "",
            title: getPlaylistSongs.title || "",
            coverImageUrl: getPlaylistSongs.coverImageUrl || "",
            tracks: getPlaylistSongs.tracks,
        },
    };
};

export default AlbumPage;


