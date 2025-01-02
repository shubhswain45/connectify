import React, { useEffect, useState } from 'react';
import { useSearchTrack } from '@/hooks/track'; // Correct import for the custom hook
import { FaPause, FaPlay } from 'react-icons/fa';
import { useGetCurrentTheme } from '@/hooks/theme';
import { useAudioStore } from '@/store/useAudioStore';
import { useRepeatableTracksStore } from '@/store/useRepeatableTracksStore';
import { useQueueStore } from '@/store/useQueueStore';
import { useRouter } from 'next/router';
import { SearchContentSkeleton } from '../../Skeletons';

interface SearchData {
  searchQuery: string;
  page: number;
}

interface SearchContentProps {
  searchQuery: string;
  searchData: SearchData;
  setSearchData: (data: SearchData) => void;
}

const SearchTrackContent: React.FC<SearchContentProps> = ({ searchQuery,searchData, setSearchData }) => {
  console.log("searchData", searchData);

  const [hasMore, setHasMore] = useState(true); // Tracks if there are more tracks to load
  const [allTracks, setAllTracks] = useState<any[]>([]); // State to hold all accumulated tracks
  const { data, isLoading, error } = useSearchTrack(searchQuery, searchData.page); // Fetch 10 tracks per page
  const [theme] = useGetCurrentTheme();
  const { audioDetails, setAudioDetails } = useAudioStore();
  const { isTrackRepeatable } = useRepeatableTracksStore();
  const { isTrackInQueue } = useQueueStore();
  const router = useRouter();
  const [prevQuery, setPrevQuery] = useState("")

  useEffect(() => {
    if (!data) return

    // Check if the search query is different from the previous query before updating
    if (searchData.searchQuery !== prevQuery) {
      if (data) {
        setAllTracks(data); // Reset the tracks when the query changes
        setPrevQuery(searchData.searchQuery); // Update prevQuery only when the search query changes
      }
    } else if (data && data.length > 0) {
      // Append new data only if the query remains the same
      if (searchData.page != 1) {
        setAllTracks(prevTracks => [...prevTracks, ...data]);
      }
    }

    // Check if the data length is less than 3 to indicate no more data
    if (data && data.length < 3) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

  }, [data]); // Trigger effect when `data` or `searchQuery` changes

  useEffect(() => {
    if (searchData.searchQuery == "") {
      setAllTracks([])
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

  if (!isLoading && data?.length === 0 && searchData.searchQuery !== '' && !allTracks.length) {
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
      {allTracks?.map((track) => {
        const isPlayingCurrentSong =
          audioDetails.audioFileUrl === track?.audioFileUrl && audioDetails.isPlaying;

        return (
          <div
            key={track?.id}
            className="p-3 rounded-md flex items-center gap-4 bg-[#1f1f1f] cursor-pointer hover:bg-[#353433] group relative"
            onClick={() => {
              router.push(`/dashboard/show/${track?.id}`);
            }}
          >
            {/* Track Cover Image */}
            {track?.coverImageUrl && (
              <img
                src={track?.coverImageUrl}
                alt={track?.title}
                className="w-16 h-16 rounded-md object-cover"
              />
            )}

            {/* Track Details */}
            <div className="flex-1">
              <h2 className="text-white font-semibold">{track?.title}</h2>
              <p className="text-gray-400">{track?.artist}</p>
            </div>

            {/* Play Button */}
            <button
              onClick={(e) => handleClick(track, e, isPlayingCurrentSong)}
              className="absolute transition-opacity opacity-0 rounded-full flex justify-center items-center p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
              style={{ background: theme as string }}
            >
              {isPlayingCurrentSong ? (
                <FaPause className="text-black" />
              ) : (
                <FaPlay className="text-black" />
              )}
            </button>
          </div>
        );
      })}

      {/* Conditionally render the Load More button */}
      {allTracks?.length >= 3 && hasMore && (
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

export default SearchTrackContent;
