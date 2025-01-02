import React, { useRef } from "react";
import PlaylistDropdown from "./PlaylistDropDown";

// Define the prop types
type PlaylistDetailsProps = {
    coverImageUrl: string; // URL for the playlist cover image
    title: string;         // Playlist title
    createdBy: string;     // Creator of the playlist
};

function PlaylistDetails({ coverImageUrl, title, createdBy }: PlaylistDetailsProps) {
    const menuButtonRef = useRef<HTMLDivElement | null>(null); // Ref to the "More" icon

    return (
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {/* Album Cover */}
            <img
                src={coverImageUrl}
                alt={"Playlist cover"}
                className="w-[240px] h-[240px] shadow-xl rounded object-cover"
            />

            <div className="flex flex-col justify-center">
                {/* Album Title */}
                <h2 className="text-3xl font-semibold text-white">{title}</h2>

                {/* Creator with More Icon */}
                <div className="flex items-center gap-10 relative" ref={menuButtonRef}>
                    <p className="text-sm font-medium text-gray-400">{createdBy}</p>

                    {/* Animated Dropdown Menu */}
                    <PlaylistDropdown createdBy={createdBy}/>
                </div>

                {/* Date */}
                <p className="text-sm font-medium text-gray-400">10/12/23</p>
            </div>
        </div>
    );
}

export default PlaylistDetails;
