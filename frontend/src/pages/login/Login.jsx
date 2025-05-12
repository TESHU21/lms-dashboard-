import React from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./component/data"
import LeftHero from '@/components/LeftHero'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const SignUp = () => {
  return (
    <div className=' flex   w-full '>
     <LeftHero/>
      <div className='w-full'>
        <div className='flex  h-12   mt-[56px] justify-end mr-[240px]'>
          <div className='flex gap-6 items-center w-[435px]'>
            <p className='underline text-base leading-8 text-[20px] '>Need to create an account ?</p>
          <Button className=" flex gap-2 bg-[#01589A] py-3 px-6 w-[125px] h-[48px]"> Sign up  <span><ChevronRight/></span></Button>
          </div>
          
        </div>
        <div className='mt-[216px] ml-[244px]  w-[556px]'>
          <h3 className='mb-[34px] font-lato text-[40px] leading-12 font-bold'>Login into your account</h3>
           <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues} submitBtnText={"Create accounts"}   showForgotPassword={true} />
        </div>
       
      </div>
        
    </div>
  )
}

export default SignUp