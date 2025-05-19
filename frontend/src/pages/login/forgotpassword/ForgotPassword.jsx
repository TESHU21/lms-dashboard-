import React,{useState} from 'react'
import { z } from "zod";
import LeftHero from '@/components/LeftHero';
import FormComp from '@/components/FormComp';
import { ArrowLeft,Mail} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate=useNavigate()
   const [isLoading,setIsLoading]=useState(false)
      const [successMessage,setSuccessMessage]=useState("")
      const [errorMessage,setErrorMessage]=useState("")
  const {forgotPassword} =useAuth()


  const EmailSchema = z.object({

    email: z.string().email({ message: "Invalid email address" }), })
  

const initialValues = {email: "",};

 const fields = [
 
  { name: "email", placeholder: "Email", icon: Mail, type: "email", className: "col-span-2" },
  
];
const handleForgotPassword=async(data)=>{
  try{
    setIsLoading(true)
    const response=await forgotPassword(data)
    if(response){
      setSuccessMessage("Reset Link sent to your email ")
    }
  }
  catch(error){
    setErrorMessage("Faild to Send Reset Link!")
  }
  finally{
    setIsLoading(false)
  }

}

  return (
    <div className=' flex   w-full '>
     <LeftHero/>
      <div className='w-full'>
        <div className='flex  h-12   mt-[56px]  ml-[85px]'>
          
          <Button className=" flex gap-3 bg-white hover:bg-white border text-[#01589A] border-[#01589A] py-3 px-6 w-[125px] h-[48px] cursor-pointer" onClick={()=>navigate("/")}> <span><ArrowLeft/></span> Back</Button>
          
          
        </div>
        <div className='mt-[216px] ml-[244px]  w-[556px]'>
          <h3 className='mb-[34px] font-lato text-[40px] leading-12 font-bold'>Enter your email address</h3>
           <FormComp schema={EmailSchema} fields={fields} initialValues={initialValues} submitBtnText={"Reset Password"}
           onSubmit={handleForgotPassword} errorMessage={errorMessage} isLoading={isLoading}
            successMessage={successMessage} />
           <p className="mt-[58.5px] text-center text-base leading-6">Having trouble logging in? contact support </p>
        </div>
       
      </div>
        
    </div>
  )
}

export default ForgotPassword