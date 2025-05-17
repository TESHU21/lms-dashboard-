import React from 'react';
// Assuming you have lucide-react installed for icons
import { Search, Plus } from 'lucide-react';

// This component creates the header with a search bar and a "Create Invoice" button
const InvoiceHeader = () => {
  return (
    
    <div className="flex items-center w-full py-4">
      {/* Search input container */}
      <div className="relative flex items-center w-full rounded-md shadow-sm">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        {/* Search input field */}
        <input
          type="text"
          name="search"
          id="search"
          // Adjusted left padding back to pl-10 to accommodate the icon
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-accent placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search Invoices"
        />
      </div>

      {/* Create Invoice button */}
      <button
        type="button"
        className="inline-flex items-center px-4 py-3 border border-transparent w-[240px] text-sm font-medium rounded-md shadow-sm text-white bg-sidebar hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-4"
      >
        Create invoice
        {/* Plus icon */}
        <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default InvoiceHeader;
