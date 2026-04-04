import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import InvoiceHeader from "./components/InvoiceHeader";
import { useCourse } from "@/context/CourseContext";
import { mapInvoice } from "@/utils/mappers";
const Invoices = () => {
  const { getInvoices, cancelInvoice } = useCourse();
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // State to hold the invoice data
  const [columnFilters, setColumnFilters] = useState([]);

  const [data, setData] = useState([]);
  const fetchInvoice = useCallback(
    async (options) => {
      try {
        setIsLoadingInvoice(true);
        setErrorMessage("");
        const response = await getInvoices(options);
        const invoices = response.data.invoices;
        const visibleInvoices = (invoices || []).filter((invoice) => {
          const status = String(invoice?.status || "").toLowerCase();
          return status !== "canceled" && status !== "cancelled";
        });
        setData(visibleInvoices.map(mapInvoice));
      } catch (error) {
        console.log(error);
        setErrorMessage("Failed to load invoices. Please try again.");
      } finally {
        setIsLoadingInvoice(false);
      }
    },
    [getInvoices],
  );

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

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
      setErrorMessage("");
      await cancelInvoice(id);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to cancel invoice. Please try again.");
    }
  };

  return (
    // Main container for centering content
    <div className="flex flex-col justify-center  items-center">
      <div className="w-full px-30">
        <h6 className="leading-8 text-[20px] font-semibold mb-[36px]">
          Invoices
        </h6>

        {errorMessage ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between gap-3">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={() => fetchInvoice({ force: true })}
              className="shrink-0 rounded-md border border-red-200 bg-white px-3 py-1 text-xs font-medium"
            >
              Retry
            </button>
          </div>
        ) : null}
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
