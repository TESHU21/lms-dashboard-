import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import InvoiceHeader from "./components/InvoiceHeader";
import { useCourse } from "@/context/CourseContext";
import { late } from "zod";

const Invoices = () => {
  const {getInvoices}=useCourse()
  // State to hold the invoice data
      const [columnFilters, setColumnFilters] = useState([]);
  
  const [data, setData] = useState([]);
  useEffect(()=>{
    const fetchInvoice=async()=>{
      try{
        const response =await getInvoices()
        console.log(response)
        const invoices=response.data.invoices;
        console.log("Invoicces",invoices)
        const formattedData=invoices.map((invoice=>({
          id:invoice._id,
          firstName:invoice.learner.firstName,
          lastName:invoice.learner.lastName,
          email:invoice.learner.email,
          amount:invoice.amount,
          image:invoice.learner.profileImage,
          date:invoice.createdAt,
          status:invoice.status,



          

        })))
        setData(formattedData)
      }
      
      catch(error){
        console.log(error)
      }

    }
    fetchInvoice();
  },[])

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
