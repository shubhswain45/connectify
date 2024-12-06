import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const dummyAlbum = {
    title: "We Don't Know",
    artist: "Shubh",
    releaseYear: 2023,
    songs: [
        {
            _id: "1",
            title: "Song One",
            artist: "Shubh",
            createdAt: "2023-05-01T00:00:00Z",
            duration: 180,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "2",
            title: "Song Two",
            artist: "Shubh",
            createdAt: "2023-05-02T00:00:00Z",
            duration: 210,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "3",
            title: "Song Three",
            artist: "Shubh",
            createdAt: "2023-05-03T00:00:00Z",
            duration: 200,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "4",
            title: "Song Four",
            artist: "Shubh",
            createdAt: "2023-05-04T00:00:00Z",
            duration: 240,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        },
        {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        }, {
            _id: "5",
            title: "Song Five",
            artist: "Shubh",
            createdAt: "2023-05-05T00:00:00Z",
            duration: 220,
            imageUrl: "https://via.placeholder.com/150",
        },
    ],
    imageUrl: "https://via.placeholder.com/240",
};

const AlbumPage = () => {
    return (
        <div className='h-full'>
                {/* Main Content */}
                <div className='relative min-h-full'>
                    {/* bg gradient */}
                    <div
                        className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
                        aria-hidden='true'
                    />

                    {/* Content */}
                    <div className='relative z-10'>
                        <div className='flex p-6 gap-6 pb-8'>
                            <img
                                src={""}
                                alt={""}
                                className='w-[240px] h-[240px] shadow-xl rounded'
                            />
                            <div className='flex flex-col justify-end'>
                                <p className='text-sm font-medium'>Album</p>
                                <h1 className='text-7xl font-bold my-4'>we dont know</h1>
                                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                                    <span className='font-medium text-white'>shubh</span>
                                    <span>• 5 songs</span>
                                    <span>• 2023</span>
                                </div>
                            </div>
                        </div>

                        {/* play button */}
                        <div className='px-6 pb-4 flex items-center gap-6'>
                            <Button
                                // onClick={}
                                size='icon'
                                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all'
                            >
                                <Play className='h-7 w-7 text-black' />
                            </Button>
                        </div>

                        {/* Table Section */}
                        <div className='bg-black/20 backdrop-blur-sm'>
                            {/* table header */}
                            <div
                                className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5'
                            >
                                <div>#</div>
                                <div>Title</div>
                                <div>Released Date</div>
                                <div>
                                    <Clock className='h-4 w-4' />
                                </div>
                            </div>

                            {/* songs list */}
                            <ScrollArea className='h-[400px] rounded-md'>


                                <div className='px-6'>
                                    <div className='space-y-2 py-4'>
                                        {dummyAlbum?.songs.map((song, index) => {
                                            const isCurrentSong = true;
                                            return (
                                                <div
                                                    key={song._id}
                                                    // onClick={() => handlePlaySong(index)}
                                                    className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
                                                >
                                                    <div className='flex items-center justify-center'>
                                                        {isCurrentSong && true ? (
                                                            <div className='size-4 text-green-500'>♫</div>
                                                        ) : (
                                                            <span className='group-hover:hidden'>{index + 1}</span>
                                                        )}
                                                        {!isCurrentSong && (
                                                            <Play className='h-4 w-4 hidden group-hover:block' />
                                                        )}
                                                    </div>

                                                    <div className='flex items-center gap-3'>
                                                        <img src={song.imageUrl} alt={song.title} className='size-10' />

                                                        <div>
                                                            <div className={`font-medium text-white`}>{song.title}</div>
                                                            <div>{song.artist}</div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center'>{song.createdAt.split("T")[0]}</div>
                                                    <div className='flex items-center'>{formatDuration(song.duration)}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
        </div >
    );
};
export default AlbumPage;