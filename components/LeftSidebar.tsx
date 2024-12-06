import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            href="/"
            className="w-full justify-start text-white hover:bg-zinc-800 flex items-center"
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          {/* Simulating SignedIn condition */}
          <Link
            href="/chat"
            className="w-full justify-start text-white hover:bg-zinc-800 flex items-center"
          >
            <MessageCircle className="mr-2 size-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {/* Placeholder for playlist items */}
            {[1, 2, 3, 4].map((index) => (
              <Link
                href={`/albums/${index}`}
                key={index}
                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
              >
                <img
                  src="/placeholder-image.jpg"
                  alt="Playlist img"
                  className="size-12 rounded-md flex-shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0 hidden md:block">
                  <p className="font-medium truncate">Album Title {index}</p>
                  <p className="text-sm text-zinc-400 truncate">
                    Album • Artist Name {index}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
