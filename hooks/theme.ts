import { useEffect, useState } from "react";

export const useGetCurrentTheme = () => {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        // Check if we are on the client side
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") || `#2E86C1`; // Default theme if none is found
            setTheme(storedTheme);
        }
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return [theme, setTheme] as const;
};
