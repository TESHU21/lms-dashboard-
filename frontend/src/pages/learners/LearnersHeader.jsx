import React,{useState} from 'react';
import { Search, Plus } from 'lucide-react'; // ChevronDown and CustomSelect are no longer needed
import LearnerFormDialog from './components/LearnerFormDialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import CustomSelect from '@/components/CustomSelect'; // NO LONGER NEEDED

const LearnerHeader = ({ columnFilters, setColumnFilters, sorting,setSorting,open,onOpenChange,onSubmit }) => {

  // Handler for sorting selection (only for isVerified)
  const handleSortChange = (value) => {
    if (value === 'reset') {
      setSorting([]); // Clear all sorting
      return;
    }
    // The value will be 'isVerified_asc' or 'isVerified_desc'
    const [id, order] = value.split('_');
    setSorting([{ id: 'isVerified', desc: order === 'desc' }]);
  };

  // Handler for search filter (for learner name, assumed to be 'firstName' accessorKey for filtering)
  const handleSearchFilterChange = (event) => {
    const filterValue = event.target.value;
    setColumnFilters((prev) => {
      // Targeting 'firstName' accessorKey for filtering for the name search input
      const targetColumnId = "firstName";
      const existingFilterIndex = prev.findIndex((f) => f.id === targetColumnId);

      if (filterValue) {
        if (existingFilterIndex !== -1) {
          const updatedFilters = [...prev];
          updatedFilters[existingFilterIndex] = { id: targetColumnId, value: filterValue };
          return updatedFilters;
        } else {
          return [...prev, { id: targetColumnId, value: filterValue }];
        }
      } else {
        return prev.filter((f) => f.id !== targetColumnId);
      }
    });
  };

  // The handleVerifiedFilterChange function is no longer needed as the filter dropdown is removed.

  return (
    <div>
      <div className="flex items-center gap-3 justify-between w-full py-4">
        {/* Left section: Search input - KEPT */}
        <div className="relative flex items-center flex-grow mr-4 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Filter By First Name"
            value={
              columnFilters.find((f) => f.id === "firstName")?.value || ""
            }
            onChange={handleSearchFilterChange}
            name="search"
            id="search-learners"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-accent placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Sort by Select - ONLY FOR IS VERIFIED */}
        <div className='flex items-center space-x-2'> {/* Removed mr-4 as it's the element before the button */}
          {/* <label className='text-sm font-medium whitespace-nowrap'>Sort By:</label> */}
          <Select
            onValueChange={handleSortChange}
            value={
              sorting.length > 0 && sorting[0].id === 'isVerified'
                ? `${sorting[0].id}_${sorting[0].desc ? 'desc' : 'asc'}`
                : 'reset'
            }
          >
            <SelectTrigger className="w-[180px] !h-[48px] bg-stone-100">
              <SelectValue placeholder="Sort by Verification Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset">None</SelectItem>
              {/* Only 'isVerified' sorting options */}
              <SelectItem value="isVerified_asc">Verification (No to Yes)</SelectItem>
              <SelectItem value="isVerified_desc">Verified (Yes to No)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* The "Verified Status Filter" dropdown is REMOVED from here */}

        {/* Right section: Create learner button */}
        <button
          type="button"
          onClick={()=>onOpenChange(true)}
          className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sidebar hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto"
        >
          Create learner
          <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <LearnerFormDialog open={open} setOpen={onOpenChange} mode={"create"} onSubmit={onSubmit}/>
    </div>
  );
};

export default LearnerHeader;