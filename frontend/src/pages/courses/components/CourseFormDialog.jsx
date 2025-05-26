import React,{useState} from 'react'
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
import {courseSchema,initialValues,fields} from "./data"
const CourseFormDialog = ({open,formFieldsWithDynamicOptions,setOpen,mode="create",initialData,onSubmit}) => {
  const [isLoading,setIsLoading]=useState(false)
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
 const handleSubmit=async(data)=>{
    const formData=new FormData()
    formData.append('title', data.title);
  formData.append('track', data.track);
   formData.append('image', data.image); 
  formData.append(
    'description',data.description
  );

 // where data.image is from a file input

    try{
      console.log("starting")
      setIsLoading(true)
      const response=await onSubmit(formData)
        setSuccessMessage(`${mode === "create" ? "Created" : "Updated"} successfully`);

      console.log(response)
    }
    catch(error){
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }

  }
  return (
 <Dialog open={open} onOpenChange={setOpen} className="overflow-y-auto">
      <DialogTrigger asChild>
       
      </DialogTrigger>
      <DialogContent className="bg-slate-50 p-3  md:max-w-[600px] shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       <DialogHeader>
        <DialogTitle className="flex items-center text-black space-x-2 m-4">
                   <span className="text-gray-500">Learner</span>
                   {/* Vertical separator */}
                   <div className="border-l border-gray-300 h-5"></div>
                     <span className="font-semibold">{mode === "create" ? "Create Course" : "Update Course"}</span>
       
         </DialogTitle>
       </DialogHeader>

        <div className='px-6 py-6 overflow-y-auto max-h-[calc(100vh-200px)]'> {/* Using standard Tailwind px/py units */}
              <FormComp  schema={courseSchema} initialValues={initialData||initialValues} fields={formFieldsWithDynamicOptions} onSubmit={handleSubmit} isLoading={isLoading} errorMessage={errorMessage} successMessage={successMessage}/>


        </div>

      </DialogContent>
    </Dialog>


  )
}

export default CourseFormDialog