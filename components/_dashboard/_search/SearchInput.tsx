"use client";

import React from "react";
import Input from "../../Input";

interface SearchData {
  searchQuery: string;
  page: number;
}

interface SearchInputProps {
  searchData: SearchData;
  setSearchData: (data: SearchData) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchData, setSearchData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({
      ...searchData,
      searchQuery: e.target.value,
      page: 1, // Reset page to 1 whenever the query changes
    });
  };

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={searchData.searchQuery}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
