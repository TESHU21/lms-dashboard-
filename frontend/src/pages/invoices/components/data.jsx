import { z } from "zod";
import { User, DollarSign, Calendar, Clock, PenIcon } from "lucide-react"; 
export const InvoiceSchema=z.object({
  learner:z.string().min(2,{message:"Learner should be 2 or more long"}),
  amount: z.preprocess(
    val => Number(val),
    z.number().positive("Amount must be greater than 0")
  ),
    dueDate: z
    .string()
    .min(1, { message: "Due date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    status: z.enum(["Paid", "Pending"], {
    errorMap: () => ({ message: "Status must be either 'Paid' or 'Pending'" }),
  }),
  paymentDetail:z.string().min(20,{message:"Payment detail should at least 20 required"})
})
 export const initialValues={
  learner:"",
  amount:"",
  dueDate:"",
  paymentDetail:""
 }
 export const fields=[

   {
      name: "learner",
      placeholder: "Learner Name",
      icon: User,
      type: "text",
      className: "col-span-2 "
    },
   {
      name: "amount",
      placeholder: "Amount",
      icon: User,
      type: "text",
      className: "col-span-2 "
    },
   {
      name: "dueDate",
      placeholder: "Due Date",
      icon: Calendar,
      type: "date",
      className: "col-span-2 "
    },
   {
      name: "status",
      placeholder: "Status",
      icon: Calendar,
      type: "select",
      options: [
      "Paid",
      "Pending",
     
    ],
      className: "col-span-2 "
    },
   {
      name: "paymentDetail",
      placeholder: "Payment Detail",
      icon: PenIcon,
      type: "text",
      className: "col-span-2 "
    },
 ]
