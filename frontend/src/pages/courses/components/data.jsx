import {z} from "zod"
import { GraduationCap, MonitorCheck,Image,PenIcon } from "lucide-react";
export const learnerSchema=z.object({
      title: z.string().min(3, { message: "Title should be at least three characters" }),
      track: z.string().min(3, { message: "Track should be at least three characters" }),
      
  image: z
    .instanceof(File)
    .refine(file => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),

  description: z.string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters"),

})
export const initialValues = {
  title: "",
  track: "",
  image: "",
 description:""
};
export const fields=[
    {
        name: "title",
        placeholder: "Course Title",
        icon: GraduationCap,
        type: "text",
        className: "col-span-2 md:col-span-1"
      },
    {
        name: "track",
        placeholder: "Track Title",
        icon: MonitorCheck,
        type: "text",
        className: "col-span-2 md:col-span-1"
      },
    {
        name: "image",
        placeholder: "Select Image",
        icon:Image,
        type: "file",
        className: "col-span-2 md:col-span-1"
      },
    {
        name: "description",
        placeholder: "Enter Description",
        icon:PenIcon,
        type: "textarea",
        className: "col-span-2 md:col-span-1"
      },
]