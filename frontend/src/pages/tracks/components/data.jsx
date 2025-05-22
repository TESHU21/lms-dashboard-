// Assets
import DataScienceImage from "../../../assets/Data Science Mastery.svg";
import ClouldComputingImage from "../../../assets/CloudComputing Path.svg";
import SoftwareImage from "../../../assets/Software Engineering Path.svg";

// Icons
import {
  User,
  DollarSign,
  Clock,
  PenIcon,
  GraduationCap,
  Image,
} from "lucide-react";

// Zod validation
import { z } from "zod";

// Dummy course data
export const courses = [
  {
    id: 1,
    title: "Software Engineer Path",
    imageUrl: SoftwareImage,
    price: 380.0,
    duration: "12 weeks",
    instructor: "Benjamin",
    learners: "+200",
  },
  {
    id: 2,
    title: "Cloud Computing Expertise",
    imageUrl: ClouldComputingImage,
    price: 380.0,
    duration: "12 weeks",
    instructor: "Williams",
    learners: "+200",
  },
  {
    id: 3,
    title: "Data Science Mastery",
    imageUrl: DataScienceImage,
    price: 380.0,
    duration: "12 weeks",
    instructor: "Enoch",
    learners: "+200",
  },
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
// Zod Schema for track update form
// Zod Schema for track update form
export const TrackUpdateSchema = z.object({
  name: z.string().min(2, { message: "Name should be 2 or more characters long" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Amount must be greater than 0")
  ),
  instructor: z.string().min(2, { message: "Instructor name should be at least two characters" }),
  duration: z.string().min(1, { message: "Duration is required" }),
 image: z.any().superRefine((file, ctx) => {
  if (!(file instanceof File)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File is required",
    });
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File must be less than 5MB",
    });
  }

  if (!ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Only JPEG, JPG, PNG, or WEBP files are allowed",
    });
  }
}),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters"),
});

// Initial values for the update form
export const updateTrackinitialValues = {
  name: "",
  price: "",
  instructor: "",
  duration: "",
  image: undefined,
  description: "",
};

// Form fields definition for rendering dynamic form
export const updateTrackfields = [
  {
    name: "name",
    placeholder: "Track Name",
    icon: GraduationCap,
    type: "text",
    className: "col-span-2",
  },
  {
    name: "instructor",
    placeholder: "Instructor",
    icon: User,
    type: "text",
    className: "col-span-2",
  },
  {
    name: "price",
    placeholder: "Price",
    icon: DollarSign,
    type: "text",
    className: "col-span-2",
  },
  {
    name: "duration",
    placeholder: "Duration (e.g., 12 weeks)",
    icon: Clock,
   
    type: "text",
    className: "col-span-2",
  },
  {
    name: "image",
    placeholder: "Upload Image",
    icon: Image,
     placeholder:"Upload Image",
    type: "file",
    className: "col-span-2",
  },
  {
    name: "description",
    placeholder: "Description",
    icon: PenIcon,
    type: "textarea",
    className: "col-span-2 ",
  },
];
