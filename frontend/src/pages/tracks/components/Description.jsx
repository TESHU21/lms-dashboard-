import React,{useState} from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// This component displays the Description, Stacks, and action buttons
const DescriptionStacksSection = ({track}) => {
 const navigate=useNavigate()
  const stacks = [
    { id: 1, name: 'ReactJs', color: 'blue' },    // Example colors, map to Tailwind classes
    { id: 2, name: 'NextJs', color: 'blue' },
    { id: 3, name: 'NodeJs', color: 'green' },
    { id: 4, name: 'Django', color: 'red' },
    { id: 5, name: 'MongoDB', color: 'yellow' },
    { id: 6, name: 'VueJs', color: 'blue' },
  ];

  // Function to map colors to Tailwind classes (adjust as needed)
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'border-blue-400 text-blue-700 ';
      case 'green':
        return 'border-green-400 text-green-700 ';
      case 'red':
        return 'border-red-400 text-red-700 ';
      case 'yellow':
        return 'border-yellow-400 text-yellow-700 ';
      default:
        return 'border-gray-400 text-gray-700 ';
    }
  };

  return (
    // Main container with padding and border (matches the blue outline in the image)
    <div className="p-6 border w-full  h-full  rounded-md  ">
      {/* Description Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold  mb-2">Description</h2>
        <p className=" text-sm">
          {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
          {track.description}
        </p>
      </div>

      {/* Stacks Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold  mb-3">Stacks</h2>
        {/* Container for stack badges, using flex wrap for responsiveness */}
        <div className="flex flex-wrap gap-6">
          {/* Map over the stacks data to render badges */}
          {stacks.map(stack => (
            <span
              key={stack._id}
              className={`px-3 py-3 w-[111px] border rounded-md h-12 text-sm font-medium ${getColorClasses(stack.color)}`}
            >
              {stack.name}
            </span>
          ))}
          {/* {track.courses.map(stack => (
            <span
              key={stack._id}
              className={`px-3 py-3 w-auto border rounded-md h-12 text-sm font-medium ${getColorClasses(stack.color)}`}
            >
              {stack.title}
            </span>
          ))} */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start space-x-4 mt-6 ">
        {/* Back Button */}
        <button className="inline-flex items-center px-4 py-2 border h-12 w-[139px] border-gray-300 rounded-md shadow-sm bg-foreground  text-sm font-medium text-accent hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
        onClick={()=>navigate("/app/tracks")}>
           <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
           Back
        </button>

        {/* Update Button */}
        <button className="inline-flex items-center px-4 py-2 h-12 w-[139px] border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sidebar focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
          Update
          <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default DescriptionStacksSection;
