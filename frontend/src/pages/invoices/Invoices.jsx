import React, { useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import InvoiceHeader from "./components/InvoiceHeader";

const Invoices = () => {
  // State to hold the invoice data
      const [columnFilters, setColumnFilters] = useState([]);
  
  const [data, setData] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "JohnDoe10@gmail.com",
      image: "/avatars/avatar1.png",
      amount: 400,
      date: "2024-04-09",
      status: "Pending",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "JaneSmith10@gmail.com",
      image: "/avatars/avatar2.png",
      amount: 300,
      date: "2026-04-09",
      status: "Pending",
    },
    {
      id: "3",
      name: "Alice Doe",
      email: "alice@example.com",
      image: "/avatars/avatar3.png",
      amount: 300,
      date: "2026-04-09",
      status: "Paid",
    },
    {
      id: "4",
      name: "Bob Mark",
      email: "bob@example.com",
      image: "/avatars/avatar4.png",
      amount: 300,
      date: "2026-04-09",
      status: "Pending",
    },
    {
      id: "5",
      name: "Sarah Lee",
      email: "sarah@example.com",
      image: "/avatars/avatar5.png",
      amount: 200,
      date: "2023-08-05",
      status: "Paid",
    },
  ]);

  // Handler function to mark an invoice as Paid
  const handleConfirm = (row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: "Paid" } : item
      )
    );
  };

  // Placeholder handler for editing an invoice
  const handleEdit = (row) => {
    console.log("Edit:", row);
    // You would typically open a modal or navigate to an edit page here
  };

  // Handler function to delete an invoice by id
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    // Main container for centering content
    <div className="flex flex-col justify-center  items-center">
    
      <div className="w-full px-30">
        <h6 className="leading-8 text-[20px] font-semibold mb-[36px]">Invoices</h6>
        <InvoiceHeader  columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}/>
        
     
          {/* The DataTable component */}
          <DataTable
            data={data} 
            columns={columns({
              handleConfirm,
              handleEdit,
              handleDelete,
            })}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>
    
  );
};

export default Invoices;
