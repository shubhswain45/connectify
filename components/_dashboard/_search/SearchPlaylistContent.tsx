import React, { useEffect, useState, useRef } from 'react';
import { useSearchTrack } from '@/hooks/track'; // Correct import for the custom hook
import { FaPause, FaPlay } from 'react-icons/fa';
import { useGetCurrentTheme } from '@/hooks/theme';
import { useAudioStore } from '@/store/useAudioStore';
import { useRepeatableTracksStore } from '@/store/useRepeatableTracksStore';
import { useQueueStore } from '@/store/useQueueStore';
import { useRouter } from 'next/router';
import { PlaylistSkeleton, SearchContentSkeleton } from '../../Skeletons';
import { useSearchPlaylist } from '@/hooks/playlist';

interface SearchData {
    searchQuery: string;
    page: number;
}

interface SearchContentProps {
    searchData: SearchData;
    setSearchData: (data: SearchData) => void;
}

const SearchPlaylistContent: React.FC<SearchContentProps> = ({ searchData, setSearchData }) => {
    console.log("searchData", searchData);

    const [hasMore, setHasMore] = useState(true); // Tracks if there are more tracks to load
    const [allPlaylists, setAllPlaylists] = useState<any[]>([]); // State to hold all accumulated tracks
    const { data, isLoading, error } = useSearchPlaylist(searchData.searchQuery, searchData.page); // Fetch 10 tracks per page
    const [theme] = useGetCurrentTheme();
    const { audioDetails, setAudioDetails } = useAudioStore();
    const { isTrackRepeatable } = useRepeatableTracksStore();
    const { isTrackInQueue } = useQueueStore();
    const router = useRouter();
    const [prevQuery, setPrevQuery] = useState("")

    console.log("===================", data);
    
    useEffect(() => {
        if (!data) return

        // Check if the search query is different from the previous query before updating
        if (searchData.searchQuery !== prevQuery) {
            if (data) {
                setAllPlaylists(data?.playlists || []); // Reset the tracks when the query changes
                setPrevQuery(searchData.searchQuery); // Update prevQuery only when the search query changes
            }
        } else if (data && (data?.playlists?.length || 0) > 0) {
            // Append new data only if the query remains the same
            if (searchData.page != 1) {
                setAllPlaylists(prevPlaylist => [...prevPlaylist, ...data?.playlists || []]);
            }
        }

        // Check if the data length is less than 3 to indicate no more data
        if (data && (data?.playlists?.length || 0) < 3) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }

    }, [data]); // Trigger effect when `data` or `searchQuery` changes

    useEffect(() => {
        if (searchData.searchQuery == "") {
            setAllPlaylists([])
        }
    }, [searchData.searchQuery])

    const loadMoreTracks = () => {
        if (isLoading || !hasMore) return; // Prevent fetching if already fetching or no more data
        setSearchData({
            ...searchData,
            page: searchData.page + 1
        })
    };

    console.log("data", data);

    if (isLoading && searchData.page == 1) {
        return (
            searchData.searchQuery && (
                <SearchContentSkeleton />
            )
        );
    }

    if (!isLoading && data?.playlists?.length === 0 && searchData.searchQuery !== '' && !allPlaylists.length) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <h2 className="text-gray-500 text-lg font-medium">
                    No tracks found. Please refine your search.
                </h2>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleClick = (track: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, isPlayingCurrentSong: boolean) => {
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
            coverImageUrl: track.coverImageUrl || '',
            audioFileUrl: track.audioFileUrl,
            isPlaying: true,
            isFavorite: track.hasLiked,
            repeatable: isTrackRepeatable(track.id),
            isQueued: isTrackInQueue(track.id),
        });
    };



    return (
        <div className="px-4 sm:px-8 max-w-[800px] mx-auto space-y-4 mb-10">
            {allPlaylists?.map((playlist, index) => {
                return (
                    <div
                        key={playlist?.id}
                        className="p-3 rounded-md flex items-center gap-4 bg-[#1f1f1f] cursor-pointer hover:bg-[#353433] group relative"
                        onClick={() => {
                            router.push(`/dashboard/playlist/${playlist.id}`);
                        }}
                    >
                        {/* Track Cover Image */}
                        {playlist?.coverImageUrl && (
                            <img
                                src={playlist?.coverImageUrl}
                                alt={playlist?.name}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                        )}

                        {/* Track Details */}
                        <div className="flex-1">
                            <h2 className="text-white font-semibold">{playlist.name}</h2>
                            <p className="text-gray-400">{playlist.totalTracks}</p>
                        </div>
                    </div>
                );
            })}

            {/* Conditionally render the Load More button */}
            {allPlaylists?.length >= 3 && hasMore && (
                <div className="flex justify-center items-center w-full mt-4">
                    <button
                        onClick={loadMoreTracks}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        {isLoading ? "Loading..." : "Load more"}
                    </button>
                </div>
            )}
        </div>
    );



};

export default SearchPlaylistContent;
