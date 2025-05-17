import React,{useState} from 'react'
import { DataTable } from '@/components/data-table'
import {columns} from "./components/columns"
import LearnerHeader from './LearnersHeader'

const Learners = () => {
   const data = [
  {
    id: "1",
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "alice.johnson@example.com",
    amount: 120.5,
    date: "2025-05-10",
    gender: "Female",
  },
  {
    id: "2",
    name: "Michael Smith",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    email: "michael.smith@example.com",
    amount: 95.0,
    date: "2025-04-22",
    gender: "Male",
  },
  {
    id: "3",
    name: "Sofia Martinez",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "sofia.martinez@example.com",
    amount: 145.75,
    date: "2025-03-30",
    gender: "Female",
  },
  {
    id: "4",
    name: "David Kim",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "david.kim@example.com",
    amount: 110.0,
    date: "2025-02-18",
    gender: "Male",
  },
  {
    id: "5",
    name: "Emma Brown",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    email: "emma.brown@example.com",
    amount: 132.25,
    date: "2025-01-05",
    gender: "Female",
  },
  {
    id: "6",
    name: "Sofia Martinez",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "sofia.martinez@example.com",
    amount: 145.75,
    date: "2025-03-30",
    gender: "Female",
  },
  {
    id: "7",
    name: "David Kim",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "david.kim@example.com",
    amount: 110.0,
    date: "2025-02-18",
    gender: "Male",
  },
  {
    id: "8",
    name: "Emma Brown",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    email: "emma.brown@example.com",
    amount: 132.25,
    date: "2025-01-05",
    gender: "Female",
  },
];

    const handleConfirm=()=>{
      console.log("Confirm")
    }
    const handleEdit=()=>{
      console.log("Edit")
    }
    const handleDelete=()=>{
      console.log("Delete")
    }
  return (
    <div className='px-30'>
     <h6 className="leading-8 text-[20px] font-semibold mb-[30px]">Learners</h6>

      <LearnerHeader/>
      <DataTable data={data}  columns={columns({
                    handleConfirm,
                    handleEdit,
                    handleDelete,
                  })} />

    </div>
  )
}

export default Learners