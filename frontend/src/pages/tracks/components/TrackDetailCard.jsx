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


const TrackDetailCard = ({ tracks }) => {
  
  // Destructure course data from props
  const { _id,name, image, price, duration, instructor, learners } = tracks;
  const navigate=useNavigate()
  const id=_id;
  const handleViewMore=(id)=>{
    navigate(`/app/tracks/${id}`)

  }

  return (
    <Card className="w-full flex flex-col overflow-hidden">
      
    

      
      <CardContent className="p-4 flex flex-col gap-6 flex-grow">
          <img
        className="w-full h-[202px] object-cover"
        src={image}
        alt={name}
        
      />
     <h3 className="text-lg font-semibold my-4 ">{name}</h3> 

        {/* Course Title */}

        <div className="flex flex-col text-sm  gap-2 space-y-2 flex-grow"> 
        

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
          <Separator/>
          <div className="flex justify-between">
            <span>Dates:</span>
              {tracks.createdAt
  ? new Date(tracks.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',  // or 'long' for full month name
      day: '2-digit'
    }).replace(',', '') // remove the comma if needed
  : 'N/A'}


          </div>
        </div>
      </CardContent>

     
    </Card>
  );
};



export default TrackDetailCard; // Export the improved card component
