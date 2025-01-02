import { useGetCurrentTheme } from '@/hooks/theme';
import React, { useState } from 'react';

// Options for the header
const options = ['Track', 'User', 'Playlist'];


interface SearchData {
    searchQuery: string;
    page: number;
}

interface SearchHeaderProps {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    setPage: (page: number) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ selectedOption, setSelectedOption, setPage }) => {
    // State to manage the selected option

    const [theme] = useGetCurrentTheme()

    return (
        <div className="flex space-x-2 rounded-md mt-2">
            {options.map((option) => (
                <div
                    key={option}
                    className={`cursor-pointer px-3 py-1 rounded-sm text-sm transition-all ${selectedOption === option
                        ? `text-white shadow-md`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    style={{ background: selectedOption === option ? theme as string : 'white' }}
                    onClick={() => { setSelectedOption(option), setPage(1)}}
                >
            {option}
        </div>
    ))
}
        </div >
    );
}

export default SearchHeader;
