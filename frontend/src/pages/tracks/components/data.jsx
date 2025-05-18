import DataScienceImage from "../../../assets/Data Science Mastery.svg"
import ClouldComputingImage from "../../../assets/CloudComputing Path.svg"
import SoftwareImage from "../../../assets/Software Engineering Path.svg"
 import { z } from "zod";
import { User, DollarSign, Calendar, Clock, PenIcon,GraduationCap } from "lucide-react"; 
  // Dummy data for the courses
 export const courses = [
    {
      id: 1,
      title: "Software Engineer Path",
      imageUrl: SoftwareImage, // Placeholder image
      price: 380.00,
      duration: "12 weeks",
      instructor: "Benjamin",
      learners: "+200",
    },
    {
      id: 2,
      title: "Cloud Computing Expertise",
      imageUrl: ClouldComputingImage, // Placeholder image
      price: 380.00,
      duration: "12 weeks",
      instructor: "Williams",
      learners: "+200",
    },
    {
      id: 3,
      title: "Data Science Mastery",
      imageUrl: DataScienceImage, // Placeholder image
      price: 380.00,
      duration: "12 weeks",
      instructor: "Enoch",
      learners: "+200",
    },
    // Add more dummy data here if needed
  ];
  //create validation for Update Invoices
 
export const TrackUpdateSchema=z.object({
  title:z.string().min(2,{message:"Title should be 2 or more long"}),
  price: z.preprocess(
    val => Number(val),
    z.number().positive("Amount must be greater than 0")
  ),
  instructor:z.string().min(2,{message:"Instractor Name should at least two or more long "}),

    duration: z
    .string()
    .min(1, { message: "Due date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
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
 export const updateTrackinitialValues={
  title:"",
  price:"",
  instructor:"",
  duration:"",
  image:"",
  description:""

 }
 export const updateTrackfields=[

   {
      name: "title",
      placeholder: "Track Title",
      icon: GraduationCap,
      type: "text",
      className: "col-span-2 "
    },
   {
      name: "instructor",
      placeholder: "Instractor",
      icon: User,
      type: "text",
      className: "col-span-2 "
    },
   {
      name: "price",
      placeholder: "Price",
      icon: DollarSign,
      type: "text",
      className: "col-span-2 "
    },
   {
      name: "image",
      placeholder: "Upload Image",
      icon: Image,
      type: "file",
      className: "col-span-2 "
    },
   
   {
      name: "description",
      placeholder: "Description",
      icon: PenIcon,
      type: "text",
      className: "col-span-2 "
    },
 ]


 


