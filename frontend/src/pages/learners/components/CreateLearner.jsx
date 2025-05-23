import React from 'react'
import FormComp from '@/components/FormComp'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {LearnerSchema,initialValues,fields} from "./data"
const CreateLearner = ({open,setOpen}) => {
  const handleCreateLearner=(data)=>{
console.log("data",data)
  }
  return (
 <Dialog open={open} onOpenChange={setOpen} className="overflow-y-auto">
      <DialogTrigger asChild>
       
      </DialogTrigger>
      <DialogContent className="bg-slate-50 p-3  md:max-w-[600px] shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       <DialogHeader>
        <DialogTitle className="flex items-center text-black space-x-2 m-4">
            <span className="text-gray-500">Create</span>
            {/* Vertical separator */}
            <div className="border-l border-gray-300 h-5"></div>
            <span className="font-semibold">Learner</span>
        </DialogTitle>
       </DialogHeader>

        <div className='px-6 py-6 overflow-y-auto max-h-[calc(100vh-200px)]'> {/* Using standard Tailwind px/py units */}
              <FormComp  schema={LearnerSchema} initialValues={initialValues} fields={fields} onSubmit={handleCreateLearner}/>


        </div>

      </DialogContent>
    </Dialog>


  )
}

export default CreateLearner