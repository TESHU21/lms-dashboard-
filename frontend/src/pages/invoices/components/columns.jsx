import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({ handleConfirm, handleEdit, handleDelete }) => [
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
    accessorKey: "email",
    header: () => <div className="text-left ">Email</div>,
    cell: ({ row }) => (
      // The size property in the column definition controls the width in TanStack Table.
      // Keeping the Tailwind class here as well, but 'size' is primary.
      <div className="w-[150px] mr-10 text-left">{row.original.email}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto flex items-center"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-center min-w-[100px]">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => (
      <div className="text-center min-w-[100px]">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      const isPaid = status === "Paid";
      return (
        <div className="flex justify-center min-w-[100px]">
          <Badge variant={isPaid ? "success" : "secondary"}>
            {isPaid ? (
              <>
                Paid <Check className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                Pending <Clock className="ml-1 w-4 h-4" />
              </>
            )}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 min-w-[120px]">
        <Button size="icon" variant="ghost" onClick={() => handleConfirm(row.original)}>
          <Check className="h-4 w-4 text-green-600" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => handleEdit(row.original)}>
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];
