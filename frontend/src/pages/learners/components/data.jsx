import { z } from "zod";
import { CiUser } from "react-icons/ci";
import {
  GraduationCap,
  Mail,
  MapPin,
  User,
  Phone,
  DollarSign,
  Image,
  PenIcon,
} from "lucide-react";

export const LearnerSchema = z.object({
  image: z
    .union([
      z.string().url().optional(),
      z.instanceof(File).optional(),
      z.null(),
    ])
    .optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  course: z.string().min(1, { message: "Course is required" }),
  gender: z.enum(["male", "female", "other"]),
  location: z.string().min(1, { message: "Location is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  disability: z.string().optional(),
  created_by: z
    .object({
      role: z.string(),
      email: z.string(),
    })
    .optional(),

  description: z.string().min(1).optional(),
  amount: z.number().positive().optional(),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  course: "",
  gender: "male",
  phone: "",
  location: "",
  disability: "",
  image: "",
  description: "",
  amount: undefined,
};

export const fields = [
  {
    name: "image",
    placeholder: "Upload Image",
    icon: Image,
    type: "file",
    className: "col-span-2",
  },
  {
    name: "firstName",
    placeholder: "First Name",
    icon: CiUser,
    type: "text",
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    icon: CiUser,
    type: "text",
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "email",
    placeholder: "Email",
    icon: Mail,
    type: "email",
    className: "col-span-2",
  },
  {
    name: "course",
    placeholder: "Course",
    icon: GraduationCap,
    type: "text",
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "gender",
    placeholder: "Gender",
    icon: CiUser,
    type: "select",
    options: [
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
      { name: "Other", value: "other" },
    ],
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "location",
    placeholder: "Location",
    icon: MapPin,
    type: "text",
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "phone",
    placeholder: "Phone",
    icon: Phone,
    type: "text",
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "disability",
    placeholder: "Disability (optional)",
    icon: User,
    type: "text",
    className: "col-span-2",
  },
  {
    name: "amount",
    placeholder: "$ Amount",
    icon: DollarSign,
    type: "number",
    className: "col-span-2",
  },

  {
    name: "description",
    placeholder: "Description",
    icon: PenIcon,
    type: "textarea",
    className: "col-span-2",
  },
];
