// components/LearnerDetailDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Assuming Shadcn UI dialog components
import { Button } from "@/components/ui/button"; // Assuming Shadcn UI button
import { Separator } from '@/components/ui/separator';
const CourseDetailDialog = ({ course, open, onOpenChange }) => {
  console.log("Coursessssssss",course)
  // Ensure learner object exists before trying to access its properties
  if (!course) {
    return null; // Or handle the case where learner is undefined/null
  }

  // const fullName = `${learner.firstName || ''} ${learner.lastName || ''}`.trim();


  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="">
      <DialogContent className="   sm:max-w-[425px] md:max-w-[700px] lg:max-w-[800px] p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="flex flex-col items-center text-center">
          
          <DialogTitle className="text-2xl font-bold">{course.title}</DialogTitle>
          <DialogDescription className="text-gray-500">
            Details for {course.title}.
          </DialogDescription>
        </DialogHeader>

        <div className=" gap-4 text-sm mt-4">
          <div className=' flex gap-6 justify-around'>
            <div className='w-3/5'>
                           <img src={course.image} alt={`Image of ${course.title} course`}  className='flex-1'/>

            </div>
             <div className='w-2/5 flex flex-col gap-3'>
                   <div className="flex flex-col">
            <span className="font-semibold ">Course Name:</span>
            <span className="">{course.title}
           </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold ">createdAt:</span>
            <span className="">{new Date(course.createdAt).toLocaleString()}
           </span>
          </div>
          <Separator/>
          <p className=' font-lato font-semibold'>Available Tracks</p>
          
           <div className="flex flex-col">
            <span className="font-semibold ">Track Name:</span>
            <span className="">{course?.trackName}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold ">Duiration:</span>
            <span className="">{course?.trackDuration || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold ">Price:</span>
            <span className="">{course?.trackPrice|| 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold ">Instractor:</span>
            <span className="">{course.trackInstructor|| 'N/A'}</span>
          </div>

             </div>
          </div>
         
         
     
         
        </div> 

        {course.description && (
          <div className="mt-4 border-t pt-4">
            <span className="font-semibold ">Description:</span>
            <p className="mt-1">{course.description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;