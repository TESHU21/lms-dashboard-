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

// Image validation constants
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB (to match backend)
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const LearnerSchema = z.object({
  image: z
    .union([
      z.string().url().optional(),
      z.instanceof(File).optional(),
      z.null(),
    ])
    .optional()
    .superRefine((file, ctx) => {
      if (!file) {
        return;
      }

      if (typeof file === "string") {
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File must be less than 5MB",
          fatal: true,
        });
        return;
      }

      if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Only JPEG, JPG, PNG, or WEBP files are allowed",
          fatal: true,
        });
        return;
      }
    }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
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
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return val;
  }, z.number().positive().optional()),
});

export const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  course: "",
  gender: "male",
  phone: "",
  location: "",
  image: undefined,
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
