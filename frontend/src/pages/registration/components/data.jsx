import { z } from "zod";
import { Mail,LockKeyhole } from "lucide-react";
import { CiUser } from "react-icons/ci";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const SignUpSchema = z.object({
    firstName:z.string().min(2, { message: "Name Should be 2 or more characters long" }),
    lastName:z.string().min(2, { message: "Name Should be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid Email Adress" }),
  password: z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    passwordRegex,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // where the error should appear
    message: "Passwords don't match.",
  });
export const initialValues = {
    firstName:"",
    lastName:"",

  email: "",
  password: "",
  confirmPassword:"",
};
export const fields = [
  {  name: "firstName",placeholder:"First Name",icon:CiUser, type: "name", className: "col-span-2" },
  {  name: "lastName",placeholder:"Last Name",icon:CiUser, type: "name", className: "col-span-2" },
  {  name: "email",placeholder:"Email",icon:Mail, type: "email", className: "col-span-2" },
 
  {
    
    name: "password",
    placeholder:"Password",
    icon:LockKeyhole,
    type: "password",
    className: "col-span-2 ",
  },
  {
    
    name: "confirmPassword",
    placeholder:"Confirm Password",
    icon:LockKeyhole,
    type: "password",
    className: "col-span-2 ",
  },
];
