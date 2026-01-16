import React from "react";

const SearchTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="space-x-7 mb-5 text-lg font-semibold text-center cursor-pointer">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`underline hover:text-blue-300 transition-colors ${
            activeTab === tab.id ? "text-blue-300" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;
