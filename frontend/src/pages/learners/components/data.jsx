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
  image: z.any().optional(),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  course: z.string().min(1, { message: "Course is required" }),
  gender: z.enum(["male", "female", "other"]),
  location: z.string().min(1, { message: "Location is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  created_by: z
    .object({
      role: z.string(),
      email: z.string(),
    })
    .optional(),

  description: z.string().min(1).optional(),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().positive("Amount must be greater than 0"),
  ),
});

export const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  course: "",
  gender: "male",
  phone: "",
  location: "",
  image: "",
  description: "",
  amount: 0,
};

export const fields = [
  {
    name: "image",
    placeholder: "Upload Learner Profile Picture",
    icon: Image,
    type: "file",
    className: "col-span-2",
  },
  {
    name: "firstname",
    placeholder: "First Name",
    icon: CiUser,
    type: "text",
    className: "col-span-2 md:col-span-1",
  },
  {
    name: "lastname",
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
