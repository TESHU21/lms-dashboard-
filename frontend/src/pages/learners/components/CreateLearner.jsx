import React from 'react'
import FormComp from '@/components/FormComp'
import {LearnerSchema,initialValues,fields} from "./data"
const CreateLearner = () => {
  return (
    <div className='px-30'>
        <div className="flex items-center space-x-2 mb-[57px]">
     
      <span className="text-gray-500">Learners</span>

      {/* Vertical separator */}
      <div className="border-l border-gray-300 h-5"></div>
      <span className="font-semibold">Create Learners</span>
    </div>
        <FormComp  schema={LearnerSchema} initialValues={initialValues} fields={fields}/>
    </div>
  )
}

export default CreateLearner