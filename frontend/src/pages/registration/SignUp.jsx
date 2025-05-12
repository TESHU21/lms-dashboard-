import React from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./components/data"
import LeftHero from '@/components/LeftHero'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const SignUp = () => {
  return (
    <div className=' flex   w-full '>
     <LeftHero/>
      <div className='w-full'>
        <div className='flex  h-12   mt-[56px] justify-end mr-[240px]'>
          <div className='flex gap-6 items-center w-[394px]'>
            <p className='underline text-base leading-8 text-[20px] '>Already have an account?</p>
          <Button className=" flex gap-2 bg-[#01589A] py-3 px-6 w-[125px] h-[48px]"> Login  <span><ChevronRight/></span></Button>
          </div>
          
        </div>
        <div className='mt-[78px] ml-[244px]  w-[595px]'>
          <p className='mb-[34px] font-lato text-[40px] leading-12 font-bold'>Register to get started</p>
           <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues} submitBtnText={"Create accounts"}/>
           <p className='mt-[68px] text-center text-base leading-6 font-light'>By confirming your email, you agree to our <span className='underline'>Terms of Service</span>  <br/> and that you have read and understood our <span className='underline'>Privacy Policy</span> .</p>
        </div>
       
      </div>
        
    </div>
  )
}

export default SignUp