// components/DropdownMenu.tsx
import React, { useRef, useState, useEffect } from "react";
import { FaHeart, FaPlus, FaShareAlt } from "react-icons/fa";
import { ListStart } from "lucide-react";

type DropdownMenuProps = {
  isOpen: boolean;
  toggleDropdown: () => void;
};

const TrackDropDown: React.FC<DropdownMenuProps> = ({ isOpen, toggleDropdown }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleDropdown(); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleDropdown]);

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className="absolute top-12 left-2 w-40 bg-gradient-to-b from-zinc-800 to-zinc-900 text-white shadow-lg rounded-lg p-2 opacity-100"
      >
        <ul className="space-y-2 text-sm">
          <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
            <FaPlus className="text-white" />
            <span>Add to Playlist</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
            <ListStart className="text-white" />
            <span>Add to Queue</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
            <FaHeart className="text-white" />
            <span>Liked Track</span>
          </li>
          <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
            <FaShareAlt className="text-white" />
            <span>Share</span>
          </li>
        </ul>
      </div>
    )
  );
};

export default TrackDropDown;
