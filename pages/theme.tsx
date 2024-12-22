import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FFC300", "#DAF7A6",
    "#C70039", "#900C3F", "#581845", "#28B463", "#5DADE2",
    "#F4D03F", "#1ABC9C", "#8E44AD", "#F39C12", "#2ECC71",
    "#E74C3C", "#7D3C98", "#117864", "#6C3483", "#CA6F1E",
    "#873600", "#F5B041", "#48C9B0", "#2874A6", "#BFC9CA",
    "#34495E", "#FAD7A0", "#85929E", "#E59866", "#73C6B6",
    "#AF7AC5", "#F4ECF7", "#1F618D", "#2E86C1", "#AED6F1",
    "#5499C7", "#7FB3D5", "#45B39D", "#52BE80", "#229954",
    "#1D8348", "#196F3D", "#27AE60", "#E74C3C", "#F1C40F",
    "#9B59B6", "#34495E", "#2C3E50", "#7F8C8D", "#BDC3C7",
];

const ThemeSelector: React.FC = () => {
    const [currentColor, setCurrentColor] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    useEffect(() => {
        // Check if we're in the browser before using localStorage
        if (typeof window !== "undefined") {
            const currentColor = localStorage.getItem("theme");
            setCurrentColor(currentColor || "#2E86C1");
        }
    }, []);

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
    };

    const handleApplyChanges = () => {
        if (selectedColor && typeof window !== "undefined") {
            localStorage.setItem("theme", selectedColor);
        }
        toast.success("Theme apply successfully")
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-black p-6">
            <h1 className="text-3xl font-bold mb-6 text-white md:text-4xl">
                Select Your Theme
            </h1>
            <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-6">
                {colors.map((color) => (
                    <div
                        key={color}
                        onClick={() => handleColorClick(color)}
                        className={`w-12 h-12 rounded-full cursor-pointer transition-transform transform hover:scale-110`}
                        style={{
                            backgroundColor: color,
                            border: selectedColor ? selectedColor === color ? "2px solid white" : "none" : currentColor === color ? "2px solid white" : "none",
                        }}
                    />
                ))}
            </div>
            {selectedColor && (
                <div className="mt-6 text-center">
                    <p className="text-lg text-gray-700 mb-4">
                        Selected Color:{" "}
                        <span
                            className="font-bold"
                            style={{ color: selectedColor }}
                        >
                            {selectedColor}
                        </span>
                    </p>
                    <button
                        onClick={handleApplyChanges}
                        className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-400 focus:outline-none text-lg sm:px-8 sm:py-4 md:px-10 md:py-5"
                    >
                        Apply Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
