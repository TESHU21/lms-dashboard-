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


// Component for a single course card using shadcn/ui
const CourseCard = ({ course }) => {
  // Destructure course data from props
  const { title, imageUrl, price, duration, instructor, learners } = course;

  return (
    // Use shadcn/ui Card component as the main container
    <Card className="w-full flex flex-col overflow-hidden">
      
    

      
      <CardContent className="p-4 flex flex-col gap-6 flex-grow">
          <img
        className="w-full h-[202px] object-cover"
        src={imageUrl}
        alt={title}
        // Basic error handling for image loading
        
      />
        {/* Course Title */}

        <div className="flex flex-col text-sm  gap-2 space-y-2 flex-grow"> {/* Increased space-y */}
        <h3 className="text-lg font-semibold my-4 ">{title}</h3> {/* Increased bottom margin */}

          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-medium ">${price.toFixed(2)}</span> {/* Format price */}
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

      {/* Card Footer for the button */}
      <CardFooter className="p-4 pt-0"> {/* Added padding and removed top padding */}
        {/* Use shadcn/ui Button component */}
        <Button className="w-full bg-sidebar-accent h-[48px]">
          View more
          {/* ChevronRight icon */}
          <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
};



export default CourseCard; // Export the improved card component
