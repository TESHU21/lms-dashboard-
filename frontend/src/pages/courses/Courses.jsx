import React,{useEffect, useState} from 'react'
import CourseHeader from './components/CourseHeader'
import { DataTable } from '@/components/data-table'
import {columns} from "./components/columns"
import { useCourse } from '@/context/CourseContext'
import CourseFormDialog from './components/CourseFormDialog'
import CourseDetailDialog from './components/CourseDetailDialog'

const Courses = () => {

const [data,setData]=useState([])
const [sorting, setSorting] = useState([]); // New state for sorting
  const [columnFilters, setColumnFilters] = useState([]);
   const [isCreateCourseFormOpen, setIsCreateCourseFormOpen] = useState(false); // For "Create Learner" dialog
  const [isEditCourseFormOpen, setIsEditCourseFormOpen] = useState(false);   // For "Edit Learner" dialog
  const [isViewCourseDetail, setIsViewCourseDetail] = useState(false);   // For "Edit Learner" dialog
    const [selectedCourse, setSelectedCourse] = useState(null);
  

const {getCourses}=useCourse()
    useEffect(()=>{
      const fetchCourse=async()=>{
        try{
          const response=await getCourses()
          console.log(response)
          const courseData=response.data.courses;
         const formattedCourses=courseData.map((course)=>{
        return {
    id: course._id,
    title: course.title,
    image: course.image,
    createdAt:course.createdAt,
    description: course.description,
    trackName: course.track?.name || '', // optional chaining in case track is missing
    trackDescription: course.track?.description || '',
    trackDuration: course.track?.duration || '',
    trackPrice: course.track?.price || '',
    trackInstructor: course.track?.instructor || '',
    trackImage: course.track?.image || ''

  };
      

})
         setData(formattedCourses)
        }
        catch(error){
          console.log(error)
        }

      }
      fetchCourse()
    },[])

  // Handler function to mark an invoice as Paid
  const handleConfirm = (row) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, status: "Paid" } : item
      )
    );
  };
 const handleViewDetails=(learner)=>{
  console.log(learner)
        setSelectedCourse(learner)
            setIsViewCourseDetail(true);


    // console.log("View Details for:", learnerData)
    // Implement navigation or open a dialog to show details
  }
  // Placeholder handler for editing an invoice
  const handleEdit = (row) => {
    console.log("Edit:", row);
   setIsEditCourseFormOpen(true)
  }
  // Handler function to delete an invoice by id
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
    const handleCreateCourse=async(data)=>{
    console.log(data)

  }

  return (
    <div className="flex flex-col justify-center items-center">
   
      <div className="w-full px-30">
        <h6 className="leading-8 text-[20px] font-semibold mb-[36px]">Courses</h6>
        <CourseHeader columnFilters={columnFilters} setColumnFilters={setColumnFilters} open={isCreateCourseFormOpen} onOpenChange={setIsCreateCourseFormOpen}
        onSubmit={handleCreateCourse}
        />
        
     
          {/* The DataTable component */}
          <DataTable
            data={data} 
            columns={columns({
              handleViewDetails,
              handleEdit,
              handleDelete,
            })}
            sorting={sorting} 
            setSorting={setSorting}
            columnFilters={columnFilters} setColumnFilters={setColumnFilters}
          />
          <CourseFormDialog open={isEditCourseFormOpen} setOpen={setIsEditCourseFormOpen} mode="update" onSubmit={handleEdit}/>
          <CourseDetailDialog course={selectedCourse}  open={isViewCourseDetail} onOpenChange={setIsViewCourseDetail}/>
        </div>
      </div>
  )
}

export default Courses