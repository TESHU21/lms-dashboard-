import React,{useState} from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./components/data"
import LeftHero from '@/components/LeftHero'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/authContext'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
   const [isLoading,setIsLoading]=useState(false)
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const navigate=useNavigate()
  const {signup}=useAuth()
  const handleSignUp=async(data)=>{
    try{
      setIsLoading(true)
      const response=await signup(data)
      if(response){
         navigate("/verify-email")
      }
      setSuccessMessage("Admin Registration is Sucessful!")
    }
    catch(error){
      console.log(error)
      setErrorMessage("Admin Registration Failed! Try again!")
    }
    finally{
      setIsLoading(false)
    }
    
  }
  return (
    <div className=' flex   w-full '>
      <div className='hidden md:flex'>
     <LeftHero/>
     </div>
      <div className='w-full'>
        <div className='flex  mt-6  md:mt-[56px] md:justify-end md:mr-[240px]'>
          <div className='flex flex-col md:flex-row justify-center gap-6 items-center w-full   md:w-[394px]'>
            <p className='underline text-base leading-8 text-center md:text-[20px] '>Already have an account?</p>
          <Button className=" flex gap-2 bg-[#01589A] md:py-3 md:px-6 w-[125px] md:h-[48px] cursor-pointer text-center" onClick={()=>navigate("/")}> Login  <span><ChevronRight/></span></Button>
          </div>
          
        </div>
        <div className='md:mt-[78px] md:ml-[244px] px-4 md:px-0 py-3  md:w-[595px]'>
          <p className='mb-[34px] font-lato text-[25px] md:text-[40px] leading-8 text-center md:text-start md:leading-12 font-bold'>Register to get started</p>
           <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues} submitBtnText={"Create accounts"}
            onSubmit={handleSignUp} successMessage={successMessage} errorMessage={errorMessage} isLoading={isLoading}/>
           <p className='mt-[68px] text-center text-base leading-6 font-light'>By confirming your email, you agree to our <span className='underline'>Terms of Service</span>  <br/> and that you have read and understood our <span className='underline'>Privacy Policy</span> .</p>
        </div>
       
      </div>
        
    </div>
  )
}

export default SignUp