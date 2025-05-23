import React,{useState,useEffect} from 'react'
import { DataTable } from '@/components/data-table'
import {columns} from "./components/columns"
import LearnerHeader from './LearnersHeader'
import CreateLearner from './components/CreateLearner'
import { useCourse } from '@/context/CourseContext'

const Learners = () => {
  const [data,setData]=useState([])
  const {getLearner}=useCourse()
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(()=>{
    const fetchLearners=async()=>{
      try{
        const response=await getLearner()
        const learnersData=response.data.learners;
        console.log(learnersData)
        const formattedLearners=learnersData.map((learner)=>{
          return{
            id: learner._id,
            firstName: learner.firstName,
            lastName: learner.lastName,
            name: `${learner.firstName || ''} ${learner.lastName || ''}`,
            email: learner.email,
            role: learner.role,
            contact: learner.contact,
            date: learner.createdAt, // Matches accessorKey 'date'
            description: learner.description,
            disabled: learner.disabled,
            isVerified: learner.isVerified,
            lastLogin: learner.lastLogin,
            location: learner.location,
            image: learner.profileImage,
            updatedAt: learner.updatedAt,
            
           
             amount: learner.amount || 0, // Default to 0 if not present
             gender: learner.gender || 'N/A', // Default to 'N/A' if not present
          }
        })
        setData(formattedLearners)
      }
      catch(error){
        console.log(error)
        // Optionally show an error message to the user
      }
    }
    fetchLearners()
  },[]) // Empty dependency array means this runs once on mount

  const handleViewDetails=(learnerData)=>{
    console.log("View Details for:", learnerData)
    // Implement navigation or open a dialog to show details
  }
  const handleEdit=(learnerData)=>{
    console.log("Edit Learner:", learnerData)
    // Implement edit logic
  }
  const handleDelete=(learnerId)=>{
    console.log("Delete Learner with ID:", learnerId)
    // Implement delete logic
  }

  return (
    <div className='px-[30px] mx-30'> {/* Adjusted to px-[30px] for explicit 30px */}
      <h6 className="leading-8 text-[20px] min-h-full font-semibold mb-[30px]">Learners</h6>

      <LearnerHeader columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
      <DataTable
        data={data}
        columns={columns({
          handleViewDetails, // Pass the new handler
          handleEdit,
          handleDelete,
        })}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  )
}

export default Learners;