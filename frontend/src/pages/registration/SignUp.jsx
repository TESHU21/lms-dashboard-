import React from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./components/data"

const SignUp = () => {
  return (
    <div>
        <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues}/>
    </div>
  )
}

export default SignUp