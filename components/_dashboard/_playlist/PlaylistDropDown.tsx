// PlaylistDropdown.tsx
import { useState, useRef, useEffect } from "react";
import { EllipsisVertical, Edit, Trash2, Share } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUser } from "@/hooks/auth";

const PlaylistDropdown = ({ createdBy }: { createdBy: string }) => {
    const { data } = useCurrentUser()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLDivElement | null>(null); // Ref to the "More" icon
    const menuRef = useRef<HTMLDivElement | null>(null); // Ref to the dropdown menu

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node) &&
                menuRef.current && !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuButtonRef}>
            <EllipsisVertical
                className="w-5 h-5 text-gray-400 cursor-pointer"
                onClick={toggleMenu}
            />

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        ref={menuRef} // Attach the ref to the dropdown menu
                        className="absolute w-48 bg-[#1f1f1f] text-white shadow-lg rounded"
                        initial={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                            left: menuButtonRef.current ? `${menuButtonRef.current.offsetWidth / 2 - 96}px` : "50%", // Center the dropdown to the More icon
                            marginTop: "12px", // Margin top to push the dropdown further down
                        }}
                    >
                        <ul className="py-2">
                            {
                                data?.getCurrentUser?.username == createdBy && (
                                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-[#353433] cursor-pointer">
                                        <Trash2 className="w-4 h-4 text-gray-400" />
                                        Delete
                                    </li>
                                )
                            }
                            <li className="flex items-center gap-2 px-4 py-2 hover:bg-[#353433] cursor-pointer">
                                <Share className="w-4 h-4 text-gray-400" />
                                Share
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlaylistDropdown;
