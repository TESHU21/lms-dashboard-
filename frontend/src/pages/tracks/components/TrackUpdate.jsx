// TrackUpdate.jsx
import React,{useState} from 'react';
import FormComp from '@/components/FormComp';
import { TrackUpdateSchema, updateTrackinitialValues, updateTrackfields } from "./data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; 
import { X } from 'lucide-react'; 
import { useCourse } from '@/context/CourseContext';
const TrackUpdate = ({ open, setOpen }) => {
   const [isLoading,setIsLoading]=useState(false)
      const [successMessage,setSuccessMessage]=useState("")
      const [errorMessage,setErrorMessage]=useState("")
      const {createTrack}=useCourse()
  const handleUpdateTrack=async(data)=>{
    try{
      console.log("starting")
      setIsLoading(true)
      const response=await createTrack(data)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       
      </DialogTrigger>
      <DialogContent className="bg-slate-50 p-3  shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       <DialogHeader>
        <DialogTitle className="flex items-center text-black space-x-2 m-4">
            <span className="text-gray-500">Track</span>
            {/* Vertical separator */}
            <div className="border-l border-gray-300 h-5"></div>
            <span className="font-semibold">Update</span>
        </DialogTitle>
       </DialogHeader>

        <div className='px-6 py-6'> {/* Using standard Tailwind px/py units */}
       

          <FormComp schema={TrackUpdateSchema} initialValues={updateTrackinitialValues} fields={updateTrackfields} onSubmit={handleUpdateTrack} errorMessage={errorMessage} isLoading={isLoading} successMessage={successMessage}/>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default TrackUpdate;