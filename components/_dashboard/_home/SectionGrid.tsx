import PlayButton from "@/components/PlayButton";
import { Track, UserPlaylistsResponseItem } from "@/gql/graphql";
import Link from "next/link";

interface SectionGridProps {
  tracks?: Track[];
  playlists?: UserPlaylistsResponseItem[] | null;
}

const SectionGrid = ({ tracks, playlists }: SectionGridProps) => {
  const isPlaylistsAvailable = playlists && playlists.length > 0;

  return (
    <div className="mb-8 -mt-5">
      <div className="flex items-center justify-between mb-4">
        {/* <h2 className="text-xl sm:text-2xl font-bold">Section Title</h2> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isPlaylistsAvailable
          ? playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-[#1f1f1f] p-4 rounded-md hover:bg-[#353433] transition-all group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    <Link href={`/dashboard/playlist/${playlist.id}`}>
                      <img
                        src={playlist.coverImageUrl || ""}
                        alt={playlist.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                </div>
                <h3 className="font-medium mb-2 truncate">{playlist.name}</h3>
                <p className="text-sm text-zinc-400 truncate">
                  Tracks: {playlist.totalTracks}
                </p>
              </div>
            ))
          : tracks?.map((track) => (
              <div
                key={track.id}
                className="bg-[#1f1f1f] p-4 rounded-md hover:bg-[#353433] transition-all group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    <Link href={`/dashboard/show/${track.id}`}>
                      <img
                        src={track.coverImageUrl || ""}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    <PlayButton track={track} />
                  </div>
                </div>
                <h3 className="font-medium mb-2 truncate">{track.title}</h3>
                <h3 className="font-medium mb-2 truncate">By : {track.author?.username}</h3> 
              </div>
            ))}
      </div>
    </div>
  );
};

export default SectionGrid;
