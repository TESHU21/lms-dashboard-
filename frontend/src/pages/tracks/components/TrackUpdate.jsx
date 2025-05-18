import React from 'react'
import FormComp from '@/components/FormComp'
import {TrackUpdateSchema, updateTrackinitialValues,updateTrackfields} from "./data"

const TrackUpdate = () => {
  return (
      <div className='px-30'>
        <div className="flex items-center space-x-2 mb-[57px]">
     
      <span className="text-gray-500">Track</span>

      {/* Vertical separator */}
      <div className="border-l border-gray-300 h-5"></div>
      <span className="font-semibold">Update</span>
    </div>
        <FormComp  schema={TrackUpdateSchema} initialValues={updateTrackinitialValues} fields={updateTrackfields}/>
    </div>
  )
}

export default TrackUpdate