"use client";

import React, { useState } from "react";
import SearchInput from "@/components/_dashboard/_search/SearchInput";
import SearchHeader from "@/components/_dashboard/_search/SearchHeader";
import useDebounce from "@/hooks/debounce";
import SearchTrackContent from "@/components/_dashboard/_search/SearchTrackContent";
import SearchPlaylistContent from "@/components/_dashboard/_search/SearchPlaylistContent";
import SearchUserContent from "@/components/_dashboard/_search/SearchUserContent";
import DashboardLayout from "@/layout/DashboardLayout";

const SearchPage: React.FC = () => {
  const [searchData, setSearchData] = useState({
    searchQuery: "",
    page: 1,
  });
  const [selectedOption, setSelectedOption] = useState("Track");

  const debouncedValue = useDebounce(searchData.searchQuery, 700); // Debounced search query

  // Separate function to set the page
  const setPage = (page: number) => {
    setSearchData((prev) => ({ ...prev, page }));
  };

  return (
    <DashboardLayout shouldShowFeatureHeader={true}>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Search</h1>

        {/* Search Input Section */}
        <div className="flex flex-col items-center">
          <SearchInput
            searchData={searchData}
            setSearchData={setSearchData}
          />
        </div>

        {/* Options Section */}
        <SearchHeader
          setPage={setPage}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      {/* Search Results */}
      {
        selectedOption === "Track" ? (
          <SearchTrackContent
            searchQuery={debouncedValue}
            searchData={searchData}
            setSearchData={setSearchData}
          />
        ) : selectedOption === "Playlist" ? (
          <SearchPlaylistContent
            searchData={searchData}
            setSearchData={setSearchData}
          />
        ) : (
          <SearchUserContent
            searchData={searchData}
            setSearchData={setSearchData}
          />
        )
      }
    </DashboardLayout>
  );
};

export default SearchPage;
