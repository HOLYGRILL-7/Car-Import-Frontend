import React from "react";

const SearchInput = ({
  placeholder,
  searchIcon,
  onSearch,
  value,
  onChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-14 pl-6 pr-16 rounded-full text-lg font-medium bg-white text-gray-800 outline-none shadow-inner border-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 transition-all placeholder:text-gray-400 placeholder:font-normal"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <img
          src={searchIcon}
          alt="search icon"
          className="h-full w-full object-contain"
        />
      </button>
    </form>
  );
};

export default SearchInput;
