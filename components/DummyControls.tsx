import { useGetCurrentTheme } from "@/hooks/theme";

const DummyControls = () => {
    const [theme] = useGetCurrentTheme()
    return (
        <footer className="h-20 sm:h-24 flex items-center justify-center"
        style={{backgroundColor: theme as string}}
        >
            <p className="text-white text-sm sm:text-lg font-semibold">
                🎵 Immerse yourself in the rhythm of life. Enjoy the music! 🎶
            </p>
        </footer>
    );
};

export default DummyControls;
