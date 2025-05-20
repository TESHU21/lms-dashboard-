import React from 'react';
import { ChevronRight } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ course }) => {
  // Destructure course data from props
  const { _id,name, image, price, duration, instructor, learners } = course;
  const navigate=useNavigate()
  const handleViewMore=(id)=>{
    navigate(`/app/tracks/${_id}`)

  }

  return (
    <Card className="w-full flex flex-col overflow-hidden">
      
    

      
      <CardContent className="p-4 flex flex-col gap-6 flex-grow">
          <img
        className="w-full h-[202px] object-cover"
        src={image}
        alt={name}
        
      />
        {/* Course Title */}

        <div className="flex flex-col text-sm  gap-2 space-y-2 flex-grow"> 
        <h3 className="text-lg font-semibold my-4 ">{name}</h3> 

          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-medium ">${price}</span> 
          </div>
          <Separator/>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium ">{duration}</span>
          </div>
            <Separator/>
          <div className="flex justify-between">
            <span>Instructor:</span>
            <span className="font-medium ">{instructor}</span>
          </div>
             <Separator/>
          <div className="flex justify-between">
            <span>Learners:</span>
            <span className="font-medium ">{learners}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0"> 
        <Button className="w-full bg-sidebar-accent h-[48px]" onClick={()=>handleViewMore(_id)}>
          View More
          <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
};



export default CourseCard; // Export the improved card component
