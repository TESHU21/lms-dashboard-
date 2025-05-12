import React from 'react'
import { z } from "zod";
import LeftHero from '@/components/LeftHero';
import FormComp from '@/components/FormComp';
import { ArrowLeft,Mail} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react'
import { LockKeyhole } from 'lucide-react';

const PasswordRest = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      
 
  const PasswordSchema = z .object({
    
     password: z
       .string()
       .min(8, "Password must be at least 8 characters")
       .regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
     confirmPassword: z.string(),
    
   })
   .refine((data) => data.password === data.confirmPassword, {
     path: ["confirmPassword"],
     message: "Passwords don't match.",
   });
 
      
    
    const initialValues = {

  
  password: "",
  confirmPassword:"",
 
};
    
     const fields = [
          { name: "password", placeholder: "Password", icon: LockKeyhole, type: "password", className: "col-span-2 " },
            { name: "confirmPassword", placeholder: "Confirm Password", icon: LockKeyhole, type: "password", className: "col-span-2 " },

     
    ];
  return (
      <div className=' flex   w-full '>
     <LeftHero/>
      <div className='w-full'>
        <div className='flex  h-12   mt-[56px]  ml-[85px]'>
          
          <Button className=" flex gap-3 bg-white hover:bg-white border text-[#01589A] border-[#01589A] py-3 px-6 w-[125px] h-[48px]"> <span><ArrowLeft/></span> Back</Button>
          
          
        </div>
        <div className='mt-[216px] ml-[244px]  w-[556px]'>
          <h3 className='mb-[34px] font-lato text-[40px] leading-12 font-bold'>Create New Password</h3>
           <FormComp schema={PasswordSchema} fields={fields} initialValues={initialValues} submitBtnText={"Reset Password"}  />
           <p className="mt-[58.5px] text-center text-base leading-6">Having trouble logging in? contact support</p>
        </div>
       
      </div>
        
    </div>
  )
}

export default PasswordRest