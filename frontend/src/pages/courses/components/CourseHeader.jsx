import React from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';

const CourseHeader = ({columnFilters, setColumnFilters}) => {
  return (
    // Flex container to hold the search bar, sort by, and button, centered vertically and spanning full width
    <div className="flex items-center justify-between w-full py-4">
      {/* Left section: Search input */}
      <div className="relative flex items-center flex-grow mr-4 rounded-md shadow-sm">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        {/* Search input field */}
        <input
          type="text"
          name="search"
           value={
            columnFilters.find((f) => f.id === "title")?.value || ""
          }
          onChange={(e) => {
            const filterValue = e.target.value;
            setColumnFilters((prev) =>
              prev
                .filter((f) => f.id !== "title")
                .concat({ id: "title", value: filterValue })
            );
          }}
          id="search-learners"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-accent placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search Courses"
        />
      </div>

      
      <button
        type="button"
        className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-accent text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
      >
        Sort by
        <ChevronDown className="ml-2 -mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
      </button>

      {/* Right section: Create learner button */}
      <button
        type="button"
        className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sidebar hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Courses
        {/* Plus icon */}
        <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default CourseHeader;
