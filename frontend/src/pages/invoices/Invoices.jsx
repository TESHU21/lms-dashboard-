import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import InvoiceHeader from "./components/InvoiceHeader";
import { useCourse } from "@/context/CourseContext";
const Invoices = () => {
  const { getInvoices, cancelInvoice } = useCourse();
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  // State to hold the invoice data
  const [columnFilters, setColumnFilters] = useState([]);

  const [data, setData] = useState([]);
  const mapInvoice = (invoice) => {
    return {
      id: invoice._id,
      firstName: invoice?.learner?.firstName,
      lastName: invoice?.learner?.lastName,
      email: invoice?.learner?.email,
      amount: invoice.amount,
      image: invoice?.learner?.profileImage,
      date: invoice.createdAt,
      status: invoice.status,
    };
  };
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setIsLoadingInvoice(true);
        const response = await getInvoices();
        const invoices = response.data.invoices;
        const visibleInvoices = (invoices || []).filter((invoice) => {
          const status = String(invoice?.status || "").toLowerCase();
          return status !== "canceled" && status !== "cancelled";
        });
        setData(visibleInvoices.map(mapInvoice));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingInvoice(false);
      }
    };
    fetchInvoice();
  }, [getInvoices]);

  // Handler function to mark an invoice as Paid
  const handleConfirm = (row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: "paid" } : item,
      ),
    );
  };

  // Handler function to delete an invoice by id
  const handleCancel = async (id) => {
    try {
      await cancelInvoice(id);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Main container for centering content
    <div className="flex flex-col justify-center  items-center">
      <div className="w-full px-30">
        <h6 className="leading-8 text-[20px] font-semibold mb-[36px]">
          Invoices
        </h6>
        <InvoiceHeader
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />

        {/* The DataTable component */}
        <div className="relative">
          <DataTable
            data={data}
            columns={columns({
              handleConfirm,
              handleCancel,
            })}
            loading={isLoadingInvoice}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
