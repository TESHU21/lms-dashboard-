import React from 'react'
import {InvoiceSchema,fields,initialValues} from "./data"
import FormComp from '@/components/FormComp'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCourse } from '@/context/CourseContext';

const CreateInvoices = ({open,setOpen}) => {
  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       
      </DialogTrigger>
      <DialogContent className="bg-slate-50 p-3  shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       <DialogHeader>
        <DialogTitle className="flex items-center text-black space-x-2 m-4">
            <span className="text-gray-500">Create</span>
            {/* Vertical separator */}
            <div className="border-l border-gray-300 h-5"></div>
            <span className="font-semibold">Invoice</span>
        </DialogTitle>
       </DialogHeader>

        <div className='px-6 py-6'> {/* Using standard Tailwind px/py units */}
      <FormComp  schema={InvoiceSchema} initialValues={initialValues} fields={fields}/>   

        </div>

      </DialogContent>
    </Dialog>
  )
}

export default CreateInvoices