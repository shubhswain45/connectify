import { ListStart } from 'lucide-react'
import React from 'react'
import { FaHeart, FaPlus, FaShareAlt } from 'react-icons/fa'

function DropDownMenu() {
    return (
        <div
            ref={dropdownRef}
            className="absolute top-12 left-2 w-40 bg-gradient-to-b from-zinc-800 to-zinc-900 text-white shadow-lg rounded-lg p-2 opacity-100"
        >
            <ul className="space-y-2 text-sm">
                {/* Add to Playlist */}
                <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer" onClick={() => setIsOpen(true)}>
                    <span className="text-md">
                        <FaPlus className="text-white" />
                    </span>
                    <span>Add to Playlist</span>
                </li>

                {/* Add to Queue */}
                <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
                    <span className="text-xm">
                        <ListStart className="text-white" />
                    </span>
                    <span>Add to Queue</span>
                </li>

                {/* Liked Track */}
                <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
                    <span className="text-md">
                        <FaHeart className="text-white" />
                    </span>
                    <span>Liked Track</span>
                </li>

                {/* Share */}
                <li className="flex items-center space-x-2 hover:bg-zinc-700 p-2 rounded cursor-pointer">
                    <span className="text-md">
                        <FaShareAlt className="text-white" />
                    </span>
                    <span>Share</span>
                </li>
            </ul>
        </div>
    )
}

export default DropDownMenu