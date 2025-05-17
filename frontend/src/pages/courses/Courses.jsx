import React,{useState} from 'react'
import CourseHeader from './components/CourseHeader'
import { DataTable } from '@/components/data-table'
import {columns} from "./components/columns"

const Courses = () => {
  const [data,setData]=useState([
  {
    id: "learner-1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    image: "/avatars/avatar6.png", // Dummy image path
    courses: "Node Js", // Dummy number of courses
    track: "Frontend Development",
  },
  {
    id: "learner-2",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    image: "/avatars/avatar7.png", // Dummy image path
    courses: "Next JS", // Dummy number of courses
    track: "Backend Development",
  },
  {
    id: "learner-3",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    image: "/avatars/avatar8.png", // Dummy image path
    courses: "Power BI", // Dummy number of courses
    track: "Data Science",
  },
  {
    id: "learner-4",
    name: "Diana Prince",
    email: "diana.p@example.com",
    image: "/avatars/avatar9.png", // Dummy image path
    courses: "Docer", // Dummy number of courses
    track: "Mobile Development",
  },
  {
    id: "learner-5",
    name: "Ethan Hunt",
    email: "ethan.h@example.com",
    image: "/avatars/avatar10.png", // Dummy image path
    courses: "Django", // Dummy number of courses
    track: "DevOps",
  },
  {
    id: "learner-6",
    name: "Fiona Gallagher",
    email: "fiona.g@example.com",
    image: "/avatars/avatar11.png", // Dummy image path
    courses: "Figma ", // Dummy number of courses
    track: "UI/UX Design",
  },
  {
    id: "learner-7",
    name: "George Costanza",
    email: "george.c@example.com",
    image: "/avatars/avatar12.png", // Dummy image path
    courses: "Quality Testing", // Dummy number of courses
    track: "Quality Assurance",
  },
  {
    id: "learner-8",
    name: "Holly Golightly",
    email: "holly.g@example.com",
    image: "/avatars/avatar13.png", // Dummy image path
    courses: 4, // Dummy number of courses
    track: "Data Analysis",
  },
  {
    id: "learner-9",
    name: "Ivan Drago",
    email: "ivan.d@example.com",
    image: "/avatars/avatar14.png", // Dummy image path
    courses: "Cybersecurity", // Dummy number of courses
    track: "Cybersecurity",
  },
  {
    id: "learner-10",
    name: "Jasmine Khan",
    email: "jasmine.k@example.com",
    image: "/avatars/avatar15.png", // Dummy image path
    courses: "Aws", // Dummy number of courses
    track: "Cloud Computing",
  },
])
  // Handler function to mark an invoice as Paid
  const handleConfirm = (row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: "Paid" } : item
      )
    );
  };

  // Placeholder handler for editing an invoice
  const handleEdit = (row) => {
    console.log("Edit:", row);
    // You would typically open a modal or navigate to an edit page here
  };

  // Handler function to delete an invoice by id
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center">
   
      <div className="w-full px-30">
        <h6 className="leading-8 text-[20px] font-semibold mb-[36px]">Courses</h6>
        <CourseHeader/>
        
     
          {/* The DataTable component */}
          <DataTable
            data={data} 
            columns={columns({
              handleConfirm,
              handleEdit,
              handleDelete,
            })}
          />
        </div>
      </div>
  )
}

export default Courses