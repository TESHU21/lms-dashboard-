import React,{useState,useEffect} from 'react'
import { DataTable } from '@/components/data-table'
import {columns} from "./components/columns"
import LearnerHeader from './LearnersHeader'
import CreateLearner from './components/LearnerFormDialog'
import { useCourse } from '@/context/CourseContext'
import LearnerDetailDialog from './components/LearnerDetailDialog'
import DeleteLearnerDialog from './components/DeleteLearnerDialog'
import LearnerFormDialog from './components/LearnerFormDialog'
const Learners = () => {
  const [data,setData]=useState([])
  const {getLearner,deleteLearner}=useCourse()
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]); // New state for sorting
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); 
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isDeleteDialogOpen,setIsDeleteDialogOpen]=useState(false)
const [learnerToDelete, setLearnerToDelete] = useState(null);
 const [isCreateLearnerFormOpen, setIsCreateLearnerFormOpen] = useState(false); // For "Create Learner" dialog
const [isEditLearnerFormOpen, setIsEditLearnerFormOpen] = useState(false);   // For "Edit Learner" dialog





 
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
  useEffect(()=>{
    fetchLearners()
  },[getLearner]) // Empty dependency array means this runs once on mount

  const handleViewDetails=(learner)=>{
            setIsDetailDialogOpen(true);
            setLearnerToDelete(learner)


    
    // Implement navigation or open a dialog to show details
  }
  const handleEdit=(learnerData)=>{
    console.log("Edit Learner:", learnerData)
    // Implement edit logic
    setIsEditLearnerFormOpen(true)
  }
  const handleDelete=async(learner)=>{

      try{
        const response=await deleteLearner(learner.id)
        console.log(response)
        fetchLearners()
    }
    catch(error){
        console.log(error)
    }
    finally {
      // 3. Clear the state and close the dialog
      setLearnerToDelete(null);
      setIsDeleteDialogOpen(false);
    }
    setLearnerToDelete(learner)
    setIsDeleteDialogOpen(true)
 
  }
  const handleCreateLearner=async(data)=>{
    console.log(data)

  }

  return (
    <div className='px-[30px] mx-30'> {/* Adjusted to px-[30px] for explicit 30px */}
      <h6 className="leading-8 text-[20px] min-h-full font-semibold mb-[30px]">Learners</h6>

      <LearnerHeader columnFilters={columnFilters}
       setColumnFilters={setColumnFilters}
       sorting={sorting}
       setSorting={setSorting}
       open={isCreateLearnerFormOpen}
       onOpenChange={setIsCreateLearnerFormOpen}
       onSubmit={handleCreateLearner}
       />
      <DataTable
        data={data}
        columns={columns({
          handleViewDetails, // Pass the new handler
          handleEdit,
          handleDelete,
        })}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        sorting={sorting}
        setSorting={setSorting}
      />
       <LearnerDetailDialog
        learner={learnerToDelete}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
      <DeleteLearnerDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} learner={learnerToDelete} />
      <LearnerFormDialog open={isEditLearnerFormOpen} setOpen={setIsEditLearnerFormOpen} mode="update" onSubmit={handleEdit}/>
    </div>
  )
}

export default Learners;