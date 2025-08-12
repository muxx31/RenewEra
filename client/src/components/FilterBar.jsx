import React from 'react';

const FilterBar = ({ searchText, onSearchChange, filterOption, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={e => onSearchChange(e.target.value)}
        className="border rounded px-3 py-2 flex-grow"
      />
      <select
        value={filterOption}
        onChange={e => onFilterChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All</option>
        <option value="materialA">Material A</option>
        <option value="materialB">Material B</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default FilterBar;
