import { z } from "zod";
import { Mail, LockKeyhole, Phone } from "lucide-react";
import { CiUser } from "react-icons/ci";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, { message: "Name should be 2 or more characters long" }),
    lastName: z.string().min(2, { message: "Name should be 2 or more characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
    confirmPassword: z.string(),
    // contact: z.string().regex(/^(\+251|0)?9\d{8}$/, {
    //   message: "Invalid Ethiopian phone number",
    // }),
    contact:z.string().regex(
  /^(\+233|0)?(2[0-9]|5[0-9])[0-9]{7}$/,
  { message: "Invalid Ghanaian phone number" }
),

  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match.",
  });

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  contact: "",
};

export const fields = [
  { name: "firstName", placeholder: "First Name", icon: CiUser, type: "text", className: "col-span-2 md:col-span-1" },
  { name: "lastName", placeholder: "Last Name", icon: CiUser, type: "text", className: "col-span-2 md:col-span-1" },
  { name: "email", placeholder: "Email", icon: Mail, type: "email", className: "col-span-2" },
  { name: "password", placeholder: "Password", icon: LockKeyhole, type: "password", className: "col-span-2 md:col-span-1" },
  { name: "confirmPassword", placeholder: "Confirm Password", icon: LockKeyhole, type: "password", className: "col-span-2 md:col-span-1" },
  { name: "contact", placeholder: "Contact", icon: Phone, type: "text", className: "col-span-2 " },
];
