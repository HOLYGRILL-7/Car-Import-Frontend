import React, { useState } from "react";
import SearchTabs from "./SearchTabs";
import SearchInput from "./SearchInput";
import useTypingEffect from "../../hooks/UseTypingEffect";

const SearchCard = ({ searchIcon, onSearch }) => {
  const [activeTab, setActiveTab] = useState("find");
  const [searchValue, setSearchValue] = useState("");

  const tabs = [
    { id: "find", label: "Find a car" },
    { id: "sell", label: "Sell my car" },
  ];

  const placeholder = useTypingEffect([
    "Search by model...",
    "Search by fuel type...",
    "Search by brand...",
  ]);

  const handleSearch = (value) => {
    onSearch?.(value, activeTab);
  };

  return (
    <div className="bg-gray-600/60 backdrop-blur-sm p-6 rounded-xl w-full max-w-xl">
      <SearchTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <SearchInput
        placeholder={placeholder}
        searchIcon={searchIcon}
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchCard;
