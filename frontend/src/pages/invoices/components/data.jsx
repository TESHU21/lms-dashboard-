import { z } from "zod";
import { User, DollarSign, Calendar, Clock, PenIcon } from "lucide-react"; // Assuming these icons are used in your FormComp

// ✅ Corrected Zod schema for invoice form
export const InvoiceFormSchema = z.object({
  // learnerId: Assuming a string value comes from a select/dropdown.
  // Validating as a string and requiring at least one character (assuming an empty string is the initial state before selection).
  learnerId: z.string().min(1, { message: "Please select a learner" }),

  // amount: This field will likely be a text input, but the value needs to be treated as a number for validation.
  // We use preprocess to convert the string input to a number.
  // Added a check for empty string and NaN conversion for robustness.
  amount: z.preprocess(
    (val) => {
      // If the value is a string and is empty or only whitespace, treat as undefined for optional validation.
      if (typeof val === 'string' && val.trim() === '') return undefined;
      // Attempt to convert the string to a number. If it results in NaN, treat as undefined.
      if (typeof val === 'string') {
        const num = Number(val);
        return isNaN(num) ? undefined : num;
      }
      // If the value is not a string (e.g., already a number), return it as is.
      return val;
    },
    // Validate the preprocessed value. It must be a number and positive.
    z.number().positive("Amount must be greater than 0")
  ),

  // dueDate: Assuming a string value comes from a date input.
  // Validating as a string and requiring at least one character (assuming an empty string is the initial state before selection).
  dueDate: z.string().min(1, { message: "Please select a due date" }),

  // status: This field appears to be a selection from a predefined list.
  // Using z.enum to validate against a specific set of allowed string values.
  // Added a custom error map for a more user-friendly message if the value is not in the enum.
  status: z.string(),

  // paymentDetails: This field appears to be optional.
  // Validating as a string and using .optional() to allow it to be undefined or an empty string.
  paymentDetails: z.string().optional(),
});

// ✅ Form fields configuration for dynamic rendering (based on the image and common practices)
export const invoiceFields = [
  {
    name: "learnerId",
    placeholder: "Select learner",
    icon: User, // Using User icon for learner
    type: "text", // Explicitly setting type to "select" as it's a dropdown
    className: "col-span-1",
    // You will need to provide options for this select based on your learner data.
    // Example: options: [{ value: 'learner1_id', label: 'John Doe' }, { value: 'learner2_id', label: 'Jane Smith' }],
    // options: [], // Placeholder for learner options
  },
  {
    name: "amount",
    placeholder: "Enter amount in USD",
    icon: DollarSign, // Using DollarSign icon for amount
    type: "text", // Input type is text, but schema handles number validation
    className: "col-span-1",
  },
  {
    name: "dueDate",
    placeholder: "Due date",
    icon: Calendar, // Using Calendar icon for date
    type: "date", // Native HTML date input type
    className: "col-span-1",
  },
  {
    name: "status",
    placeholder: "Status",
    icon: Clock, // Using Clock icon for status
    type: "text", // Explicitly setting type to "select"
    className: "col-span-1",
    // Provide the exact status options that match your z.enum definition.
    options: [
      { value: 'Pending', label: 'Pending' },
      { value: 'Paid', label: 'Paid' },
      { value: 'Cancelled', label: 'Cancelled' },
      { value: 'Draft', label: 'Draft' },
      { value: 'Sent', label: 'Sent' },
    ],
  },
  {
    name: "paymentDetails",
    placeholder: "Payment details",
    icon: PenIcon, // Using PenIcon for payment details
    type: "textarea", // Multi-line input type
    className: "col-span-1",
  },
];


// ✅ Initial form values
export const initialInvoiceValues = {
  learnerId: "",
  amount: "", // Initial value as an empty string
  dueDate: "",
  status: "", // Initial value as an empty string
  paymentDetails: "",
};
