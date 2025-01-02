import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchContentSkeleton } from '../../Skeletons';
import { useSearchPlaylist } from '@/hooks/playlist';

interface UserPlaylistsResponseItem {
    id: string;  // ID is commonly represented as a string, but you can modify it based on your actual data type.
    name: string;
    coverImageUrl: string;
    totalTracks: number;
}


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
    const [allPlaylists, setAllPlaylists] = useState<UserPlaylistsResponseItem[] | undefined>([]); // State to hold all accumulated tracks
    const { data, isLoading } = useSearchPlaylist(searchData.searchQuery, searchData.page); // Fetch 10 tracks per page
    const router = useRouter();
    const [prevQuery, setPrevQuery] = useState("")

    console.log("===================", data);


    useEffect(() => {
        if (!data) return

        // Check if the search query is different from the previous query before updating
        if (searchData.searchQuery !== prevQuery) {
            if (data) {
                const playlists = data.playlists?.map((playlist) => {
                    return {
                        id: playlist.id,
                        name: playlist.name,
                        coverImageUrl: playlist.coverImageUrl,
                        totalTracks: playlist.totalTracks
                    }
                })
                setAllPlaylists(playlists); // Reset the tracks when the query changes
                setPrevQuery(searchData.searchQuery); // Update prevQuery only when the search query changes
            }
        } else if (data && (data?.playlists?.length || 0) > 0) {
            // Append new data only if the query remains the same
            if (searchData.page !== 1) {
                setAllPlaylists(prevPlaylist => [...(prevPlaylist || []), ...(data?.playlists || [])]);
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

    if (!isLoading && data?.playlists?.length === 0 && searchData.searchQuery !== '' && !allPlaylists?.length) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <h2 className="text-gray-500 text-lg font-medium">
                    No tracks found. Please refine your search.
                </h2>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-8 max-w-[800px] mx-auto space-y-4 mb-10">
            {allPlaylists?.map((playlist) => {
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
            {(allPlaylists?.length || 0) >= 3 && hasMore && (
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
