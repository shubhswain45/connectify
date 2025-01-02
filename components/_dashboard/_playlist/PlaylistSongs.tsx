import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { MdMoreHoriz } from "react-icons/md";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { Track } from '@/gql/graphql';

// Helper function to truncate text
function truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

interface PlaylistSongsProps {
    id: string;
    tracks: Track[];
    createdBy: string;
}

function PlaylistSongs({ id, tracks, createdBy }: PlaylistSongsProps) {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // Toggle dropdown visibility
    const toggleDropdown = (id: string) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <div className="space-y-2 py-4 -mt-5">
                {tracks?.map((track, index) => (
                    <div
                        key={track.id}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                            text-zinc-400 hover:bg-white/5 rounded-md group`}
                    >
                        <div className="flex items-center justify-center cursor-pointer">
                            <span className="group-hover:hidden">{index + 1}</span>
                            <Play className="h-4 w-4 hidden group-hover:block" />
                        </div>

                        <div className="flex items-center gap-3">
                            <img
                                src={track.coverImageUrl || ""}
                                alt={track.title}
                                className="size-10"
                            />
                            <div>
                                <div className="font-medium text-white">
                                    {truncateText(track.title, 20)}
                                </div>
                                <div>{track.artist}</div>
                            </div>
                        </div>
                        <div className="flex items-center">23-23-12</div>

                        <div className="relative flex items-center">
                            <MdMoreHoriz
                                size={20}
                                onClick={() => toggleDropdown(track.id)}
                                className="cursor-pointer"
                            />
                            <AnimatePresence>
                                {openDropdownId === track.id && (
                                    <motion.div
                                        ref={dropdownRef}
                                        className="absolute w-48 bg-[#1f1f1f] text-white shadow-lg rounded z-50"
                                        initial={{ opacity: 0, translateY: 10 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        exit={{ opacity: 0, translateY: 10 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        style={{
                                            right: 0,
                                            marginTop: "12px",
                                        }}
                                    >
                                        <ul className="py-2">
                                            <li
                                                className="px-4 py-2 hover:bg-[#353433] cursor-pointer flex items-center gap-2"
                                                onClick={() => router.push(`/dashboard/show/${track.id}`)}
                                            >
                                                <FaEye />
                                                Show
                                            </li>
                                            {createdBy === "currentUser" && (
                                                <li
                                                    className="px-4 py-2 hover:bg-[#353433] cursor-pointer flex items-center gap-2"
                                                >
                                                    <FaTrash />
                                                    Remove from playlist
                                                </li>
                                            )}
                                            <li className="px-4 py-2 hover:bg-[#353433] cursor-pointer flex items-center gap-2">
                                                <FaHeart />
                                                Like
                                            </li>
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlaylistSongs;
