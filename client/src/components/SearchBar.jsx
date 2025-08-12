import React from 'react';

const SearchBar = ({ searchText, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="mb-4">
      <input
        type="search"
        value={searchText}
        onChange={e => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
