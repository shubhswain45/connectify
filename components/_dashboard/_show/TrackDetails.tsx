import React, { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { Track } from '@/gql/graphql';
import { useBackgroundStore } from '@/store/useBackgroundStore';
import TrackDropDown from './TrackDropDown';

interface TrackDetailsProps {
  track: Track;
  isFavorite: boolean;
  setIsFavorite: (isFavorite: boolean) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (playbackSpeed: number) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Ensure this is correct
}

const TrackDetails: React.FC<TrackDetailsProps> = ({
  track,
  isFavorite,
  setIsFavorite,
  playbackSpeed,
  setPlaybackSpeed,
  setIsOpen
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <Image
          src={track.coverImageUrl || ''}
          alt="Track Artwork"
          className="w-72 h-72 rounded-lg shadow-lg object-cover"
          width={500}
          height={300}
        />
        <button
          aria-label="More Options"
          onClick={() => setDropdownOpen(prev => !prev)}
          className="absolute top-2 left-2 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
        >
          <MoreHorizontal className="text-white" size={20} />
        </button>

        <TrackDropDown
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          trackId={track.id}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          setIsOpen={setIsOpen}
        />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{track.title}</h2>
        <p className="text-xl text-zinc-400">{track.artist}</p>
      </div>
    </>
  );
};

export default TrackDetails;
