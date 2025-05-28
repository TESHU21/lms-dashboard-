import React,{useState} from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./component/data"
import LeftHero from '@/components/LeftHero'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/authContext'

const Login = () => {
   const [isLoading,setIsLoading]=useState(false)
    const [successMessage,setSuccessMessage]=useState("")
    const [errorMessage,setErrorMessage]=useState("")
  const navigate=useNavigate()
  const {signin}=useAuth()
  const handleLogin=async(data)=>{
    try{
      setIsLoading(true)
      const response=await signin(data)
      
      
      if(response.status===200){
      const token=sessionStorage.getItem("Token")
      const user = sessionStorage.getItem("User");
      const userParsed = JSON.parse(user);

      
      setSuccessMessage (response.data.message)
      console.log(response.data)
      if(userParsed?.isVerified){
        navigate("app")
      }
      else{
        navigate("/verify-email")
      }
     
    }
    }
    catch(error){
      setErrorMessage("Incorrect Credentials")
      console.log(error)
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
        <div className='flex  h-12   mt-[56px] md:justify-end md:mr-[240px]'>
          <div className='flex p-6 gap-6 items-center md:w-[435px]'>
            <p className='underline text-base leading-8 md:text-[20px] '>Need to create an account ?</p>
          <Button className=" flex gap-2 bg-sidebar  hover:bg-sidebar py-3 px-6 w-[125px] h-[48px] cursor-pointer text-white" onClick={()=>navigate("/signup")}> Sign up  <span><ChevronRight/></span></Button>
          </div>
          
        </div>
        <div className='md:mt-[216px] mt-12 px-8 md:px-0 md:ml-[244px]  md:w-[556px]'>
          <h3 className='mb-[34px] font-lato  text-[20px] md:text-[40px] leading-8 text-center md:text-start md:leading-12 font-bold'>Login into your account</h3>
           <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues} submitBtnText={"Login"}
              showForgotPassword={true} onSubmit={handleLogin} isLoading={isLoading}  errorMessage={errorMessage} />
        </div>
       
      </div>
        
    </div>
  )
}

export default Login