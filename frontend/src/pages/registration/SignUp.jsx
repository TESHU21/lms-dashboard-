import React from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./components/data"
import LeftHero from '@/components/LeftHero'

const SignUp = () => {
  return (
    <div className=' flex   w-full '>
     <LeftHero/>
      <div className='w-full'>
        <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues}/>
      </div>
        
    </div>
  )
}

export default SignUp