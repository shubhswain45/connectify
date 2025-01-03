import React, { useEffect, useState } from 'react';
import { useSearchUser } from '@/hooks/user';
import { useRouter } from 'next/router';
import { SearchContentSkeleton } from '../../Skeletons';

interface SearchData {
    searchQuery: string;
    page: number;
}

interface SearchContentProps {
    searchData: SearchData;
    setSearchData: (data: SearchData) => void;
}

export interface SearchUserResponse {
    username: string; // User's username
    fullName: string; // User's full name
    profileImageURL?: string; // Optional profile image URL
    totalTracks: number; // Total number of tracks
}


const SearchUserContent: React.FC<SearchContentProps> = ({ searchData, setSearchData }) => {
    const [hasMore, setHasMore] = useState(true);
    const [allUsers, setAllUsers] = useState<SearchUserResponse[]>([]);
    const { data, isLoading } = useSearchUser(searchData.searchQuery, searchData.page);
    const router = useRouter();
    const [prevQuery, setPrevQuery] = useState("");

    useEffect(() => {
        if (!data) return;

        if (searchData.searchQuery !== prevQuery) {
            if (data) {
                const users = data.map((user) => {
                    return {
                        username: user?.username || "",
                        fullName: user?.fullName || "",
                        profileImageURL: user?.profileImageURL || "",
                        totalTracks: user?.totalTracks || 0
                    }
                })
                setAllUsers(users);
                setPrevQuery(searchData.searchQuery);
            }
        } else if (data && data.length > 0) {
            if (searchData.page !== 1) {
                setAllUsers((prevUsers) => [
                  ...(prevUsers || []),
                  ...(data?.filter((user): user is SearchUserResponse => user !== null) || []),
                ]);
              }
              
        }

        if (data && data.length < 3) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }, [data]);

    useEffect(() => {
        if (searchData.searchQuery === "") {
            setAllUsers([]);
        }
    }, [searchData.searchQuery]);

    const loadMoreTracks = () => {
        if (isLoading || !hasMore) return;
        setSearchData({
            ...searchData,
            page: searchData.page + 1,
        });
    };

    if (isLoading && searchData.page === 1) {
        return searchData.searchQuery ? <SearchContentSkeleton /> : null;
    }

    if (!isLoading && data?.length === 0 && searchData.searchQuery !== '' && !allUsers.length) {
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
            {allUsers?.map((user) => (
                <div
                    key={user?.username}
                    className="p-3 rounded-md flex items-center gap-4 bg-[#1f1f1f] cursor-pointer hover:bg-[#353433] group relative"
                    onClick={() => {
                        router.push(`/dashboard/${user.username}`);
                    }}
                >
                    {/* Profile Image with Fallback */}

                    <img
                        src={user?.profileImageURL || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"}
                        alt={user?.username}
                        className="w-16 h-16 rounded-full object-cover"
                    />

                    {/* User Details */}
                    <div className="flex-1">
                        <h2 className="text-white font-semibold">{user.username}</h2>
                        <h2 className="text-gray-400">Tracks: {user.totalTracks}</h2>
                    </div>
                </div>
            ))}

            {allUsers?.length >= 3 && hasMore && (
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

export default SearchUserContent;
