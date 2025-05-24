import React,{useState} from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import CreateLearner from './components/CreateLearner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Destructure only the props that are actually used
const LearnerHeader = ({ columnFilters, setColumnFilters, sorting,setSorting }) => {
      const [open,setOpen]=useState(false)
      // Handler for sorting selection
  const handleSortChange = (value) => {
    // 'value' will be something like 'firstName_asc', 'lastName_desc', 'reset'
    if (value === 'reset') {
      setSorting([]); // Clear all sorting
      return;
    }

    const [id, order] = value.split('_'); // e.g., ['firstName', 'asc']
    setSorting([{ id, desc: order === 'desc' }]);
  };

  return (
    <div>
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
          placeholder="Filter By Name of Learner"
          value={
            columnFilters.find((f) => f.id === "name")?.value || ""
          }
          onChange={(e) => {
            const filterValue = e.target.value;
            setColumnFilters((prev) =>
              prev
                .filter((f) => f.id !== "name")
                .concat({ id: "name", value: filterValue })
            );
          }}
          name="search"
          id="search-learners"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-accent placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* <button
        type="button"
        className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-accent text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
      >
        Sort by
        <ChevronDown className="ml-2 -mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
      </button> */}
     {/*  Sort by Select*/}
     <div className=' flex items-center spaxe-x-2'>
      <label  className='text-sm font-medium'>Sort By:</label>
      <Select onValueChange={handleSortChange} value={sorting.length > 0 ? `${sorting[0].id}_${sorting[0].desc ? 'desc' : 'asc'}` : 'reset'}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reset">None</SelectItem>
            <SelectItem value="firstName_asc">First Name (A-Z)</SelectItem>
            <SelectItem value="firstName_desc">First Name (Z-A)</SelectItem>
            <SelectItem value="lastName_asc">Last Name (A-Z)</SelectItem>
            <SelectItem value="lastName_desc">Last Name (Z-A)</SelectItem>
            {/* Add more sorting options if needed */}
          </SelectContent>
        </Select>

     </div>

      {/* Right section: Create learner button */}
      <button
        type="button"
        onClick={()=>setOpen(true)}
        className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sidebar hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create learner
        {/* Plus icon */}
        <Plus className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <CreateLearner open={open} setOpen={setOpen}/>

    </div>
   
  );
};

export default LearnerHeader;