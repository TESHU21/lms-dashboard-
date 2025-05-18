import React from 'react'
import CourseCard from './components/CourseCard'
import { courses } from './components/data'
import TrackHeader from './components/TrackHeader'
import DescriptionStacksSection from './components/Description'

const Tracks = () => {
  return (
   
    <div className="flex flex-col min-h-full items-center  px-25">
      <h6 className='font-semibold text-[20px] leading-8 mb-[36px]'>Courses</h6>
      <TrackHeader/>
      <div className=' flex  gap-8 w-full'>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
      
      </div>
    </div>
  )
}

export default Tracks