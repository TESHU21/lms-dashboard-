import { LayoutDashboard } from 'lucide-react';
import { FileText } from 'lucide-react';
import { FaUsers } from "react-icons/fa";
import { LaptopMinimal } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { Settings,Power} from 'lucide-react';

export const navLinks=[
    {
        id:"1",
        name:"Dashboard",
        path:"",
        icon:LayoutDashboard
    }
    ,
    {
        id:"2",
        name:"Invoices",
        path:"invoices",
        icon:FileText
    }
    ,
     {
        id:"3",
        name:"Learners",
        path:"learners",
        icon:FaUsers
    },
     {
        id:"4",
        name:"Tracks",
        path:"tracks",
        icon:LaptopMinimal
    },
     {
        id:"5",
        name:"Courses",
        path:"courses",
        icon:GraduationCap
    }
]
export const bottomLinks=[
    {
        id:"1",
        name:"Settings",
        path:"settings",
        icon:Settings
    }
    ,
       {
        id:"2",
        name:"Logout",
        path:"logout",
        icon:Power
    }
    ,
]