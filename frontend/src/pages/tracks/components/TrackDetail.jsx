import React from 'react';
import CourseCard from './CourseCard';
import SoftwareImage from "../../../assets/Software Engineering Path.svg";
import DescriptionStacksSection from './Description';
import { useNavigate } from 'react-router-dom';
const TrackDetail = () => {
  const navigate=useNavigate()
  const courses = [
    {
      id: 1,
      title: "Software Engineer Path",
      imageUrl: SoftwareImage,
      price: 380.0,
      duration: "12 weeks",
      instructor: "Benjamin",
      learners: "+200",
    },
  ];

  return (
    <div className=' flex flex-col px-30 gap-8  '>
       <div className="flex items-center space-x-4 text-lg">
      {/* Tracks Tab (Inactive) */}
      <div className="text-gray-500 cursor-pointer">
        Tracks
      </div>

      {/* Separator */}
      <div className="border-l border-gray-300 h-6"></div> {/* Adjust height as needed */}

      {/* Details Tab (Active) */}
      <div className="text-accent-foreground font-semibold cursor-pointer"> {/* Added font-semibold for emphasis */}
        details
      </div>
    </div>
          <div className="flex items-stretch h-full lg:flex-row flex-col w-full gap-10 ">

      
      <div className="w-full lg:w-[407px]"> 
        {courses.map(course => (
        
          <div key={course.id} className="h-full">
            <CourseCard course={course} />
          </div>
        ))}
      </div>

 
      <div className="flex-grow  w-full lg:w-[600px]">
        <DescriptionStacksSection />
      </div>
    </div>
    </div>
  
  );
}

export default TrackDetail;