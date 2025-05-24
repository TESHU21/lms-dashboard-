import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Not used in current cols, but keep if used elsewhere
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({ handleViewDetails, handleEdit, handleDelete }) => [
    {
    id: "firstName", // Keep this ID for display purposes and unique identification
    accessorKey: "firstName", // <--- ADD THIS! This makes the column filterable by firstName
    header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Learners
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const { firstName, lastName, profileImage } = row.original;
      const fullName = `${firstName || ''} ${lastName || ''}`.trim();

      return (
        <div className="flex items-center gap-3 min-w-[150px]">
          <Avatar>
            <AvatarImage src={profileImage} alt={fullName} />
            <AvatarFallback>{fullName.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <span>{fullName}</span>
        </div>
      );
    },
    // Keep the custom sortingFn for combined full name sorting
    sortingFn: (rowA, rowB, columnId) => {
        const firstNameA = (rowA.original.firstName || '').toLowerCase();
        const firstNameB = (rowB.original.firstName || '').toLowerCase();
        const lastNameA = (rowA.original.lastName || '').toLowerCase();
        const lastNameB = (rowB.original.lastName || '').toLowerCase();

        if (firstNameA > firstNameB) return 1;
        if (firstNameA < firstNameB) return -1;

        if (lastNameA > lastNameB) return 1;
        if (lastNameA < lastNameB) return -1;

        return 0;
    },
  },


  
  {
    accessorKey: "email", // Add email column, as it's in your data
    header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" flex items-center"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => (
      <div className="text-left min-w-[80px]">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "contact", // Add contact column
    header: () => <div className="text-center">Contact</div>,
    cell: ({ row }) => (
      <div className="text-center min-w-[100px]">{row.getValue("contact")|| "N/A"}</div>
    ),
  },
  

  {
    accessorKey: "date", // This accessorKey already matched
    header: ({ column }) => ( // Pass column prop
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" flex items-center" // Adjust alignment if needed
        >
          Joined Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
        // Optional: Format the date for better display
        const dateValue = row.getValue("date");
        if (!dateValue) return <div className="text-center min-w-[100px]">N/A</div>;
        try {
            const date = new Date(dateValue);
            return (
                <div className="text-center min-w-[100px]">
                    {date.toLocaleDateString()} {/* Formats to local date string */}
                </div>
            );
        } catch (e) {
            return <div className="text-center min-w-[100px]">{dateValue}</div>; // Fallback
        }
    },
  },
  {
    accessorKey: "isVerified", // Add isVerified column for true/false
    header: () => <div className="text-center">Verified</div>,
    cell: ({ row }) => {
      const isVerified = row.getValue("isVerified");
      return (
        <div className={`text-center min-w-[80px] ${isVerified?"text-green-600":"text-red-500"}`}>
         
            {isVerified ? "Yes" : "No"}
         
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 min-w-[120px]">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleViewDetails(row.original)}
        >
          <Eye className="h-4 w-4 text-blue-600" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleEdit(row.original)}
        >
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleDelete(row.original)}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];