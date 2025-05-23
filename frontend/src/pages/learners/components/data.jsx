import { z } from "zod";
import { CiUser } from "react-icons/ci";
import { GraduationCap,Mail,MapPin,User,Phone ,DollarSign,Image,PenIcon} from "lucide-react";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const LearnerSchema = z.object({
  firstName: z.string().min(2, { message: "Name should be 2 or more characters long" }),
  lastName: z.string().min(2, { message: "Name should be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),

  program: z.enum(['Addis Ababa', 'Dire Dawa']),
  gender: z.enum(['male', 'female']),
  
  phone: z.string().regex(
    /^\+?[1-9]\d{7,14}$/,
    "Enter a valid international phone number (e.g., +251912345678)"
  ),

  location: z.enum(['Addis Ababa', 'Dire Dawa']),

  disabled: z.preprocess(
    val => val === 'true' || val === true,
    z.boolean()
  ),

  amount: z.preprocess(
    val => Number(val),
    z.number().positive("Amount must be greater than 0")
  ),

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
});

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
 program:"",
 gender:"",
 phone:"",
 location:"",
 disabled:"",
 amount:"",
 image:"",
 description:""
};

export const fields = [
  {
    name: "firstName",
    placeholder: "First Name",
    icon: CiUser,
    type: "text",
    className: "col-span-2 md:col-span-1"
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    icon: CiUser,
    type: "text",
    className: "col-span-2 md:col-span-1"
  },
  {
    name: "email",
    placeholder: "Email",
    icon: Mail,
    type: "email",
    className: "col-span-2"
  },
  {
    name: "program",
    placeholder: "Select program",
    icon: GraduationCap,
    type: "select",
     options: [{
      name:"Addis Ababa" ,value:"Addis Ababa"
    },{
      name:"DireDawa" ,value:"DireDawa"
    },
      ],
    className: "col-span-2 md:col-span-1"
  },
  {
    name: "gender",
    placeholder: "Gender",
    icon: CiUser,
    type: "select",
    options:[ 
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },

    ],
    className: "col-span-2 md:col-span-1"
  },
  {
    name: "location",
    placeholder: "Location",
    icon: MapPin,
    type: "select",
    options: [{
      name:"Addis Ababa" ,value:"Addis Ababa"
    },{
      name:"DireDawa" ,value:"DireDawa"
    },
      ],
    className: "col-span-2 md:col-span-1"
  },
  {
    name: "phone",
    placeholder: "Phone",
    icon: Phone,
    type: "text",
    className: "col-span-2 md:col-span-1"
  },
  {
    name: "disabled",
    placeholder: "Disabled",
    icon: User,
    type: "select",
    options: [
      { name: "True", value: true },
      { name: "False", value: false }
    ],
    className: "col-span-2 "
  },
  {
    name: "amount",
    placeholder: "$ Amount",
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
    type: "textarea",
    className: "col-span-2 "
  }
];

