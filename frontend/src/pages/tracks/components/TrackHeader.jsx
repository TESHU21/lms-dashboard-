import React from 'react'
import { Search, Plus } from 'lucide-react';


const TrackHeader = ({searchValue, setSearchValue,setOpen}) => {
  return (
    <div className="flex items-center  w-full py-4">
      {/* Search input container */}
      <div className="relative flex items-center flex-grow mr-4 rounded-md shadow-sm">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        {/* Search input field */}
        <input
          type="text"
          name="search"
          value={searchValue??""}
          onChange={(e)=>setSearchValue(e.target.value)}
          id="search-course"
          className="block w-full pl-10 pr-3 py-2 h-12 border border-sidebar-accent-foreground rounded-md leading-5 bg-input-primary placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search Course"
        />
      </div>

      <button
        type="button"
        onClick={()=>setOpen(true)}
        className="inline-flex items-center px-4 py-2 h-12 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sidebar focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Create Course
        <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default TrackHeader