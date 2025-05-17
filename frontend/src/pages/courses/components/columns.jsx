import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2, Eye } from "lucide-react"; // Replaced Check with Eye
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({ handleViewDetails, handleEdit, handleDelete }) => [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Learners</div>,
    cell: ({ row }) => {
      const { name, image } = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[150px]">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "courses",
    header: () => <div className="text-left">Courses</div>,
    cell: ({ row }) => (
      <div className="mx-auto text-left">{row.original.courses}</div>
    ),
    size: 200,
  },

  {
    accessorKey: "track",
    header: () => <div className="text-center">Track</div>,
    cell: ({ row }) => (
      <div className="text-center min-w-[100px]">{row.getValue("track")}</div>
    ),
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
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];
