"use client"

import { useGetCurrentTheme } from "@/hooks/theme"
import { useRouter } from "next/navigation"

interface ListItemProps {
    image: string
    name: string
    href: string
}

const LikedHeader: React.FC<ListItemProps> = ({ name }) => {
    const [theme] = useGetCurrentTheme()
    const router = useRouter()

    const onClick = () => {
        // Add authentication before navigation if needed
        router.push("/dashboard/likes")
    }

    return (
        <button
            className="relative group flex items-center rounded-md overflow-hidden gap-x-4
            bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
            onClick={onClick}
        >
            <div className="relative min-w-[64px] min-h-[64px] flex items-center justify-center">
                {/* Styled SVG to look like an image */}
                <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                                w-[64px] h-[64px] rounded-md p-2 shadow-md flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </div>
            </div>
            <p className="font-medium truncate py-5">{name}</p>

                <div
                    className="absolute transition opacity-0 rounded-full flex justify-center items-center
                    p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-105"
                    style={{ background: theme as string }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="black"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                </div>
        </button>
    )
}

export default LikedHeader
